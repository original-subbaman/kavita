import { Container, Text } from "@radix-ui/themes";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useParams } from "react-router-dom";
import BackButton from "../components/BackButton";
import AuthorDetailCard from "../components/PoetProfile/AuthorDetailCard";
import InfinitePostSection from "../components/PostSection/InfinitePostSection";
import ResponseSnackbar from "../components/ResponseSnackbar";
import { PostActionsProvider } from "../context/PostActionContext";
import useAuth from "../hooks/auth/useAuth";
import useNotifyNewFolower from "../hooks/notification/useNotifyNewFollower";
import useGetInfinitePosts from "../hooks/post/useGetInfinitePosts";
import useGetPostCount from "../hooks/post/useGetPostCount";
import useFollowerCount from "../hooks/user/useFollowerCount";
import useFollowUser from "../hooks/user/useFollowUser";
import useGetProfile from "../hooks/user/useGetProfile";
import useGetUser from "../hooks/user/useGetUser";
import useHasFollowed from "../hooks/user/useHasFollowed";
import useUnfollowUser from "../hooks/user/useUnfollowUser";

const AuthorProfile = () => {
  const params = useParams();
  const { user, isAuthenticated } = useAuth();
  const queryClient = useQueryClient();

  const [response, setResponse] = useState(null);
  const currentUserId = user?.id;

  const authorUserId = params?.id;
  const { data: author } = useGetUser({ userId: authorUserId });
  const { data: profile } = useGetProfile({ userId: authorUserId });
  const { data: postCount } = useGetPostCount({ userId: authorUserId });
  const { data: followerCount } = useFollowerCount({
    userId: authorUserId,
    staleTime: 0,
  });
  const { data: hasFollowed } = useHasFollowed({
    followerId: currentUserId,
    followedId: authorUserId,
    staleTime: 0,
  });
  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useGetInfinitePosts({ userId: authorUserId, feedType: "all" });

  const onSuccess = (message, action) => {
    setResponse({
      type: "success",
      message: message,
    });
    queryClient.invalidateQueries({
      queryKey: ["has_followed", currentUserId, authorUserId],
    });

    if (action && typeof action === "function") {
      action();
    }
  };
  const onError = (message) => {
    setResponse({
      type: "error",
      message,
    });
  };

  const { mutate: followUser, isPending: isFollowing } = useFollowUser({
    onSuccess: () =>
      onSuccess(`You have started following: ${author?.user_name}`, () => {
        queryClient.invalidateQueries({
          queryKey: ["follower_count", authorUserId],
        });
        notify({
          followedId: authorUserId,
          followerId: currentUserId,
          message: `${author?.user_name} started following you!`,
        });
      }),
    onError: () => onError("Unable to follow user. Please try again later."),
  });

  const { mutate: unfollowUser, isPending: isUnfollowing } = useUnfollowUser({
    onSuccess: () =>
      onSuccess(
        `Unfollowed successfully`,
        queryClient.invalidateQueries({
          queryKey: ["follower_count", authorUserId],
        })
      ),
    onError: () => onError("Unable to unfollowe user. Please try again later."),
  });

  const { mutate: notify } = useNotifyNewFolower();

  if (status === "error") {
    return (
      <ErrorMessage message={"Error loading posts. Try refreshing the page."} />
    );
  }

  function handleFollowUser() {
    followUser({ followedId: authorUserId, followerId: currentUserId });
  }

  function handleUnfollowUser() {
    unfollowUser({ followedId: authorUserId, followerId: currentUserId });
  }

  const showFollowButton = currentUserId !== authorUserId && !hasFollowed;
  const isUserAuthor = currentUserId === authorUserId;

  return (
    <Container className="min-h-screen py-10" size={"2"}>
      <ResponseSnackbar
        open={response !== null}
        severity={response?.type}
        message={response?.message}
        onClose={() => setResponse(null)}
      />
      <BackButton />
      <div className="mt-4">
        <AuthorDetailCard
          profile={profile}
          username={author?.user_name || ""}
          name={author?.full_name || ""}
          poems={postCount || 0}
          bio={author?.bio}
          followers={followerCount}
          isUserAuthor={isUserAuthor}
          isAuthenticated={isAuthenticated}
          showFollowButton={showFollowButton}
          onFollowUser={handleFollowUser}
          onUnfollowUser={handleUnfollowUser}
        />
      </div>
      <p className="text-white my-4">Recent Posts</p>
      <PostActionsProvider>
        <InfinitePostSection
          data={posts}
          hasNextPage={hasNextPage}
          fetchNextPage={fetchNextPage}
          isFetchingNextPage={isFetchingNextPage}
          status={status}
          breakpointColumnsObj={{
            default: 1,
          }}
        />
      </PostActionsProvider>
    </Container>
  );
};

export default AuthorProfile;

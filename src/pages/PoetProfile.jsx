import { Container, Text } from "@radix-ui/themes";
import { useParams } from "react-router-dom";
import PoetDetailCard from "../components/PoetProfile/PoetDetailCard";
import InfinitePostSection from "../components/PostSection/InfinitePostSection";
import useGetInfinitePosts from "../hooks/post/useGetInfinitePosts";
import useGetPostCount from "../hooks/post/useGetPostCount";
import useGetProfile from "../hooks/user/useGetProfile";
import useGetUser from "../hooks/user/useGetUser";
import { PostActionsProvider } from "../context/PostActionContext";

const PoetProfile = () => {
  const params = useParams();
  const userId = params?.id;
  const { data: user } = useGetUser({ userId: userId });
  const { data: profile } = useGetProfile({ userId: userId });
  const { data: postCount } = useGetPostCount({ userId: userId });

  const {
    data: posts,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
  } = useGetInfinitePosts({ userId: userId });

  if (status === "error") {
    return (
      <ErrorMessage message={"Error loading posts. Try refreshing the page."} />
    );
  }

  return (
    <Container className="min-h-screen py-10" size={"2"}>
      <PoetDetailCard
        profile={profile}
        username={user?.user_name || ""}
        name={user?.name || ""}
        poems={postCount || 0}
        bio={user?.bio}
        followers={100}
      />
      <Text size={"5"} className="text-white">
        Recent Posts
      </Text>
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

export default PoetProfile;

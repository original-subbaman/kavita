import { AlertDialog, Box, Container } from "@radix-ui/themes";
import dayjs from "dayjs";
import { useState } from "react";
import DateFilter from "../components/MyPosts/DateFilter";
import PostSection from "../components/PostSection/PostSection";
import QuoteSearchBox from "../components/QuoteSearchBox";
import useAuth from "../hooks/auth/useAuth";
import useGetUserPosts from "../hooks/post/useGetUserPosts";
import useDebounceSearch from "../hooks/useDebounceSearch";
import Loading from "../components/Loading";
import useHidePost from "../hooks/post/useHidePost";
import ResponseSnackbar from "../components/ResponseSnackbar";
import useDeletePost from "../hooks/post/useDeletePost";
import { useQueryClient } from "@tanstack/react-query";
import InputAlertDialog from "../components/PromptSection/InputAlertDialog";
import { PostActions, PostActionsProvider } from "../context/PostActionContext";
import DeleteDialog from "../components/MyPosts/DeleteDialog";
import useUpdatePost from "../hooks/post/useUpdatePost";

const MyPosts = () => {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [openEditPost, setOpenEditPost] = useState(false);
  const [notification, setNotification] = useState(null);
  const [selectedPost, setSelectedPost] = useState(null);

  // States for filtering
  const [filterDate, setFilterDate] = useState({
    from: dayjs().startOf("year"),
    to: dayjs(),
  });
  const [searchTerm, setSearchTerm] = useState("");
  const debounceSearch = useDebounceSearch(searchTerm);

  // Fetch post queries
  const { data: posts, isFetching: isFetchingPosts } = useGetUserPosts({
    id: user.id,
    from: filterDate.from,
    to: filterDate.to,
    search: debounceSearch,
  });

  // Helpers
  const handleOnSuccess = (msg) => {
    setNotification({ type: "success", msg: msg || "Success" });
    queryClient.invalidateQueries({
      queryKey: [
        "get_user_posts",
        user.id,
        filterDate.from,
        filterDate.to,
        debounceSearch,
      ],
    });
  };

  const handleOnError = (err) =>
    setNotification({
      type: "error",
      msg: err?.message || "Something went wrong",
    });

  // Mutations
  const { mutate: deletePost } = useDeletePost({
    onSuccess: (res) => handleOnSuccess("Post deleted successfully"),
    onError: handleOnError,
  });

  const { mutate: hidePost } = useHidePost({
    onSuccess: (res) => handleOnSuccess(res),
    onError: handleOnError,
  });

  const { mutate: updatePost } = useUpdatePost({
    onSuccess: (res) => handleOnSuccess(res?.message),
    onError: handleOnError,
  });

  // Handlers
  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCloseResponse = () => {
    setNotification(null);
    setSelectedPost(null);
  };

  const handleDeletePost = () => {
    deletePost({ userId: user.id, postId: selectedPost.postId });
    setSelectedPost(null);
  };

  const handleUpdatePost = ({ post, postId, userId, bgColor }) => {
    updatePost({ post, postId, userId, bgColor });
    setOpenEditPost(false);
    setSelectedPost(null);
  };

  const handlePostAction = ({ action, postId, data }) => {
    console.log("🚀 ~ handlePostAction ~ data:", data);
    switch (action) {
      case PostActions.hide:
        hidePost({ postId, isHidden: data });
        return;
      case PostActions.edit:
        setSelectedPost({
          postId,
          content: data.content,
          bgColor: data.bgColor,
        });
        setOpenEditPost(true);
        return;
      case PostActions.delete:
        setOpenDeleteDialog(true);
        setSelectedPost({ postId, authorId: data });
        return;
    }
  };

  return (
    <PostActionsProvider onPostAction={handlePostAction}>
      <Container size={"2"} className="mx-2">
        {/*  Response Snackbar */}
        {notification && (
          <ResponseSnackbar
            open
            onClose={handleCloseResponse}
            severity={notification.type}
            message={notification.msg}
          />
        )}
        {/* Delete Dialog */}
        {openDeleteDialog && (
          <DeleteDialog
            open={openDeleteDialog}
            setOpen={setOpenDeleteDialog}
            onDelete={handleDeletePost}
          />
        )}
        {/* Edit Dialog */}
        <AlertDialog.Root
          open={openEditPost}
          onOpenChange={(open) => {
            setOpenEditPost(open);
            setSelectedPost(null);
          }}
        >
          {openEditPost && selectedPost?.content && (
            <InputAlertDialog
              isEdit
              postId={selectedPost.postId}
              userId={user.id}
              content={selectedPost?.content}
              savedColor={selectedPost?.bgColor}
              mutation={handleUpdatePost}
              mutationState={false}
            />
          )}
        </AlertDialog.Root>
        {/* Filters */}
        <Box className="flex-1 mx-3 sm:mx-0">
          <QuoteSearchBox handleSearchChange={handleSearchChange} size="2" />
        </Box>
        <Box className="mb-4">
          <DateFilter
            from={filterDate.from}
            to={filterDate.to}
            setFilterDate={setFilterDate}
          />
        </Box>
        {/* Post Section */}
        {isFetchingPosts ? (
          <Loading />
        ) : (
          <PostSection posts={posts} showMenu={true} />
        )}
      </Container>
    </PostActionsProvider>
  );
};

export default MyPosts;

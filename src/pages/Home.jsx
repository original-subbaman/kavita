import { Root as AlertDialogRoot } from "@radix-ui/react-alert-dialog";
import { Box, Flex, Text } from "@radix-ui/themes";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import PostFilter from "../components/Home/PostFilter";
import InfinitePostSection from "../components/PostSection/InfinitePostSection";
import InputAlertDialog from "../components/PromptSection/InputAlertDialog";
import PostInputBox from "../components/PromptSection/PostInputBox";
import PromptSection from "../components/PromptSection/PromptSection";
import PromptText from "../components/PromptSection/PromptText";
import ResponseSnackbar from "../components/ResponseSnackbar";
import ScrollToTop from "../components/ScrollToTop";
import { PostActionsProvider } from "../context/PostActionContext";
import useAuth from "../hooks/auth/useAuth";
import useAddPost from "../hooks/post/useAddPost";
import useGetInfinitePosts from "../hooks/post/useGetInfinitePosts";
import useGetWeeklyTheme from "../hooks/post/useGetWeeklyTheme";
import PopularThemes from "../components/Home/PopularThemes";
import useGetPopularThemes from "../hooks/post/useGetPopularThemes";
import AuthGuard from "../components/AuthGuard";

function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const [addPostDialog, setAddPostDialog] = useState(false);

  const [filter, setFilter] = useState({
    feedType: "all",
    theme: null,
  });
  console.log("🚀 ~ Home ~ filter:", filter);

  const [response, setResponse] = useState({
    success: false,
    error: false,
    message: "",
  });

  const queryClient = useQueryClient();

  const { data: popularThemes, isFetched: isPopularThemesFetched } =
    useGetPopularThemes();

  const {
    data: currWeeklyTheme,
    isLoading: isFetchingPrompt,
    isFetched: isThemeFetched,
  } = useGetWeeklyTheme();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useGetInfinitePosts({
      userId: user?.id,
      feedType: filter.feedType,
      theme: filter.theme?.id || currWeeklyTheme?.id,
    });

  const { mutate: addPost, isPending: isPosting } = useAddPost({
    userId: user?.id,
    onSuccess: (data) => {
      setAddPostDialog(false);
      queryClient.invalidateQueries({
        queryKey: ["infinite_posts"],
      });
      setResponse((prev) => ({
        ...prev,
        success: true,
        message: "Your post has been published",
      }));
    },
    onError: (error) => {
      setResponse((prev) => ({
        ...prev,
        error: true,
        message: "Cannot publish at this moment",
      }));
      setAddPostDialog(false);
    },
  });

  const handleClose = () => {
    setResponse({ error: false, success: false, message: "" });
  };

  const handlePostInputClick = () => {
    if (user) {
      setAddPostDialog(true);
    } else {
      navigate("/login");
    }
  };

  let themes = [];
  let prompt = "";
  if (isThemeFetched) {
    prompt = currWeeklyTheme.prompt;
    themes.unshift(currWeeklyTheme);
  }

  if (isPopularThemesFetched && popularThemes?.data.length > 0) {
    themes.push(...popularThemes.data);
  }

  return (
    <>
      {/* Success Snackbar */}
      {response.success && (
        <ResponseSnackbar
          open={response.success}
          onClose={handleClose}
          message={response.message}
          severity={"success"}
        />
      )}
      {/* Error Snackbar */}
      {response.error && (
        <ResponseSnackbar
          open={response.error}
          onClose={handleClose}
          message={response.message}
          severity={"error"}
        />
      )}
      <Flex display={"flex"} gap={"2"} className="min-h-screen">
        {/** suggest prompt section */}
        <Box className="flex-1 hidden sm:block"></Box>
        {/** Posts Section */}
        <Box className="flex-1 md:w-[800px]">
          <PromptSection>
            {/* Today's prompt text */}
            <WritingThemeTitle />
            {isFetchingPrompt ? (
              <LoadingTheme />
            ) : (
              <PromptText prompt={prompt} />
            )}
            {/* Input box */}
            <AlertDialogRoot
              open={addPostDialog}
              onOpenChange={setAddPostDialog}
            >
              <Box className="w-[93%] md:w-full mx-4">
                <PostInputBox onClick={handlePostInputClick} />
              </Box>
              <InputAlertDialog
                mutation={addPost}
                prompt={prompt}
                mutationState={isPosting}
              />
            </AlertDialogRoot>
          </PromptSection>
          {/* Filters */}
          <Box className="flex flex-col gap-4 mb-4">
            {/* Filter by Popular Themes */}
            <PopularThemes
              seletedTheme={filter.theme || currWeeklyTheme}
              setTheme={(t) => setFilter((f) => ({ ...f, theme: t }))}
              themes={themes}
            />
            {/* Fitler by feed type */}
            <AuthGuard>
              <div className="self-end">
                <PostFilter setOption={setFilter} />
              </div>
            </AuthGuard>
          </Box>
          {/* Post Section */}
          <PostActionsProvider onPostAction={() => {}}>
            <InfinitePostSection
              data={data}
              hasNextPage={hasNextPage}
              fetchNextPage={fetchNextPage}
              isFetchingNextPage={isFetchingNextPage}
              status={status}
              containerStyles={"md:w-[800px]"}
            />
          </PostActionsProvider>
        </Box>
        {/** filter */}
        <Box className="flex-1 my-8 color-white hidden sm:flex flex-col items-center  "></Box>
      </Flex>
      <ScrollToTop />
    </>
  );
}

const WritingThemeTitle = () => (
  <Text className="text-left text-white text-md font-primary w-full ">
    ✨ This week’s writing theme:
  </Text>
);

const LoadingTheme = () => (
  <Text size={"6"} className="animate-fade-pulse text-radix-green">
    Fetching theme...
  </Text>
);

export default Home;

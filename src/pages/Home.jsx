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

function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [addPostDialog, setAddPostDialog] = useState(false);
  const [filter, setFilter] = useState({
    feedType: "all",
    theme: null,
  });
  const [response, setResponse] = useState({
    success: false,
    error: false,
    message: "",
  });
  const today = dayjs(new Date());
  const [date, setDate] = useState(dayjs(new Date()));
  const isToday = date.isSame(today, "day");

  const queryClient = useQueryClient();

  const { data: prompt, isLoading: isFetchingPrompt } = useGetWeeklyTheme();

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useGetInfinitePosts({ userId: user?.id, filter: filter.feedType });

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

  const themes = ["Love", "Loss", "Hope", "Friendship"];
  if (prompt) {
    themes.unshift(prompt);
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
              {isToday && (
                <Box className="w-[93%] md:w-full mx-4">
                  <PostInputBox onClick={handlePostInputClick} />
                </Box>
              )}
              <InputAlertDialog
                mutation={addPost}
                prompt={prompt}
                mutationState={isPosting}
              />
            </AlertDialogRoot>
          </PromptSection>
          {/* Filters */}
          <Box className="flex flex-col gap-4 mb-4">
            <PopularThemes
              seletedTheme={filter.theme || prompt}
              setTheme={(t) => setFilter((f) => ({ ...f, theme: t }))}
              themes={themes}
            />
            <div className="self-end">
              <PostFilter setOption={setFilter} />
            </div>
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

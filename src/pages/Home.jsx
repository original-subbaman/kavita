import { LocalizationProvider, StaticDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Root as AlertDialogRoot } from "@radix-ui/react-alert-dialog";
import { Box, Flex } from "@radix-ui/themes";
import dayjs from "dayjs";
import { useState } from "react";
import PostSection from "../components/PostSection/PostSection";
import AddPostButton from "../components/PromptSection/AddPostButton";
import InputAlertDialog from "../components/PromptSection/InputAlertDialog";
import PromptSection from "../components/PromptSection/PromptSection";
import PromptText from "../components/PromptSection/PromptText";
import RootWrapper from "../components/RootWrapper";
import useAddPost from "../hooks/post/useAddPost";
import useGetPosts from "../hooks/post/useGetPosts";
import { useQueryClient } from "@tanstack/react-query";
import { StaticDatePickerStyle } from "../utils/Date";
import useAuth from "../hooks/auth/useAuth";
import ResponseSnackbar from "../components/ResponseSnackbar";
import InfinitePostSection from "../components/PostSection/InfinitePostSection";

function Home() {
  const { user } = useAuth();
  const [addPostDialog, setAddPostDialog] = useState(false);
  const [response, setResponse] = useState({
    success: false,
    error: false,
    message: "",
  });
  const today = dayjs(new Date());
  const [date, setDate] = useState(dayjs(new Date()));
  const isToday = date.isSame(today, "day");
  const queryClient = useQueryClient();

  const { mutate: addPost, isPending: isPosting } = useAddPost({
    userId: user.id,
    onSuccess: (data) => {
      setAddPostDialog(false);
      queryClient.refetchQueries({
        queryKey: ["get_latest_posts"],
      });
      setResponse((prev) => ({
        ...prev,
        success: true,
        message: "Your post has been published",
      }));
    },
    onError: (error) => {
      console.log("🚀 ~ Home ~ error:", error);
      setResponse((prev) => ({
        ...prev,
        error: true,
        message: "Cannot publish at this moment",
      }));
      setAddPostDialog(false);
    },
  });

  const { data: posts, isFetched: isPostsFetched } = useGetPosts({
    date: date.toDate(),
    keys: [],
  });

  const handleClose = () => {
    setResponse({ error: false, success: false, message: "" });
    console.log("close");
  };

  return (
    <RootWrapper>
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
        <Box className="flex-1">
          <PromptSection>
            <PromptText />
            <AlertDialogRoot
              open={addPostDialog}
              onOpenChange={setAddPostDialog}
            >
              {isToday && <AddPostButton />}
              <InputAlertDialog
                addPost={addPost}
                prompt={"A quick brown fox jumped over the lazy dog"} // Replace with actual prompt from the backend
                mutationState={isPosting}
              />
            </AlertDialogRoot>
          </PromptSection>
          {/* {isPostsFetched && <PostSection posts={posts} />} */}
          <InfinitePostSection />
        </Box>
        {/** filter */}
        <Box className="flex-1 my-8 color-white hidden sm:flex flex-col items-center  ">
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <StaticDatePicker
              value={date}
              onChange={(value) => setDate(value)}
              disableFuture
              slotProps={{
                toolbar: { hidden: true },
                actionBar: ({ wrapperVariant }) => ({ actions: [] }),
              }}
              sx={StaticDatePickerStyle}
            />
          </LocalizationProvider>
        </Box>
      </Flex>
    </RootWrapper>
  );
}

export default Home;

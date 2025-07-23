import { LocalizationProvider, StaticDatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Root as AlertDialogRoot } from "@radix-ui/react-alert-dialog";
import { Box, Flex } from "@radix-ui/themes";
import { useQueryClient } from "@tanstack/react-query";
import dayjs from "dayjs";
import { useState } from "react";
import InfinitePostSection from "../components/PostSection/InfinitePostSection";
import AddPostButton from "../components/PromptSection/AddPostButton";
import InputAlertDialog from "../components/PromptSection/InputAlertDialog";
import PromptSection from "../components/PromptSection/PromptSection";
import PromptText from "../components/PromptSection/PromptText";
import ResponseSnackbar from "../components/ResponseSnackbar";
import ScrollToTop from "../components/ScrollToTop";
import useAuth from "../hooks/auth/useAuth";
import useAddPost from "../hooks/post/useAddPost";
import useGetPosts from "../hooks/post/useGetPosts";
import { StaticDatePickerStyle } from "../utils/Date";
import PostInputBox from "../components/PromptSection/PostInputBox";
import { useNavigate } from "react-router-dom";

function Home() {
  const { user } = useAuth();
  const navigate = useNavigate();
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
    userId: user?.id,
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
            <PromptText />
            <AlertDialogRoot
              open={addPostDialog}
              onOpenChange={setAddPostDialog}
            >
              {/* {isToday && <AddPostButton />} */}
              {isToday && <PostInputBox onClick={handlePostInputClick} />}
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
      <ScrollToTop />
    </>
  );
}

export default Home;

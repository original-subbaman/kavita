import PostSection from "../components/PostSection/PostSection";
import PromptSection from "../components/PromptSection/PromptSection";
import RootWrapper from "../components/RootWrapper";
import useGetPosts from "../hooks/post/useGetPosts";
import useAddPost from "../hooks/post/useAddPost";
import PromptText from "../components/PromptSection/PromptText";
import AddPostButton from "../components/PromptSection/AddPostButton";
import InputAlertDialog from "../components/PromptSection/InputAlertDialog";
import { Root as AlertDialogRoot } from "@radix-ui/react-alert-dialog";
import { useState } from "react";
import { Flex, Box, Heading } from "@radix-ui/themes";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import PostLoading from "../components/PostLoading";
function Home() {
  const [addPostDialog, setAddPostDialog] = useState(false);
  const [date, setDate] = useState(dayjs(new Date()));

  const { mutate: addPost, isPending: isPosting } = useAddPost({
    onSuccess: () => {
      setAddPostDialog(false);
      setPost("");
    },
  });

  const { data: posts, isFetching: isFetchingPosts } = useGetPosts({
    keys: [isPosting],
  });

  return (
    <RootWrapper>
      <Flex display={"flex"} gap={"2"} className="min-h-screen">
        {/** suggest prompt section */}
        <Box className="flex-1"></Box>
        <Box className="flex-1">
          <PromptSection>
            <PromptText />
            <AlertDialogRoot
              open={addPostDialog}
              onOpenChange={setAddPostDialog}
            >
              <AddPostButton />
              <InputAlertDialog
                addPost={addPost}
                prompt={"A quick brown fox jumped over the lazy dog"} // Replace with actual prompt from the backend
                mutationState={isPosting}
              />
            </AlertDialogRoot>
          </PromptSection>
          {posts && <PostSection posts={posts} />}
          {isFetchingPosts && <PostLoading />}
        </Box>
        {/** filter */}
        <Box className="flex-1 my-8 color-white flex flex-col items-center ">
          <Heading color="green">Filter</Heading>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label={"Pick a date"}
              value={date}
              onChange={(newValue) => setDate(newValue)}
              sx={{
                "&.MuiPickersToolbar-root": {
                  borderRadius: "10px",
                },
                "& .MuiInputBase-root": {
                  backgroundColor: "#17271c",
                },
                "& .MuiOutlinedInput-notchedOutline": {
                  borderColor: "#17271c",
                },
                "& .MuiInputLabel-root": {
                  color: "#15803d", // Optional: change the label color
                },
                "& .MuiFormLabel-root": {
                  color: "#15803d", // Optional: change the floating label color
                },
                "& .MuiPickersDay-day": {
                  color: "#15803df", // Optional: change the day color
                  "&:hover": {
                    borderColor: "white",
                  },
                },
                "& .MuiPickersDay-daySelected": {
                  backgroundColor: "#0050b3", // Optional: change the selected day background color
                },
              }}
            />
          </LocalizationProvider>
        </Box>
      </Flex>
    </RootWrapper>
  );
}

export default Home;

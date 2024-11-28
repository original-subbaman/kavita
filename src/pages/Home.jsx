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

function Home() {
  const [addPostDialog, setAddPostDialog] = useState(false);
  const today = dayjs(new Date());
  const [date, setDate] = useState(today);
  const isToday = date.isSame(today, "day");
  const queryClient = useQueryClient();

  const {
    data: newPost,
    mutate: addPost,
    isPending: isPosting,
  } = useAddPost({
    onSuccess: () => {
      setAddPostDialog(false);
      setPost("");
      queryClient.invalidateQueries({ queryKey: ["get_latest_posts", date] });
    },
  });

  const {
    data: posts,
    isFetching: isFetchingPosts,
    isFetched: isPostsFetched,
  } = useGetPosts({
    date: date.toDate(),
    keys: [],
  });

  return (
    <RootWrapper>
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
          {isPostsFetched && <PostSection posts={posts} />}
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

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

const StaticDatePickerStyle = {
  backgroundColor: "#1e1e1e",
  color: "white",
  "& .MuiDayCalendar-weekDayLabel": { color: "#15803d" },
  ".MuiButtonBase-root": {
    color: "white",
  },
  ".MuiDayPicker-daySelected": {
    backgroundColor: "#15803d", // Background color for selected date
    color: "#fff", // Text color for selected date
    borderRadius: "8px", // Rounded corners for selected date
  },
  ".MuiPickersDay-root:hover": {
    backgroundColor: "#444",
  },
  ".MuiButtonBase-root.Mui-selected": {
    backgroundColor: "#15803d", // Background color for selected date
  },
  ".MuiPickersToolbar-root": {
    color: "white",
    backgroundColor: "#1e1e1e", // Dark mode calendar background
    borderRadius: "12px", // Rounded corners for the calendar
  },
};

function Home() {
  const [addPostDialog, setAddPostDialog] = useState(false);
  const today = dayjs(new Date());
  const [date, setDate] = useState(today);
  const isToday = date.isSame(today, "day");

  const { mutate: addPost, isPending: isPosting } = useAddPost({
    onSuccess: () => {
      setAddPostDialog(false);
      setPost("");
    },
  });

  const {
    data: posts,
    isFetching: isFetchingPosts,
    isFetched: isPostsFetched,
  } = useGetPosts({
    date: date.toDate(),
    keys: [isPosting],
  });

  return (
    <RootWrapper>
      <Flex display={"flex"} gap={"2"} className="min-h-screen">
        {/** suggest prompt section */}
        <Box className="flex-1"></Box>
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
        <Box className="flex-1 my-8 color-white flex flex-col items-center ">
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

import { useMediaQuery } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import { Box, Text } from "@radix-ui/themes";
import { AnimatePresence, motion } from "framer-motion";
import { Feather } from "lucide-react";
import { useState } from "react";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import PopularThemes from "../components/Home/PopularThemes";
import PostFilter from "../components/Home/PostFilter";
import WeeklyTheme from "../components/Home/WeeklyTheme";
import InfinitePostSection from "../components/PostSection/InfinitePostSection";
import PromptSection from "../components/PromptSection/PromptSection";
import ResponseSnackbar from "../components/ResponseSnackbar";
import ScrollToTop from "../components/ScrollToTop";
import { PostActionsProvider } from "../context/PostActionContext";
import useAuth from "../hooks/auth/useAuth";
import useGetInfinitePosts from "../hooks/post/useGetInfinitePosts";
import useGetPopularThemes from "../hooks/post/useGetPopularThemes";
import useGetWeeklyTheme from "../hooks/post/useGetWeeklyTheme";
import { useAppTheme } from "../hooks/useAppTheme";

const ALL_FEED_TYPE = { id: "all", prompt: "All" };

function Home() {
  const { user } = useAuth();
  const { mode } = useAppTheme();
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:600px)");
  const [showPopularThemes, setShowPopularThemes] = useState(!isMobile);
  const showIntro = useSelector((state) => state.homeIntroReducer.showIntro);
  const dispatch = useDispatch();

  const [filter, setFilter] = useState({
    feedType: "all",
    theme: ALL_FEED_TYPE,
  });
  const [response, setResponse] = useState({
    success: false,
    error: false,
    message: "",
  });

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
      theme:
        filter.theme && filter.theme?.id === "all"
          ? undefined
          : filter.theme?.id,
    });

  const handleClose = () => {
    setResponse({ error: false, success: false, message: "" });
  };

  const handlePostInputClick = () => {
    navigate(`/posts/new/${filter.theme?.id || currWeeklyTheme?.id}`, {
      state: { writingTheme: filter.theme || currWeeklyTheme },
    });
  };

  let themes = [];
  if (isThemeFetched) {
    prompt = currWeeklyTheme.prompt;
    themes.unshift(currWeeklyTheme);
    themes.unshift({ id: "all", prompt: "All" });
  }

  if (isPopularThemesFetched && popularThemes?.data.length > 0) {
    themes.push(...popularThemes.data);
  }

  const activeTheme = currWeeklyTheme;

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
      <AnimatePresence mode="wait">
        <motion.div
          key="posts"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 100 }}
          transition={{ duration: 0.5 }}
        >
          <div className="container mx-auto px-4 py-8">
            {/* Writing Theme Section */}
            <WritingThemeSection
              isFetchingPrompt={isFetchingPrompt}
              mode={mode}
              activeTheme={activeTheme}
              handlePostInputClick={handlePostInputClick}
            />
            {/* Filters */}
            <Box className="flex flex-col gap-4 mb-4">
              {/* Filter by Popular Themes */}
              <div className="">
                <div
                  className={`flex items-center justify-between ${
                    mode === "dark" ? "text-white" : "text-black"
                  }`}
                >
                  <Text size={"2"} className="font-semibold">
                    Filter by Popular Themes:
                  </Text>
                  <IconButton
                    size="small"
                    onClick={() => setShowPopularThemes((prev) => !prev)}
                    aria-label={showPopularThemes ? "Collapse" : "Expand"}
                    sx={{ color: mode === "dark" ? "#fff" : "#222" }}
                  >
                    {showPopularThemes ? <MdExpandMore /> : <MdExpandLess />}
                  </IconButton>
                </div>
                {/* <Collapse in={showPopularThemes} timeout="auto" unmountOnExit> */}
                <PopularThemes
                  seletedTheme={filter.theme}
                  setTheme={(t) => setFilter((f) => ({ ...f, theme: t }))}
                  themes={themes}
                />
                {/* </Collapse> */}
              </div>

              {/* Fitler by feed type */}
              <PostFilter setOption={setFilter} />
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
          </div>
          <ScrollToTop />
        </motion.div>
      </AnimatePresence>
    </>
  );
}

const LoadingTheme = () => (
  <Text size={"6"} className="animate-fade-pulse text-radix-green">
    Fetching theme...
  </Text>
);

const WritingThemeSection = ({
  isFetchingPrompt,
  mode,
  activeTheme,
  handlePostInputClick,
}) => {
  return (
    <PromptSection>
      {/* Today's prompt text */}
      {isFetchingPrompt ? (
        <LoadingTheme />
      ) : (
        <WeeklyTheme
          theme={mode}
          writingTheme={activeTheme?.prompt}
          submissions={activeTheme?.submissionCount}
        />
      )}
    </PromptSection>
  );
};

export default Home;

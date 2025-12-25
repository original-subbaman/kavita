import { useMediaQuery } from "@mui/material";
import Collapse from "@mui/material/Collapse";
import IconButton from "@mui/material/IconButton";
import { Box, Flex, Text } from "@radix-ui/themes";
import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { MdExpandLess, MdExpandMore } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import AuthGuard from "../components/AuthGuard";
import HeroSection from "../components/Home/HeroSection";
import PopularThemes from "../components/Home/PopularThemes";
import PostFilter from "../components/Home/PostFilter";
import WeeklyTheme from "../components/Home/WeeklyTheme";
import InfinitePostSection from "../components/PostSection/InfinitePostSection";
import PostInputBox from "../components/PromptSection/PostInputBox";
import PromptSection from "../components/PromptSection/PromptSection";
import ResponseSnackbar from "../components/ResponseSnackbar";
import ScrollToTop from "../components/ScrollToTop";
import { PostActionsProvider } from "../context/PostActionContext";
import useAuth from "../hooks/auth/useAuth";
import useGetInfinitePosts from "../hooks/post/useGetInfinitePosts";
import useGetPopularThemes from "../hooks/post/useGetPopularThemes";
import useGetWeeklyTheme from "../hooks/post/useGetWeeklyTheme";
import { useAppTheme } from "../hooks/useAppTheme";

function Home() {
  const { user, isAuthenticated } = useAuth();
  const { mode } = useAppTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery("(max-width:600px)");
  const [showPopularThemes, setShowPopularThemes] = useState(!isMobile);
  const [showPostSection, setShowPostSection] = useState(
    location.state?.showPostSection || isAuthenticated || false
  );
  const [filter, setFilter] = useState({
    feedType: "all",
    theme: null,
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
      theme: filter.theme?.id || currWeeklyTheme?.id,
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
  }

  if (isPopularThemesFetched && popularThemes?.data.length > 0) {
    themes.push(...popularThemes.data);
  }

  const activeTheme = filter.theme || currWeeklyTheme;

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
        {/* Hero Section */}
        {!showPostSection && (
          <motion.div
            key="hero"
            initial={{ opacity: 1, y: 0 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -100 }}
            transition={{ duration: 0.5 }}
          >
            <HeroSection
              onReadPoemsClick={() => setShowPostSection(true)}
              onSubmitYoursClick={handlePostInputClick}
            />
          </motion.div>
        )}
        {showPostSection && (
          <motion.div
            key="posts"
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            transition={{ duration: 0.5 }}
          >
            <Flex display={"flex"} gap={"2"} className="min-h-screen ">
              {/* suggest prompt section */}
              <Box className="flex-1 hidden sm:block"></Box>
              {/* Posts Section */}
              <Box className="flex-1 md:w-[800px]">
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
                  <div className="mx-4">
                    <div
                      className={`flex items-center justify-between ${
                        mode === "dark" ? "text-white" : "text-black"
                      }`}
                    >
                      <Text size={"2"}>Filter by Popular Themes:</Text>
                      <IconButton
                        size="small"
                        onClick={() => setShowPopularThemes((prev) => !prev)}
                        aria-label={showPopularThemes ? "Collapse" : "Expand"}
                        sx={{ color: mode === "dark" ? "#fff" : "#222" }}
                      >
                        {showPopularThemes ? (
                          <MdExpandMore />
                        ) : (
                          <MdExpandLess />
                        )}
                      </IconButton>
                    </div>
                    <Collapse
                      in={showPopularThemes}
                      timeout="auto"
                      unmountOnExit
                    >
                      <PopularThemes
                        seletedTheme={filter.theme || currWeeklyTheme}
                        setTheme={(t) => setFilter((f) => ({ ...f, theme: t }))}
                        themes={themes}
                      />
                    </Collapse>
                  </div>

                  {/* Fitler by feed type */}
                  <AuthGuard>
                    <div className="self-end mr-4 md:mr-0">
                      <PostFilter setOption={setFilter} />
                    </div>
                  </AuthGuard>
                </Box>
                {/* Post Section */}
                <PostActionsProvider onPostAction={() => {}}>
                  <div
                    className={`md:w-[800px] drop-shadow-md border border-gray-300 
                      rounded-2xl p-2 my-4 mx-2 md:mx-0 
                      min-h-[80vh] flex flex-col justify-stretch
                      `}
                  >
                    <InfinitePostSection
                      data={data}
                      hasNextPage={hasNextPage}
                      fetchNextPage={fetchNextPage}
                      isFetchingNextPage={isFetchingNextPage}
                      status={status}
                      containerStyles={"md:w-[800px]"}
                    />
                  </div>
                </PostActionsProvider>
              </Box>
              <Box className="flex-1 my-8 color-white hidden sm:flex flex-col items-center  "></Box>
            </Flex>
            <ScrollToTop />
          </motion.div>
        )}
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
      <Box className="w-[93%] md:w-full sm:mx-4">
        {/* Today's prompt text */}
        {isFetchingPrompt ? (
          <LoadingTheme />
        ) : (
          <WeeklyTheme theme={mode} writingTheme={activeTheme?.prompt} />
        )}
        <div className="mt-2">
          <PostInputBox onClick={handlePostInputClick} theme={mode} />
        </div>
      </Box>
    </PromptSection>
  );
};

export default Home;

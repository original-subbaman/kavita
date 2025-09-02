import { Box, Container } from "@radix-ui/themes";
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

const MyPosts = () => {
  const { user } = useAuth();
  const [response, setResponse] = useState({
    success: false,
    error: false,
    msg: "",
  });

  const [filterDate, setFilterDate] = useState({
    from: dayjs().startOf("year"),
    to: dayjs(),
  });
  const [searchTerm, setSearchTerm] = useState("");
  const debounceSearch = useDebounceSearch(searchTerm);

  const { data: posts, isFetching: isFetchingPosts } = useGetUserPosts({
    id: user.id,
    from: filterDate.from,
    to: filterDate.to,
    search: debounceSearch,
  });

  const { mutate: hidePost } = useHidePost({
    onSuccess: (res) => {
      return setResponse((prev) => ({
        ...prev,
        success: true,
        msg: res || "Success",
      }));
    },
    onError: () =>
      setResponse((prev) => ({
        ...prev,
        error: true,
        msg: "Something went wrong",
      })),
  });

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleCloseResponse = () =>
    setResponse({ success: false, error: false, msg: "" });

  return (
    <Container size={"2"} className="mx-2">
      {/* Success Response Snackbar */}
      {response.success && (
        <ResponseSnackbar
          open
          onClose={handleCloseResponse}
          severity="success"
          message={response.msg}
        />
      )}
      {/* Error Response Snackbar */}
      {response.error && (
        <ResponseSnackbar
          open
          onClose={handleCloseResponse}
          severity="error"
          message={response.msg}
        />
      )}
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
      {isFetchingPosts ? (
        <Loading />
      ) : (
        <PostSection posts={posts} showMenu={true} hidePost={hidePost} />
      )}
    </Container>
  );
};

export default MyPosts;

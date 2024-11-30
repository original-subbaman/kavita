import { Container, Flex, Box } from "@radix-ui/themes";
import dayjs from "dayjs";
import { useState } from "react";
import DateFilter from "../components/MyPosts/DateFilter";
import PostSection from "../components/PostSection/PostSection";
import RootWrapper from "../components/RootWrapper";
import useGetUserPosts from "../hooks/post/useGetUserPosts";
import QuoteSearchBox from "../components/QuoteSearchBox";
import useDebounceSearch from "../hooks/useDebounceSearch";
const MyPosts = () => {
  const [filterDate, setFilterDate] = useState({
    from: dayjs().startOf("year"),
    to: dayjs(),
  });
  const [searchTerm, setSearchTerm] = useState("");
  const debounceSearch = useDebounceSearch(searchTerm);

  const { data: posts } = useGetUserPosts({
    id: "1feebd99-74d7-4b2d-9692-9742e6d7dd2d",
    from: filterDate.from,
    to: filterDate.to,
    search: debounceSearch,
  });

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <RootWrapper>
      <Container my={"8"}>
        <Box className="flex-1">
          <QuoteSearchBox handleSearchChange={handleSearchChange} size="2" />
        </Box>
        <DateFilter
          from={filterDate.from}
          to={filterDate.to}
          setFilterDate={setFilterDate}
        />
      </Container>
      <PostSection posts={posts} />
    </RootWrapper>
  );
};

export default MyPosts;

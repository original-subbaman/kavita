import { Container } from "@radix-ui/themes";
import dayjs from "dayjs";
import { useState } from "react";
import DateFilter from "../components/MyPosts/DateFilter";
import PostSection from "../components/PostSection/PostSection";
import RootWrapper from "../components/RootWrapper";
import useGetUserPosts from "../hooks/post/useGetUserPosts";

const MyPosts = () => {
  const [filterDate, setFilterDate] = useState({
    from: dayjs().subtract(1, "month"),
    to: dayjs(),
  });

  const { data: posts } = useGetUserPosts({
    id: "1feebd99-74d7-4b2d-9692-9742e6d7dd2d",
    from: filterDate.from,
    to: filterDate.to,
  });

  return (
    <RootWrapper>
      <Container>
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

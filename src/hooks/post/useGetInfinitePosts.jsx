import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchPostsPagination } from "../../api/post.api";

const useGetInfinitePosts = () => {
  return useInfiniteQuery({
    queryKey: ["infinite_posts"],
    queryFn: ({ pageParam }) => {
      return fetchPostsPagination({ pageParam });
    },
    getNextPageParam: (lastPage, pages) => {
      return lastPage.nextCursor;
    },
  });
};

export default useGetInfinitePosts;

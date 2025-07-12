import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchPostsPagination } from "../../api/post.api";

const useGetInfinitePosts = () => {
  return useInfiniteQuery({
    queryKey: ["infinite_posts"],
    queryFn: ({ pageParam }) => {
      return fetchPostsPagination({ pageParam });
    },
    getNextPageParam: (lastPage, pages) => {
      return lastPage?.hasMore ? lastPage.nextCursor : undefined;
    },
  });
};

export default useGetInfinitePosts;

import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchPostsPagination } from "../../api/post.api";

const useGetInfinitePosts = ({ userId, feedType, theme }) => {
  return useInfiniteQuery({
    queryKey: ["infinite_posts", userId, feedType, theme],
    queryFn: ({ pageParam }) =>
      fetchPostsPagination({
        pageParam,
        userId,
        feedType,
        theme,
      }),
    getNextPageParam: (lastPage, pages) => {
      return lastPage?.hasMore ? lastPage.nextCursor : undefined;
    },
    refetchOnMount: "always",
    staleTime: 0,
  });
};

export default useGetInfinitePosts;

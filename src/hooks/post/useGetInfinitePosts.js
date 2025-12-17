import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchPostsPagination } from "../../api/post.api";

const useGetInfinitePosts = ({ userId, feedType, theme, excludeAnon }) => {
  return useInfiniteQuery({
    queryKey: ["infinite_posts", userId, feedType, theme, excludeAnon],
    queryFn: ({ pageParam }) =>
      fetchPostsPagination({
        pageParam,
        excludeAnon,
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

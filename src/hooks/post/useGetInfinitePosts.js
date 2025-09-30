import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchPostsPagination } from "../../api/post.api";

const useGetInfinitePosts = ({ userId, feedType, theme }) => {
  console.log("🚀 ~ useGetInfinitePosts ~ feedType:", feedType);
  return useInfiniteQuery({
    queryKey: ["infinite_posts", userId, feedType, theme],
    queryFn: async ({ pageParam }) => {
      return await fetchPostsPagination({
        pageParam,
        userId,
        feedType,
        theme,
      });
    },
    enabled: !!theme,
    getNextPageParam: (lastPage, pages) => {
      return lastPage?.hasMore ? lastPage.nextCursor : undefined;
    },
    refetchOnMount: "always",
    staleTime: 0,
  });
};

export default useGetInfinitePosts;

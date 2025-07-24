import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchPostsPagination } from "../../api/post.api";

const useGetInfinitePosts = () => {
  return useInfiniteQuery({
    queryKey: ["infinite_posts"],
    queryFn: async ({ pageParam }) => {
      return await fetchPostsPagination({ pageParam });
    },
    getNextPageParam: (lastPage, pages) => {
      return lastPage?.hasMore ? lastPage.nextCursor : undefined;
    },
    refetchOnMount: "always",
    staleTime: 0,
  });
};

export default useGetInfinitePosts;

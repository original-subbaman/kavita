import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchPostsPagination } from "../../api/post.api";

const useGetInfinitePosts = ({ userId, filter }) => {
  return useInfiniteQuery({
    queryKey: ["infinite_posts", userId, filter],
    queryFn: async ({ pageParam }) => {
      return await fetchPostsPagination({ pageParam, userId, filter });
    },
    getNextPageParam: (lastPage, pages) => {
      return lastPage?.hasMore ? lastPage.nextCursor : undefined;
    },
    refetchOnMount: "always",
    staleTime: 0,
  });
};

export default useGetInfinitePosts;

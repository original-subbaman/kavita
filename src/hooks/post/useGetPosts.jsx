import { fetchPosts } from "../../api/post.api";
import { useQuery } from "@tanstack/react-query";
const useGetPosts = ({ keys = [] }) => {
  return useQuery({
    queryKey: ["get_latest_posts", ...keys],
    queryFn: () => fetchPosts(),
    staleTime: 30000,
  });
};

export default useGetPosts;

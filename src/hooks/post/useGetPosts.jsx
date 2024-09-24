import { fetchPosts } from "../../api/post.api";
import { useQuery } from "@tanstack/react-query";
const useGetPosts = ({ date, keys = [] }) => {
  return useQuery({
    queryKey: ["get_latest_posts", date, ...keys],
    queryFn: () => fetchPosts({ date: date }),
    staleTime: 30000,
  });
};

export default useGetPosts;

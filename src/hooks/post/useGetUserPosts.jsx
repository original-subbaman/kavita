import { fetchPostsById } from "../../api/post.api";
import { useQuery } from "@tanstack/react-query";
const useGetUserPosts = ({ id, keys = [], from, to, search }) => {
  return useQuery({
    queryKey: ["get_user_posts", id, from, to, search, ...keys],
    queryFn: () => fetchPostsById({ id, from, to, search }),
    staleTime: 30000,
  });
};

export default useGetUserPosts;

import { fetchPostsById } from "../../api/post.api";
import { useQuery } from "@tanstack/react-query";
const useGetUserPosts = ({ id, keys = [], from, to }) => {
  return useQuery({
    queryKey: ["get_user_posts", id, from, to, ...keys],
    queryFn: () => fetchPostsById({ id, from, to }),
    staleTime: 30000,
  });
};

export default useGetUserPosts;

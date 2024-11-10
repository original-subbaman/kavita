import { fetchPostsById } from "../../api/post.api";
import { useQuery } from "@tanstack/react-query";
const useGetUserPosts = ({ id, keys = [] }) => {
  return useQuery({
    queryKey: ["get_user_posts", id, ...keys],
    queryFn: () => fetchPostsById({ id }),
    staleTime: 30000,
  });
};

export default useGetUserPosts;

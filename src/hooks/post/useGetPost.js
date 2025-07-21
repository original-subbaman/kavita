import { useQuery } from "@tanstack/react-query";
import { fetchPostAndLikeStatus } from "../../api/post.api";

const useGetPost = ({ postId, userId, isUpdating, staleTime = Infinity }) => {
  return useQuery({
    queryKey: ["get_post", postId, userId, isUpdating],
    queryFn: () => fetchPostAndLikeStatus(postId, userId),
    staleTime: staleTime,
  });
};

export default useGetPost;

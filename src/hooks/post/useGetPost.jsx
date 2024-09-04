import { useQuery } from "@tanstack/react-query";
import { fetchPostAndLikeStatus } from "../../api/post.api";

const useGetPost = ({ postId, userId, isUpdating }) => {
  return useQuery({
    queryKey: ["get_post", postId, userId, isUpdating],
    queryFn: () => fetchPostAndLikeStatus(postId, userId),
  });
};

export default useGetPost;

import { useQuery } from "@tanstack/react-query";
import { fetchPostAndLikeStatus } from "../../api/post.api";

const useGetPost = ({
  postId,
  userId,
  isUpdating,
  select = (data) => data,
  staleTime = Infinity,
}) => {
  return useQuery({
    queryKey: ["get_post", postId, userId, isUpdating],
    queryFn: () => fetchPostAndLikeStatus(postId, userId),
    enabled: !!postId,
    staleTime: staleTime,
    select: select,
  });
};

export default useGetPost;

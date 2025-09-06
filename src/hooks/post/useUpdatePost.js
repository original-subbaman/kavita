import { useMutation } from "@tanstack/react-query";
import { updatePost } from "../../api/post.api";

const useUpdatePost = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: ({ post, postId, userId, bgColor }) =>
      updatePost(post, postId, userId, bgColor),
    onSuccess: onSuccess,
    onError: onError,
  });
};

export default useUpdatePost;

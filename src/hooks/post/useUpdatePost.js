import { useMutation } from "@tanstack/react-query";
import { updatePost } from "../../api/post.api";

const useUpdatePost = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: ({ post, title, postId, userId }) =>
      updatePost(post, title, postId, userId),
    onSuccess: onSuccess,
    onError: onError,
  });
};

export default useUpdatePost;

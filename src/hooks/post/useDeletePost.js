import { useMutation } from "@tanstack/react-query";
import { deletePost } from "../../api/post.api";

const useDeletePost = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: ({ userId, postId }) => deletePost({ userId, postId }),
    onSuccess,
    onError,
  });
};

export default useDeletePost;

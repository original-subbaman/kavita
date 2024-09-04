import { useMutation } from "@tanstack/react-query";
import { addLikes } from "../../api/likes.api";

const useLikePost = ({ onSuccess, onError, onSettled }) => {
  return useMutation({
    mutationFn: (params) =>
      addLikes({ postId: params.postId, userId: params.userId }),
    onSuccess: onSuccess,
    onError: onError,
    onSettled: onSettled,
  });
};

export default useLikePost;

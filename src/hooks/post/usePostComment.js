import { useMutation } from "@tanstack/react-query";
import { postComment } from "../../api/post.api";

export const usePostComment = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: (params) =>
      postComment(params.postId, params.userId, params.comment),
    onSuccess: onSuccess,
    onError: onError,
  });
};

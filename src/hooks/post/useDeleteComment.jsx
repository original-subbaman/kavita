import { useMutation } from "@tanstack/react-query";
import { deleteComment } from "../../api/post.api";

const useDeleteComment = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: (params) => deleteComment(params.commentId),
    onSuccess: onSuccess,
    onError: onError,
  });
};

export default useDeleteComment;

import { useMutation } from "@tanstack/react-query";
import { reportComment } from "../../api/post.api";

const useReportComment = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: ({ postId, commentId, userId, reason, additionalInfo }) =>
      reportComment(postId, commentId, userId, reason, additionalInfo),
    onSuccess,
    onError,
  });
};

export default useReportComment;

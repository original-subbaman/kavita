import { reportPost } from "../../api/post.api";
import { useMutation } from "@tanstack/react-query";

const useReportPost = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: (reportData) =>
      reportPost(
        reportData.postId,
        reportData.userId,
        reportData.reason,
        reportData.additionalInfo
      ),
    onSuccess: onSuccess,
    onError: onError,
  });
};

export default useReportPost;

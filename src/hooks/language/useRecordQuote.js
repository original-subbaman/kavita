import { useMutation } from "@tanstack/react-query";
import { recordQuote } from "../../api/quotes.api";

const useRecordQuote = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: (params) =>
      recordQuote({
        language: params.language,
        userId: params.userId,
        postId: params.postId,
      }),
    onSuccess: onSuccess,
    onError: onError,
  });
};

export default useRecordQuote;

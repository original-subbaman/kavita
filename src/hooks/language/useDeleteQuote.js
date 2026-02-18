import { useMutation } from "@tanstack/react-query";
import { deleteQuote } from "../../api/quotes.api";

const useDeleteQuote = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: ({ userId, quoteId }) => deleteQuote({ userId, quoteId }),
    onSuccess: onSuccess,
    onError: onError,
  });
};

export default useDeleteQuote;

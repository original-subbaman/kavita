import { useMutation } from "@tanstack/react-query";
import { deleteLanguage } from "../../api/language.api";

const useDeleteLanguage = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: ({ userId, quoteId }) => deleteLanguage({ userId, quoteId }),
    onSuccess: onSuccess,
    onError: onError,
  });
};

export default useDeleteLanguage;

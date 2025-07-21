import { useMutation } from "@tanstack/react-query";
import { recordLanguage } from "../../api/language.api";

const useRecordLanguage = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: (params) =>
      recordLanguage({
        language: params.language,
        userId: params.userId,
        postId: params.postId,
      }),
    onSuccess: onSuccess,
    onError: onError,
  });
};

export default useRecordLanguage;

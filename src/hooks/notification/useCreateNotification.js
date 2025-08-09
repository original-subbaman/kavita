import { useMutation } from "@tanstack/react-query";
import { createNotification } from "../../api/notification.api";

const useCreateNotification = (onSuccess = () => {}, onError = () => {}) => {
  return useMutation({
    mutationFn: (params) =>
      createNotification(
        params.postId,
        params.recipientId,
        params.senderId,
        params.message,
        params.type,
        params.target
      ),
    onSuccess: onSuccess,
    onError: onError,
  });
};

export default useCreateNotification;

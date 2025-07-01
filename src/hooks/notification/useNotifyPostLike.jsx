import { useMutation } from "@tanstack/react-query";
import { createNotificationForPostLike } from "../../api/notification.api";

const useNotifyPostLike = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: (params) =>
      createNotificationForPostLike(
        params.postId,
        params.recipientId,
        params.senderId,
        params.message
      ),
    onSuccess: onSuccess,
    onError: onError,
  });
};

export default useNotifyPostLike;

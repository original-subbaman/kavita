import { useMutation } from "@tanstack/react-query";
import { removeNotificationForPost } from "../../api/notification.api";

const useRemovePostNotification = (
  onSuccess = () => {},
  onError = () => {}
) => {
  return useMutation({
    mutationFn: (params) =>
      removeNotificationForPost(
        params.postId,
        params.recipientId,
        params.senderId
      ),
    onSuccess,
    onError,
  });
};

export default useRemovePostNotification;

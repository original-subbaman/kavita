import { useMutation } from "@tanstack/react-query";
import { updateNotificationSeenState } from "../../api/notification.api";

const useUpdateNotificationSeenState = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: ({ userId }) => updateNotificationSeenState({ userId }),
    onSuccess: onSuccess,
    onError: onError,
  });
};

export default useUpdateNotificationSeenState;

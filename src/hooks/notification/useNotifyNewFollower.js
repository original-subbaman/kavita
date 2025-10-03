import { useMutation } from "@tanstack/react-query";
import { notifyNewFollower } from "../../api/notification.api";

const useNotifyNewFolower = () => {
  return useMutation({
    mutationFn: ({ followerId, followedId, message }) =>
      notifyNewFollower({ followerId, followedId, message }),
  });
};

export default useNotifyNewFolower;

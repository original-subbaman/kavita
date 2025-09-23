import { useMutation } from "@tanstack/react-query";
import { unfollowUser } from "../../api/user.api";

const useUnfollowUser = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: ({ followerId, followedId }) =>
      unfollowUser({ followerId, followedId }),
    onSuccess: onSuccess,
    onError: onError,
  });
};

export default useUnfollowUser;

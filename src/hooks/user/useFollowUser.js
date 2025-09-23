import { useMutation } from "@tanstack/react-query";
import { followUser } from "../../api/user.api";

const useFollowUser = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: ({ followerId, followedId }) =>
      followUser({ followedId, followerId }),
    onSuccess: onSuccess,
    onError: onError,
  });
};

export default useFollowUser;

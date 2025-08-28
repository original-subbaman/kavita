import { useMutation } from "@tanstack/react-query";
import { updateUser } from "../../api/user.api";

const useUpdateUser = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: ({ userId, user }) => updateUser({ userId, user }),
    onSuccess: onSuccess,
    onError: onError,
  });
};

export default useUpdateUser;

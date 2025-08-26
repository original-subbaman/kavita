import { useMutation } from "@tanstack/react-query";
import { uploadProfile } from "../../api/user.api";

const useUpdateUser = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: ({ userId, user }) => uploadProfile({ userId, user }),
    onSuccess: onSuccess,
    onError: onError,
  });
};

export default useUpdateUser;

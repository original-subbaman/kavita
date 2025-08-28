import { useMutation } from "@tanstack/react-query";
import { uploadProfile } from "../../api/user.api";

const useUploadProfile = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: ({ userId, profile }) => {
      return uploadProfile(userId, profile);
    },
    onSuccess,
    onError,
  });
};

export default useUploadProfile;

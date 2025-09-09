import { useMutation } from "@tanstack/react-query";
import { sendResetPasswordMail } from "../../api/auth.api";

const useResetPasswordMail = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: ({ email }) => sendResetPasswordMail({ email }),
    onSuccess,
    onError,
  });
};

export default useResetPasswordMail;

import { useMutation } from "@tanstack/react-query";
import { postAnnomously } from "../../api/post.api";

const usePostAnon = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: async ({ post, title, themeId }) =>
      postAnnomously(post, title, themeId),
    onSuccess,
    onError,
  });
};

export default usePostAnon;

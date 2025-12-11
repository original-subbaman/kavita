import { useMutation } from "@tanstack/react-query";
import { addPost } from "../../api/post.api";

const useAddPost = ({ onSuccess, onError, userId }) => {
  return useMutation({
    mutationFn: ({ post, title, themeId }) => {
      return addPost(post, title, userId, themeId);
    },
    onSuccess: onSuccess,
    onError: onError,
  });
};

export default useAddPost;

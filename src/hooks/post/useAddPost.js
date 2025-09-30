import { useMutation } from "@tanstack/react-query";
import { addPost } from "../../api/post.api";

const useAddPost = ({ onSuccess, onError, userId }) => {
  return useMutation({
    mutationFn: ({ post, themeId, bgColor }) =>
      addPost(post, userId, themeId, bgColor),
    onSuccess: onSuccess,
    onError: onError,
  });
};

export default useAddPost;

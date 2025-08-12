import { useMutation } from "@tanstack/react-query";
import { addPost } from "../../api/post.api";

const useAddPost = ({ onSuccess, onError, userId }) => {
  return useMutation({
    mutationFn: ({ post, bgColor }) => addPost(post, userId, bgColor),
    onSuccess: onSuccess,
    onError: onError,
  });
};

export default useAddPost;

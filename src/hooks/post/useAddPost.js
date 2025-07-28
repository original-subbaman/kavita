import { useMutation } from "@tanstack/react-query";
import { addPost } from "../../api/post.api";

const useAddPost = ({ onSuccess, onError, userId }) => {
  return useMutation({
    mutationFn: ({ post }) => addPost(post, userId),
    onSuccess: onSuccess,
    onError: onError,
  });
};

export default useAddPost;

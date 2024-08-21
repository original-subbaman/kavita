import { useMutation } from "@tanstack/react-query";
import { addPost } from "../../api/post.api";

const useAddPost = ({ onSuccess }) => {
  return useMutation({
    mutationFn: (params) => addPost(params.post),
    onSuccess: onSuccess,
  });
};

export default useAddPost;

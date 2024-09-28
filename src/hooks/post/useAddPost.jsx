import { useMutation } from "@tanstack/react-query";
import { addPost } from "../../api/post.api";

const useAddPost = ({ onSuccess }) => {
  return useMutation({
    mutationFn: async (params) => {
      const newPost = await addPost(params.post);
      return newPost[0];
    },
    onSuccess: onSuccess,
  });
};

export default useAddPost;

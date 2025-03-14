import { useMutation } from "@tanstack/react-query";
import { addPost } from "../../api/post.api";

const useAddPost = ({ onSuccess, userId }) => {
  return useMutation({
    mutationFn: async (params) => {
      const newPost = await addPost(params.post, userId);
      return newPost[0];
    },
    onSuccess: onSuccess,
  });
};

export default useAddPost;

import { useMutation } from "@tanstack/react-query";
import { togglePostVisibility } from "../../api/post.api";

const useHidePost = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: ({ postId, isHidden }) =>
      togglePostVisibility({ postId, isHidden }),
    onSuccess,
    onError,
  });
};

export default useHidePost;

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleLike } from "../../api/likes.api";
const useToggleLikeOnPost = ({ onSuccess = () => {}, onError, onSettled }) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (params) => toggleLike(params.postId, params.userId),
    onMutate: async ({ postId, userId }) => {
      await queryClient.cancelQueries({
        queryKey: ["get_post"],
      });

      const querySnapshot = queryClient.getQueryData([
        "get_post",
        postId,
        userId,
        false,
      ]);

      queryClient.setQueryData(
        ["get_post", postId, userId, false],
        (oldData) => {
          if (oldData) {
            return {
              ...oldData,
              hasLiked: true,
            };
          }
          return oldData;
        }
      );

      return { querySnapshot };
    },
    onSuccess: onSuccess,
    onError: (err, variables, context) => {
      console.log("🚀 ~ useLikePost ~ err:", err);
      if (context?.querySnapshot) {
        queryClient.setQueryData([], context.querySnapshot);
      }
      if (onError) {
        onError(err, variables);
      }
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: ["get_post"],
      });
      if (onSettled) {
        onSettled();
      }
    },
  });
};

export default useToggleLikeOnPost;

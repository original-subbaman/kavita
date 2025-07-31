import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toggleLike } from "../../api/likes.api";

const useToggleLikeOnPost = ({ onSuccess = () => {} }) => {
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
              hasLiked: oldData.hasLiked ? false : true,
            };
          }
          return oldData;
        }
      );

      return { querySnapshot };
    },
    onSuccess: onSuccess,
    onError: (err, variables, context) => {
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
    },
  });
};

export default useToggleLikeOnPost;

import { useQuery } from "@tanstack/react-query";
import { loadComments } from "../../api/post.api";

const useLoadComments = ({ postId }) => {
  return useQuery({
    queryKey: ["load_comments", postId],
    queryFn: () => loadComments(postId),
    staleTime: Infinity,
    select: (comments) => {
      return comments.map((comment) => ({
        created_at: comment.created_at,
        userName: comment.user.user_name,
        comment: comment.comment,
        userId: comment.user.id,
      }));
    },
  });
};

export default useLoadComments;

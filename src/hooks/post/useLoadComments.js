import { useQuery } from "@tanstack/react-query";
import { loadComments } from "../../api/post.api";

const useLoadComments = ({ postId }) => {
  return useQuery({
    queryKey: ["load_comments", postId],
    queryFn: () => loadComments(postId),
    staleTime: Infinity,
    select: (comments) => {
      return comments.map((comment) => ({
        id: comment.id,
        created_at: comment.created_at,
        userName: comment.profiles.user_name,
        comment: comment.comment,
        userId: comment.profiles.id,
      }));
    },
  });
};

export default useLoadComments;

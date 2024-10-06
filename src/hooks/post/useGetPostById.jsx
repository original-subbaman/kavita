import { useQuery } from "@tanstack/react-query";
import { getPostById } from "../../api/post.api";

const useGetPostById = ({ postId }) => {
  return useQuery({
    queryKey: ["single_post", postId],
    queryFn: () => getPostById(postId),
    enabled: !!postId,
    staleTime: Infinity,
  });
};

export default useGetPostById;

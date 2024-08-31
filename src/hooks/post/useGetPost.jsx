import { useQuery } from "@tanstack/react-query";
import { fetchAPost } from "../../api/post.api";

const useGetPost = ({ id }) => {
  return useQuery({
    queryKey: ["get_post", id],
    queryFn: () => fetchAPost(id),
  });
};

export default useGetPost;

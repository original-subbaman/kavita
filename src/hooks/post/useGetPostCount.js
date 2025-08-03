import { useQuery } from "@tanstack/react-query";
import { getPostCount } from "../../api/post.api";

const useGetPostCount = ({ userId, staleTime = Infinity }) => {
  return useQuery({
    queryKey: ["get_post_count", userId],
    queryFn: () => getPostCount(userId),
    staleTime: staleTime,
    enabled: !!userId,
  });
};

export default useGetPostCount;

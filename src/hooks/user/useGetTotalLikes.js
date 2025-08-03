import { useQuery } from "@tanstack/react-query";
import { getTotalLikes } from "../../api/likes.api";

const useGetTotalLikes = ({ userId, staleTime = Infinity }) => {
  return useQuery({
    queryKey: ["get_total_likes", userId],
    queryFn: () => getTotalLikes(userId),
    staleTime: staleTime,
    enabled: !!userId,
  });
};

export default useGetTotalLikes;

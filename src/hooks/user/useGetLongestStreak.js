import { useQuery } from "@tanstack/react-query";
import { getLongestStreak } from "../../api/user.api";

const useGetLongestStreak = ({ userId, staleTime = Infinity }) => {
  return useQuery({
    queryKey: ["get_longest_streak", userId],
    queryFn: () => getLongestStreak(userId),
    enabled: !!userId,
    staleTime: staleTime,
  });
};

export default useGetLongestStreak;

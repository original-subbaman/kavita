import { useQuery } from "@tanstack/react-query";
import { getUserActivityCount } from "../../api/user.api";

const useGetUserActivityCount = (userId, startDate, endDate) => {
  return useQuery({
    queryKey: ["get_user_activity_count", userId, startDate, endDate],
    queryFn: () => getUserActivityCount(userId, startDate, endDate),
    enabled: !!userId,
    staleTime: Infinity,
  });
};

export default useGetUserActivityCount;

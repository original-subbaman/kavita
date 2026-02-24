import { useQuery } from "@tanstack/react-query";
import { getWeeklyActivityCount } from "../../api/user.api";

const useGetWeeklyActivityCount = ({
  userId,
  select = (data) => data,
  staleTime = Infinity,
}) => {
  return useQuery({
    queryKey: ["weekly_activity_count", userId],
    queryFn: () => getWeeklyActivityCount(userId),
    enabled: !!userId,
    staleTime: staleTime,
    select: select,
  });
};

export default useGetWeeklyActivityCount;

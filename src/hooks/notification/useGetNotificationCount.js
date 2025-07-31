import { useQuery } from "@tanstack/react-query";
import { getTodaysNotificationCount } from "../../api/notification.api";

const useGetNotificationCount = (userId, staleTime = Infinity) => {
  return useQuery({
    queryKey: ["notification_count", userId],
    queryFn: () => getTodaysNotificationCount(userId),
    enabled: !!userId,
    staleTime: staleTime,
  });
};

export default useGetNotificationCount;

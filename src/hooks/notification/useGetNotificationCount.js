import { useQuery } from "@tanstack/react-query";
import { getNotificationCount } from "../../api/notification.api";

const useGetNotificationCount = (userId, staleTime = Infinity) => {
  return useQuery({
    queryKey: ["notification_count", userId],
    queryFn: () => getNotificationCount(userId),
    enabled: !!userId,
    staleTime: staleTime,
    refetchOnMount: true,
  });
};

export default useGetNotificationCount;

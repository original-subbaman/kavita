import { useQuery } from "@tanstack/react-query";
import { getRecentNotifications } from "../../api/notification.api";

const useGetRecentNotifications = ({
  userId,
  fromOffset,
  toOffset,
  staleTime = Infinity,
}) => {
  return useQuery({
    queryKey: ["recent_user_notifications", userId],
    queryFn: () => getRecentNotifications(userId, fromOffset, toOffset),
    enabled: !!userId,
    staleTime: staleTime,
  });
};

export default useGetRecentNotifications;

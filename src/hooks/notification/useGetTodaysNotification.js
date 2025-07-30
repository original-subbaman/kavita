import { useQuery } from "@tanstack/react-query";
import { getTodaysNotificationForUser } from "../../api/notification.api";

const useGetTodaysNotification = ({
  userId,
  fromOffset,
  toOffset,
  staleTime = Infinity,
}) => {
  return useQuery({
    queryKey: ["user_notifications", userId],
    queryFn: () => getTodaysNotificationForUser(userId, fromOffset, toOffset),
    enabled: !!userId,
    staleTime: staleTime,
  });
};

export default useGetTodaysNotification;

import { useQuery } from "@tanstack/react-query";
import { getNotificationForUser } from "../../api/notification.api";

const useGetNotificationForUser = ({ userId, staleTime = Infinity }) => {
  return useQuery({
    queryKey: ["user_notifications", userId],
    queryFn: () => getNotificationForUser(userId),
    enabled: !!userId,
    staleTime: staleTime,
  });
};

export default useGetNotificationForUser;

import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../api/user.api";

const useGetUser = ({ userId, staleTime = Infinity }) => {
  return useQuery({
    queryKey: ["user_get_user", userId],
    queryFn: () => getUser(userId),
    enabled: !!userId,
    staleTime: staleTime,
  });
};

export default useGetUser;

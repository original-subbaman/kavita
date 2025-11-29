import { useQuery } from "@tanstack/react-query";
import { getUser } from "../../api/user.api";

const useGetUser = ({ userId, table = "profiles", staleTime = Infinity }) => {
  return useQuery({
    queryKey: ["user_get_user", userId, table],
    queryFn: () => getUser(userId, table),
    enabled: !!userId,
    staleTime: staleTime,
  });
};

export default useGetUser;

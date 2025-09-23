import { useQuery } from "@tanstack/react-query";
import { getFollowerCount } from "../../api/user.api";

const useFollowerCount = ({ userId, staleTime = Infinity }) => {
  return useQuery({
    queryKey: ["follower_count", userId],
    queryFn: () => getFollowerCount({ userId }),
    staleTime: staleTime,
    enabled: !!userId,
    refetchOnMount: true,
    initialData: 0,
  });
};

export default useFollowerCount;

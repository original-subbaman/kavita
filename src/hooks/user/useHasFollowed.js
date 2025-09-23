import { useQuery } from "@tanstack/react-query";
import { hasFollowed } from "../../api/user.api";

const useHasFollowed = ({ followerId, followedId, staleTime = Infinity }) => {
  return useQuery({
    queryKey: ["has_followed", followerId, followedId],
    queryFn: () => hasFollowed({ followedId, followerId }),
    staleTime: staleTime,
    refetchOnMount: true,
    initialData: false,
  });
};

export default useHasFollowed;

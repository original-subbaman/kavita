import { useQuery } from "@tanstack/react-query";
import { getProfile } from "../../api/user.api";

const useGetProfile = ({ userId }) => {
  return useQuery({
    queryKey: ["get_profile", userId],
    queryFn: () => getProfile(userId),
    enabled: !!userId,
    staleTime: Infinity,
  });
};

export default useGetProfile;

import { useQuery } from "@tanstack/react-query";
import { getLanguageCount } from "../../api/language.api";

const useGetLanguageCount = ({ userId, staleTime = Infinity }) => {
  return useQuery({
    queryKey: ["get_language_count", userId],
    queryFn: () => getLanguageCount(userId),
    staleTime: staleTime,
    enabled: !!userId,
  });
};

export default useGetLanguageCount;

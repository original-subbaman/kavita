import { useQuery } from "@tanstack/react-query";
import { getQuotesCount } from "../../api/quotes.api";

const useGetQuotesCount = ({ userId, staleTime = Infinity }) => {
  return useQuery({
    queryKey: ["get_language_count", userId],
    queryFn: () => getQuotesCount(userId),
    staleTime: staleTime,
    enabled: !!userId,
  });
};

export default useGetQuotesCount;

import { useQuery } from "@tanstack/react-query";
import { getQuote } from "../../api/quotes.api";

const useGetQuotes = ({ userId, filters, staleTime = 6 * 60 * 1000 }) => {
  return useQuery({
    queryKey: ["user_quotes", userId, filters],
    queryFn: () => getQuote({ userId: userId, filters: filters }),
    staleTime: staleTime,
  });
};

export default useGetQuotes;

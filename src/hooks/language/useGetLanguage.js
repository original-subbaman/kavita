import { useQuery } from "@tanstack/react-query";
import { getLanguage } from "../../api/language.api";

const useGetLanguage = ({ userId, filters, staleTime = 6 * 60 * 1000 }) => {
  return useQuery({
    queryKey: ["user_language", userId, filters],
    queryFn: () => getLanguage({ userId: userId, filters: filters }),
    staleTime: staleTime,
  });
};

export default useGetLanguage;

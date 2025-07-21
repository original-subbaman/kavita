import { useQuery } from "@tanstack/react-query";
import { getLanguage } from "../../api/language.api";

const useGetLanguage = ({ userId }) => {
  return useQuery({
    queryKey: ["user_language", userId],
    queryFn: () => getLanguage({ userId: userId }),
  });
};

export default useGetLanguage;

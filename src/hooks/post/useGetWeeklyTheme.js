import { useQuery } from "@tanstack/react-query";
import { getWritingTheme } from "../../api/post.api";

const useGetWeeklyTheme = () => {
  return useQuery({
    queryKey: ["weekly_theme"],
    queryFn: () => getWritingTheme(),
    staleTime: Infinity,
    refetchOnMount: true,
    select: (data) => data,
  });
};

export default useGetWeeklyTheme;

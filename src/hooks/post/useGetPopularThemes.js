import { useQuery } from "@tanstack/react-query";
import { getPopularThemes } from "../../api/post.api";

const useGetPopularThemes = (staleTime = Infinity) => {
  return useQuery({
    queryKey: ["get_popular_themes"],
    queryFn: getPopularThemes,
    staleTime: staleTime,
  });
};

export default useGetPopularThemes;

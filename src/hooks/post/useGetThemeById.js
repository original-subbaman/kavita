import { useQuery } from "@tanstack/react-query";
import { getThemeById } from "../../api/post.api";

const useGetThemeById = ({ themeId }) => {
  return useQuery({
    queryKey: ["get_theme_by_id", themeId],
    queryFn: () => getThemeById(themeId),
    enabled: !!themeId,
    staleTime: Infinity,
  });
};

export default useGetThemeById;

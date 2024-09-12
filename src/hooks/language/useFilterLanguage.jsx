import { useMemo } from "react";

const useFilterLanguage = (quotes, searchTerm) => {
  return useMemo(() => {
    if (!quotes) return [];
    return quotes.filter(({ language }) =>
      language.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);
};

export default useFilterLanguage;

import React, { useState } from "react";
import RootWrapper from "../components/RootWrapper";
import { Container, Grid } from "@radix-ui/themes";
import { Text } from "@radix-ui/themes";
import QuoteSearchBox from "../components/QuoteSearchBox";
import useDebounceSearch from "../hooks/useDebounceSearch";
import useGetLanguage from "../hooks/language/useGetLanguage";
import useFilterLanguage from "../hooks/language/useFilterLanguage";
import { CircularProgress } from "@mui/material";

function LanguageWall(props) {
  const [searchTerm, setSearchTerm] = useState("");
  const debounceSearch = useDebounceSearch(searchTerm);

  const handleSearchChange = (event) => setSearchTerm(event.target.value);
  const {
    data: quotes,
    isLoading: isFetching,
    isFetched: isLanguageFetched,
  } = useGetLanguage({
    userId: "1feebd99-74d7-4b2d-9692-9742e6d7dd2d",
  });

  const filteredList = useFilterLanguage(quotes, debounceSearch);

  return (
    <RootWrapper>
      <Container className="mt-8" size={"2"}>
        <QuoteSearchBox handleSearchChange={handleSearchChange} />
        {isFetching && <CircularProgress />}
        {isLanguageFetched && (
          <Container className="text-white font-madimiOne" py={{ sm: "8" }}>
            {filteredList.map((quote, index) => (
              <Text
                mr={"3"}
                key={quote.id}
                className={`font-lora  ${
                  index % 3 === 0 ? "text-3xl" : "text-lg"
                }  hover:bg-radix-green/20 hover:px-[2px] duration-500 transition-all cursor-pointer tracking-wider`}
              >
                {quote.language}
              </Text>
            ))}
          </Container>
        )}
      </Container>
    </RootWrapper>
  );
}

export default LanguageWall;

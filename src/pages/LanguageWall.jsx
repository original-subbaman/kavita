import React, { useMemo, useState } from "react";
import RootWrapper from "../components/RootWrapper";
import { Container, Grid } from "@radix-ui/themes";
import { Text, Quote } from "@radix-ui/themes";
import QuoteSearchBox from "../components/QuoteSearchBox";
import useDebounceSearch from "../hooks/useDebounceSearch";
import useGetLanguage from "../hooks/language/useGetLanguage";
import useFilterLanguage from "../hooks/language/useFilterLanguage";
const exampleQuotes = [
  {
    quote:
      "All we have to decide is what to do with the time that is given us.",
  },
  {
    quote:
      "A man, after he has brushed off the dust and chips of his life, will have left only the hard, clean questions: Was it good or was it evil? Have I done well — or ill?",
  },
  {
    quote: "The only way out of the labyrinth of suffering is to forgive.",
  },
  {
    quote:
      "I took a deep breath and listened to the old brag of my heart: I am, I am, I am.",
  },
  {
    quote: "We accept the love we think we deserve.",
  },
  {
    quote: "We accept the love we think we deserve.",
  },
];
function LanguageWall(props) {
  const [searchTerm, setSearchTerm] = useState("");
  const debounceSearch = useDebounceSearch(searchTerm);

  const handleSearchChange = (event) => setSearchTerm(event.target.value);
  const { data: quotes } = useGetLanguage({
    userId: "1feebd99-74d7-4b2d-9692-9742e6d7dd2d",
  });

  const filteredList = useFilterLanguage(quotes, debounceSearch);

  return (
    <RootWrapper>
      <Container className="mt-8" size={"2"}>
        <QuoteSearchBox handleSearchChange={handleSearchChange} />
        <Container className="text-white font-madimiOne" py={{ sm: "8" }}>
          {filteredList.map((quote, index) => (
            <Text
              key={quote.id}
              className={`font-lora m-10 mr-10  ${
                index % 3 === 0 ? "text-3xl" : "text-lg"
              }  hover:bg-radix-green/20 hover:px-[2px] duration-500 transition-all cursor-pointer tracking-wider`}
            >
              {quote.language}
            </Text>
          ))}
        </Container>
      </Container>
    </RootWrapper>
  );
}

export default LanguageWall;

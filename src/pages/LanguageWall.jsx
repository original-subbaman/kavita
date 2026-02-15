import { useQueryClient } from "@tanstack/react-query";
import { Globe, Quote } from "lucide-react";
import { useMemo, useRef, useState } from "react";

import "../components/BottomPane/bottom-pane.css";
import DeleteQuoteDialog from "../components/LanguageWall/DeleteQuoteDialog";
import { QuoteCard } from "../components/LanguageWall/QuoteCard";
import Loading from "../components/Loading";
import QuoteSearchBox from "../components/QuoteSearchBox";
import ResponseSnackbar from "../components/ResponseSnackbar";
import useAuth from "../hooks/auth/useAuth";
import useDeleteLanguage from "../hooks/language/useDeleteLanguage";
import useGetLanguage from "../hooks/language/useGetLanguage";
import useDebounceSearch from "../hooks/useDebounceSearch";

function LanguageWall(props) {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const [searchTerm, setSearchTerm] = useState("");
  const debounceSearch = useDebounceSearch(searchTerm);

  const [deleteDialog, setDeleteDialog] = useState(false);
  const [selectedQuote, setSelectedQuote] = useState();
  const [selectedPoet, setSelectedPoet] = useState();
  const [response, setResponse] = useState();

  let paneInstanceRef = useRef(null);

  const { mutate: deleteQuote } = useDeleteLanguage({
    onSuccess: () => {
      setResponse({
        open: true,
        severity: "success",
        message: "Quote deleted successfully",
      });
      queryClient.invalidateQueries({ queryKey: ["user_language", user.id] });
    },
    onError: () => {
      setResponse({
        open: true,
        severity: "error",
        message: "Could not delete quote. Please try again later.",
      });
    },
  });

  const { data: quotesData, isLoading: isFetching } = useGetLanguage({
    userId: user.id,
    filters: {
      poet: selectedPoet && selectedPoet !== "all" ? selectedPoet : undefined,
      quote: debounceSearch || undefined,
    },
  });

  const { data: quotesForPoets } = useGetLanguage({
    userId: user.id,
    staleTime: Infinity,
  });

  const poetsQuoteMap = usePoetsQuoteMap(quotesForPoets);

  const handleDeleteQuote = () => {
    deleteQuote({ userId: user.id, quoteId: selectedQuote?.id });
    setDeleteDialog(false);
    closePane();
  };

  const handleOpenDeleteDialog = (id) => {
    setSelectedQuote(quotesData.find((quote) => quote.id === id));
    setDeleteDialog(true);
  };
  const handleCloseDeleteDialog = () => setDeleteDialog(false);

  const handleSearchChange = (event) => setSearchTerm(event.target.value);
  const handleQuoteClick = (postId, quote) => {
    if (!postId) {
      setResponse({
        open: true,
        severity: "info",
        message: "The post for this quote is no longer available.",
      });
      return;
    }
    setSelectedQuote(quote);
    paneInstanceRef.current.present({ animate: true });
  };

  const closePane = () => {
    if (paneInstanceRef.current) {
      paneInstanceRef.current.destroy({ animate: true });
      paneInstanceRef.current = null;
    }
  };

  return (
    <div className="container mx-auto px-4 py-8" size={"2"}>
      {/* Response Snackbar */}
      {response && (
        <ResponseSnackbar
          open={response?.open}
          severity={response.severity}
          message={response.message}
          onClose={() => setResponse(null)}
        />
      )}
      {/* Delete Quote Dialog */}
      <DeleteQuoteDialog
        open={deleteDialog}
        setOpen={setDeleteDialog}
        quote={selectedQuote?.language}
        handleCancel={handleCloseDeleteDialog}
        handleDelete={handleDeleteQuote}
      />
      {/* Header */}
      <div className="mb-8">
        <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
          Language Wall
        </h1>
        <p className="text-muted-foreground max-w-2xl">
          Your personal collection of favorite lines and quotes from poems.
          Select text while reading any poem to save it here.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-4 gap-4">
        <Sidebar
          poets={poetsQuoteMap}
          selectedPoet={selectedPoet}
          setSelectedPoet={setSelectedPoet}
          quotesLength={quotesForPoets ? quotesForPoets.length : 0}
        />
        <div className="lg:col-span-3">
          {/* Quote Search Box */}
          <QuoteSearchBox
            searchQuery={searchTerm}
            handleSearchChange={handleSearchChange}
          />

          {isFetching && <Loading message={"Loading..."} />}

          {quotesData && quotesData?.length === 0 && <NoQuotes />}

          {quotesData && quotesData?.length > 0 && (
            <QuoteList
              quotes={quotesData}
              handleQuoteClick={handleQuoteClick}
              handleDeleteQuote={handleOpenDeleteDialog}
            />
          )}
        </div>
      </div>
    </div>
  );
}

const Sidebar = ({ poets, selectedPoet, setSelectedPoet, quotesLength }) => {
  return (
    <aside className="lg:col-span-1">
      <div className="bg-card border border-border rounded-lg p-5 shadow-card sticky top-24">
        <h3 className="font-semibold text-foreground mb-4 flex items-center gap-2">
          <Globe className="w-4 h-4 text-primary" />
          Poets
        </h3>
        <div className="space-y-2">
          {(() => {
            const poetNames = Object.keys(poets);
            const totalCount = poetNames.reduce(
              (sum, poet) => sum + poets[poet],
              0,
            );
            return [
              <button
                key="all"
                onClick={() => setSelectedPoet && setSelectedPoet("all")}
                className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors ${
                  selectedPoet === "all"
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
              >
                <span>All Poets</span>
                <span
                  className={`text-xs px-2 py-0.5 rounded-full ${
                    selectedPoet === "all"
                      ? "bg-primary-foreground/20"
                      : "bg-muted"
                  }`}
                >
                  {totalCount}
                </span>
              </button>,
              ...poetNames.map((poet) => (
                <button
                  key={poet}
                  onClick={() => setSelectedPoet && setSelectedPoet(poet)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-sm transition-colors ${
                    selectedPoet === poet
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  }`}
                >
                  <span>{poet}</span>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full ${
                      selectedPoet === poet
                        ? "bg-primary-foreground/20"
                        : "bg-muted"
                    }`}
                  >
                    {poets[poet]}
                  </span>
                </button>
              )),
            ];
          })()}
        </div>

        {/* Stats */}
        <div className="mt-6 pt-6 border-t border-border">
          <div className="text-center">
            <div className="text-3xl font-bold text-primary mb-1">
              {quotesLength !== undefined ? quotesLength : "—"}
            </div>
            <div className="text-sm text-muted-foreground">Saved Quotes</div>
          </div>
        </div>
      </div>
    </aside>
  );
};

const QuoteList = ({ quotes, handleQuoteClick, handleDeleteQuote }) => {
  return (
    <div className="space-y-4">
      {quotes.map((data, index) => {
        const isPostByAnon = data?.post?.is_anon_post;
        const quote = data.quotes;
        return (
          <div
            key={quote.id}
            className="opacity-0 animate-fade-in"
            style={{ animationDelay: `${0.05 * index}s` }}
            onClick={() => handleQuoteClick(quote.post_id, quote)}
          >
            <QuoteCard
              id={quote.id}
              text={quote.language}
              poemTitle={data?.post?.post_title || "Unknown Title"}
              poemId={data?.post?.id}
              author={
                isPostByAnon
                  ? data?.post?.anon_author
                  : data?.post?.profiles?.user_name
              }
              onDelete={handleDeleteQuote}
            />
          </div>
        );
      })}
    </div>
  );
};

const NoQuotes = () => {
  return (
    <div className="bg-card border border-border rounded-xl p-12 text-center shadow-card">
      <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
        <Quote className="w-8 h-8 text-muted-foreground" />
      </div>
      <h3 className="font-semibold text-lg text-foreground mb-2">
        No quotes saved yet
      </h3>
      <p className="text-muted-foreground max-w-md mx-auto">
        Start building your collection! While reading any poem, select text to
        save your favorite lines to your Language Wall.
      </p>
    </div>
  );
};

// Custom hook to generate a map of poet names to their quote counts
function usePoetsQuoteMap(quotes) {
  return useMemo(() => {
    const poetQuoteMap = {};
    if (!quotes) return poetQuoteMap;
    quotes.forEach((quote) => {
      const isAnon = quote?.post?.is_anon_post;
      if (isAnon) {
        const anonAuthor = quote?.post?.anon_author || "Unknown Author";
        if (!poetQuoteMap[anonAuthor]) {
          poetQuoteMap[anonAuthor] = 1;
        } else {
          poetQuoteMap[anonAuthor]++;
        }
      } else {
        const poet = quote?.post?.profiles?.user_name || "Unknown Author";
        if (!poetQuoteMap[poet]) {
          poetQuoteMap[poet] = 1;
        } else {
          poetQuoteMap[poet]++;
        }
      }
    });
    return poetQuoteMap;
  }, [quotes]);
}

export default LanguageWall;

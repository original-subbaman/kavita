import { SizeIcon, TrashIcon } from "@radix-ui/react-icons";
import {
  Box,
  Container,
  Flex,
  Heading,
  IconButton,
  ScrollArea,
  Text,
  Tooltip,
} from "@radix-ui/themes";
import { useQueryClient } from "@tanstack/react-query";
import { CupertinoPane } from "cupertino-pane";
import DOMPurify from "dompurify";
import { forwardRef, useEffect, useRef, useState } from "react";
import "../components/BottomPane/bottom-pane.css";
import DeleteQuoteDialog from "../components/LanguageWall/DeleteQuoteDialog";
import Loading from "../components/Loading";
import QuoteSearchBox from "../components/QuoteSearchBox";
import ResponseSnackbar from "../components/ResponseSnackbar";
import useAuth from "../hooks/auth/useAuth";
import useDeleteLanguage from "../hooks/language/useDeleteLanguage";
import useFilterLanguage from "../hooks/language/useFilterLanguage";
import useGetLanguage from "../hooks/language/useGetLanguage";
import useGetPostById from "../hooks/post/useGetPostById";
import useDebounceSearch from "../hooks/useDebounceSearch";
import { convertISOTimeToIST } from "../utils/Date";

function LanguageWall(props) {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const [searchTerm, setSearchTerm] = useState("");
  const debounceSearch = useDebounceSearch(searchTerm);

  const [deleteDialog, setDeleteDialog] = useState(false);
  const [postId, setPostId] = useState();
  const [selectedQuote, setSelectedQuote] = useState();
  const [response, setResponse] = useState();

  let paneRef = useRef(null);
  let paneInstanceRef = useRef(null);

  useEffect(() => {
    paneInstanceRef.current = new CupertinoPane(paneRef.current, {
      darkMode: true,
      backdrop: true,
      draggableOver: true,
      showDraggable: true,
      breaks: {
        top: { enabled: true, height: 600, bounce: true },
      },
    });
  }, []);

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

  const { data: post } = useGetPostById({ postId: postId });
  const postHTML = DOMPurify.sanitize(post?.post);

  const {
    data: quotes,
    isLoading: isFetching,
    isFetched: isLanguageFetched,
  } = useGetLanguage({
    userId: user.id,
  });

  const filteredList = useFilterLanguage(quotes, debounceSearch);

  const handleDeleteQuote = () => {
    deleteQuote({ userId: user.id, quoteId: selectedQuote?.id });
    setDeleteDialog(false);
    closePane();
  };

  const handleOpenDeleteDialog = () => setDeleteDialog(true);
  const handleCloseDeleteDialog = () => setDeleteDialog(false);

  const handleSearchChange = (event) => setSearchTerm(event.target.value);
  const handleQuoteClick = (postId, quote) => {
    setPostId(postId);
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
    <Container className="mt-8" size={"2"}>
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

      {/* Quote Search Box */}
      <Box className="mx-3 mb-4">
        <QuoteSearchBox size="2" handleSearchChange={handleSearchChange} />
      </Box>

      {isFetching && <Loading message={"Loading..."} />}

      {isLanguageFetched && quotes.length === 0 && <NoQuotes />}

      {isLanguageFetched && quotes.length > 0 && (
        <QuoteList quotes={filteredList} handleQuoteClick={handleQuoteClick} />
      )}

      {/* Cupertino Pane */}
      <PostPane
        post={post}
        ref={paneRef}
        selectedQuote={selectedQuote}
        postHTML={postHTML}
        onExpand={() => paneInstanceRef.current.moveToBreak("top")}
        onDelete={handleOpenDeleteDialog}
        convertISOTimeToIST={convertISOTimeToIST}
      />
    </Container>
  );
}

const QuoteList = ({ quotes, handleQuoteClick }) => {
  return (
    <Container className="text-white font-madimiOne mx-4" py={{ sm: "8" }}>
      {quotes.map((quote, index) => (
        <Text
          mr={"3"}
          key={quote.id}
          onClick={() => handleQuoteClick(quote.post_id, quote)}
          className={` ${
            index % 3 === 0 ? "text-3xl" : "text-lg"
          }  hover:bg-radix-green/20 hover:px-[2px] duration-500 transition-all cursor-pointer tracking-wider`}
        >
          {quote.language}
        </Text>
      ))}
    </Container>
  );
};

const PostPane = forwardRef(
  (
    { post, selectedQuote, postHTML, onExpand, onDelete, convertISOTimeToIST },
    ref
  ) => {
    return (
      <div
        ref={ref}
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "10px",
        }}
      >
        <Box>
          <Box className="flex justify-between border-b pb-2">
            <PostMeta
              author={post?.user?.user_name}
              createdAt={convertISOTimeToIST(post?.created_at)}
              quotedOn={convertISOTimeToIST(selectedQuote?.created_at)}
            />

            <div className="flex flex-col space-y-2 mt-3">
              <FloatingIconButton
                content="Expand"
                icon={<SizeIcon style={{ color: "#7a7a7e" }} />}
                onClick={onExpand}
              />
              <FloatingIconButton
                content="Trash"
                icon={<TrashIcon style={{ color: "#7a7a7e" }} />}
                onClick={onDelete}
              />
            </div>
          </Box>

          <ScrollArea className="mt-6">
            <div
              dangerouslySetInnerHTML={{ __html: postHTML }}
              style={{ fontFamily: "lora" }}
            />
          </ScrollArea>
        </Box>
      </div>
    );
  }
);

const NoQuotes = () => {
  return (
    <Flex
      align={"center"}
      justify={"center"}
      className="min-h-[50vh] text-gray-500"
    >
      <Heading as="h1">No quotes to show</Heading>
    </Flex>
  );
};

const PostMeta = ({
  author,
  createdAt = "--/--/--",
  quotedOn = "--/--/--",
}) => {
  return (
    <Box className="flex flex-col">
      <Text size="4" weight="bold" className="font-lora">
        Author: {author}
      </Text>
      <Text size="2" weight="medium" color="gray">
        <span style={{ fontWeight: "bold" }}>Posted On:</span> {createdAt}
      </Text>
      <Text size="2" weight="medium" color="gray">
        <span style={{ fontWeight: "bold" }}>Quote Saved On:</span> {quotedOn}
      </Text>
    </Box>
  );
};

const FloatingIconButton = ({ content, icon, onClick, style = {} }) => {
  return (
    <Tooltip title={content}>
      <IconButton
        style={{
          color: "darkgray",
          borderRadius: "50%",
          background: "#ebebeb",
          padding: "1px",
          width: "26px",
          height: "26px",
          ...style, // allow overriding styles
        }}
        onClick={onClick}
      >
        {icon}
      </IconButton>
    </Tooltip>
  );
};

export default LanguageWall;

import { Button } from "@radix-ui/themes";
import { useQueryClient } from "@tanstack/react-query";
import DOMPurify from "dompurify";
import { Eye, Send, Sparkles } from "lucide-react";
import { useState } from "react";
import { useLoaderData } from "react-router-dom";
import TipTapEditor from "../components/PromptSection/TipTapEditor";
import ResponseSnackbar from "../components/ResponseSnackbar";
import Input from "../components/ui/Input";
import { Label } from "../components/ui/Label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../components/ui/Select";
import useAuth from "../hooks/auth/useAuth";
import useGetPopularThemes from "../hooks/post/useGetPopularThemes";
import useUpdatePost from "../hooks/post/useUpdatePost";
import { LanguageScripts } from "../utils/Constants";

const DEFAULT_THEME_ID = "24b7e05f-c018-4f03-855f-c5d8deb6d111"; // General

const EditPost = () => {
  const minCharLength = 15;
  const { user, isAuthenticated } = useAuth();
  const queryClient = useQueryClient();
  const post = useLoaderData();

  const [script, setScript] = useState("Latin");

  const [postTitle, setPostTitle] = useState(post?.post_title || "");
  const [postContent, setPostContent] = useState(post?.post || "");

  const [selectedTheme, setSelectedTheme] = useState(
    post?.writing_theme || DEFAULT_THEME_ID,
  );
  const [isPreview, setIsPreview] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
  });

  // Shared mutation handlers
  const handlePostSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: ["infinite_posts"],
    });
    setSnackbar({
      open: true,
      message: "Edit successful",
      severity: "success",
    });
  };

  const handlePostError = () => {
    setSnackbar({
      open: true,
      message: "Cannot edit at this moment",
      severity: "error",
    });
    setAddPostDialog && setAddPostDialog(false);
  };

  const { mutate: updatePost, isPending: isUpdating } = useUpdatePost({
    userId: user?.id,
    onSuccess: handlePostSuccess,
    onError: handlePostError,
  });

  const { data: themes, isFetching: isFetchingThemes } = useGetPopularThemes();

  const handleUpdate = async () => {
    if (postTitle.trim().length === 0) {
      setSnackbar({
        open: true,
        message: "Title cannot be empty",
        severity: "info",
      });
      return;
    }

    if (postContent.trim().length < minCharLength) {
      setSnackbar({
        open: true,
        message: `Poem must be at least ${minCharLength} characters long`,
        severity: "info",
      });
      return;
    }

    if (isAuthenticated) {
      updatePost({
        postId: post?.id,
        post: postContent,
        title: postTitle,
        themeId: selectedTheme || DEFAULT_THEME_ID, // Default theme ID (general)
        userId: user?.id,
      });
      return;
    }
  };

  const sanitizePostContent = DOMPurify.sanitize(postContent);

  return (
    <div>
      {snackbar.open && (
        <ResponseSnackbar
          open={true}
          severity={snackbar.severity}
          onClose={() => setSnackbar({ open: false, message: "" })}
          autoHideDuration={3000}
          message={snackbar.message}
        />
      )}

      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <h1 className="font-display text-3xl md:text-4xl font-bold text-foreground">
              Write a Poem
            </h1>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Editor */}
          <div className="space-y-6">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title" className="text-foreground font-medium">
                Title
              </Label>
              <Input
                id="title"
                placeholder="Give your poem a title..."
                value={postTitle}
                onChange={(e) => setPostTitle(e.target.value)}
                className="text-lg font-display bg-card border-border"
              />
            </div>

            {/* Language */}
            <div className="space-y-2">
              <Label className="text-foreground font-medium">Script</Label>
              <Select value={script} onValueChange={setScript}>
                <SelectTrigger className="bg-card border-border">
                  <SelectValue placeholder="Select script" />
                </SelectTrigger>
                <SelectContent>
                  {Object.values(LanguageScripts).map((script) => (
                    <SelectItem key={script} value={script}>
                      {script}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Select Theme */}
            <div className="space-y-2">
              <Label className="text-foreground font-medium">Theme</Label>
              <Select value={selectedTheme} onValueChange={setSelectedTheme}>
                <SelectTrigger className="bg-card border-border">
                  <SelectValue placeholder="Select theme" />
                </SelectTrigger>
                <SelectContent>
                  {isFetchingThemes ? <div>Loading...</div> : null}
                  {themes && themes.data.length > 0 ? (
                    themes.data.map((theme) => (
                      <SelectItem key={theme.id} value={theme.id}>
                        {theme.prompt}
                      </SelectItem>
                    ))
                  ) : (
                    <div className="p-4 text-sm text-muted-foreground">
                      No themes available
                    </div>
                  )}
                </SelectContent>
              </Select>
            </div>

            {/* Content */}
            <div className="space-y-2">
              <Label htmlFor="content" className="text-foreground font-medium">
                Your Poem
              </Label>

              <TipTapEditor
                initialContent={postContent}
                initialTitle={postTitle}
                onContentChange={setPostContent}
                onTitleChange={setPostTitle}
              />
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3">
              <Button
                onClick={handleUpdate}
                className="gap-2 bg-primary hover:bg-primary/90"
                disabled={isUpdating}
              >
                <Send className="w-4 h-4" />
                {isUpdating ? "Updating..." : "Update Poem"}
              </Button>
              <Button
                variant="ghost"
                onClick={() => setIsPreview(!isPreview)}
                className="gap-2 lg:hidden"
              >
                <Eye className="w-4 h-4" />
                {isPreview ? "Edit" : "Preview"}
              </Button>
            </div>
          </div>

          {/* Preview (Desktop always visible, mobile toggle) */}
          <div
            className={`${
              isPreview ? "block" : "hidden lg:block"
            } bg-card border border-border rounded-lg p-6 shadow-card`}
          >
            <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6 pb-4 border-b border-border">
              <Sparkles className="w-4 h-4 text-accent" />
              Live Preview
            </div>

            {postTitle || postContent ? (
              <div>
                <h2 className="font-display text-2xl font-bold text-foreground mb-6">
                  {postTitle || "Untitled Poem"}
                </h2>
                <div
                  dangerouslySetInnerHTML={{
                    __html:
                      sanitizePostContent || "Your poem will appear here...",
                  }}
                  className="font-poetry text-lg leading-relaxed text-foreground whitespace-pre-line"
                ></div>
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-8 h-8 text-muted-foreground" />
                </div>
                <p className="text-muted-foreground">
                  Start writing to see your preview
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Writing tips */}
        <div className="mt-8 p-6 bg-secondary/50 rounded-lg border border-border">
          <h3 className="font-semibold text-foreground mb-3">Writing Tips</h3>
          <ul className="text-sm text-muted-foreground space-y-2">
            <li>• Press Enter twice to create a new stanza</li>
            <li>
              • Use the language selector to indicate your poem's language
            </li>
            <li>• Your drafts are automatically saved locally</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default EditPost;

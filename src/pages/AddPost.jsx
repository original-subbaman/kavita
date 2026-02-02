import { Button, Container, Flex } from "@radix-ui/themes";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { verifyCaptcha } from "../api/utils.api";
import BackButton from "../components/BackButton";
import WeeklyTheme from "../components/Home/WeeklyTheme";
import TipTapEditor from "../components/PromptSection/TipTapEditor";
import ResponseSnackbar from "../components/ResponseSnackbar";
import useAuth from "../hooks/auth/useAuth";
import useAddPost from "../hooks/post/useAddPost";
import usePostAnon from "../hooks/post/usePostAnon";
import { useAppTheme } from "../hooks/useAppTheme";
import useGetThemeById from "../hooks/post/useGetThemeById";
import { Label } from "../components/ui/Label";
import Input from "../components/ui/Input";
import { Send, Eye, Save, Sparkles } from "lucide-react";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "../components/ui/Select";
import { Textarea } from "../components/ui/Textarea";
import { LanguageScripts } from "../utils/Constants";

const AddPost = ({
  postId,
  userId,
  content,
  title,
  mutation,
  isEdit = false,
}) => {
  const minCharLength = 15;
  const { themeId } = useParams();
  const { user, isAuthenticated } = useAuth();
  const { mode } = useAppTheme();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [hasAttemptedPost, setHasAttemptedPost] = useState(false);
  const [postTitle, setPostTitle] = useState(title || "");
  const [postContent, setPostContent] = useState(content || "");
  const [isPosting, setIsPosting] = useState(false);
  const [script, setScript] = useState("Latin");
  const [theme, setTheme] = useState("");
  const [isPreview, setIsPreview] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
  });

  const location = useLocation();
  const writingTheme = location.state?.writingTheme;

  const postButtonTitle = isAuthenticated ? "Post" : "Post Annonymously";

  // Shared mutation handlers
  const handlePostSuccess = () => {
    queryClient.invalidateQueries({
      queryKey: ["infinite_posts"],
    });
    setSnackbar({
      open: true,
      message: "Your poem has been published",
      severity: "success",
    });
    setTimeout(() => {
      navigate("/", { state: { showPostSection: true } });
    }, 3000);
    reset();
  };

  const handlePostError = () => {
    setSnackbar({
      open: true,
      message: "Cannot publish at this moment",
      severity: "error",
    });
    setAddPostDialog && setAddPostDialog(false);
  };

  const { mutate: addPost } = useAddPost({
    userId: user?.id,
    onSuccess: handlePostSuccess,
    onError: handlePostError,
  });

  const { mutate: postAnon, isPending: isPostingAnon } = usePostAnon({
    onSuccess: handlePostSuccess,
    onError: handlePostError,
  });

  const { data: selectedTheme } = useGetThemeById({ themeId: themeId });

  const reset = () => {
    setPostContent("");
    setPostTitle("");
  };

  const handlePublish = async () => {
    setHasAttemptedPost(true);

    if (postTitle.trim().length === 0) {
      setSnackbar({
        open: true,
        message: "Title cannot be empty",
        severity: "info",
      });
      return;
    }

    if (!isEdit && !isAuthenticated) {
      try {
        setIsPosting(true);
        const token = await getRecaptchaToken("anon_create_post");
        const res = await verifyCaptcha(token);
        if (res.success) {
          postAnon({
            post: postContent,
            title: postTitle,
            themeId: writingTheme?.id || selectedTheme?.id,
          });
        }
      } catch (err) {
        console.log("🚀 ~ handleOnPostClick ~ err:", err);
        setSnackbar({
          open: true,
          message: "Captcha verification failed",
          severity: "error",
        });
      } finally {
        setIsPosting(false);
      }

      return;
    }

    if (!isEdit && isAuthenticated) {
      addPost({
        post: postContent,
        title: postTitle,
        themeId: writingTheme?.id,
      });
      return;
    }

    if (isEdit && isAuthenticated) {
      mutation({
        post: postContent,
        postId,
        userId,
        bgColor,
      });
      return;
    }
  };

  const handleSaveDraft = () => {};

  // Button is enabled initially, disables only after first attempt if invalid
  const isPostButtonDisabled =
    hasAttemptedPost && (postContent.length === 0 || isPosting);

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
              <Select value={theme} onValueChange={setTheme}>
                <SelectTrigger className="bg-card border-border">
                  <SelectValue placeholder="Select theme" />
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

            {/* Content */}
            <div className="space-y-2">
              <Label htmlFor="content" className="text-foreground font-medium">
                Your Poem
              </Label>
              <Textarea
                id="content"
                placeholder="Let your words flow..."
                value={postContent}
                onChange={(e) => setPostContent(e.target.value)}
                className="min-h-[350px] font-poetry text-lg leading-relaxed bg-card border-border resize-none"
              />
            </div>

            {/* Actions */}
            <div className="flex flex-wrap gap-3">
              <Button
                onClick={handlePublish}
                className="gap-2 bg-primary hover:bg-primary/90"
              >
                <Send className="w-4 h-4" />
                Publish Poem
              </Button>
              <Button
                variant="outline"
                onClick={handleSaveDraft}
                className="gap-2 border-border"
              >
                <Save className="w-4 h-4" />
                Save Draft
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
                <div className="font-poetry text-lg leading-relaxed text-foreground whitespace-pre-line">
                  {postContent || "Your poem will appear here..."}
                </div>
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

async function getRecaptchaToken(action = "submit") {
  if (!window.grecaptcha) {
    throw new Error("reCAPTCHA not loaded");
  }

  return await window.grecaptcha.execute(
    import.meta.env.VITE_RECAPTCHA_SITE_KEY,
    { action },
  );
}

export default AddPost;

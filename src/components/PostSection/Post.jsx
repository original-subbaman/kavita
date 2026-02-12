import DOMPurify from "dompurify";
import { Link } from "react-router-dom";
import { PostActions } from "../../context/PostActionContext";
import usePostActions from "../../hooks/post/usePostActions";
import { useAppTheme } from "../../hooks/useAppTheme";
import { cn, timeAgoUTC } from "../../utils/Helper";
import { PostActionMenu } from "../MyPosts/PostActionMenu";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/Avatar";
import { User, Heart, MessageCircle, Bookmark } from "lucide-react";
import { Button } from "../ui/Button";

function Post({
  id,
  title,
  content,
  author,
  authorId,
  authorImg,
  createdAt,
  width,
  height,
  bgColor,
  isHidden,
  isLiked,
  isSaved,
  likes = 0,
  comments = 0,
  showMenu = false,
  className,
}) {
  const { mode } = useAppTheme();
  const { onPostAction } = usePostActions();
  const sanitizePostTitle = DOMPurify.sanitize(title);
  const sanitizedPost = DOMPurify.sanitize(content);

  const handleDeletePost = () =>
    onPostAction({ action: PostActions.delete, postId: id, data: authorId });

  const handleEditPost = () =>
    onPostAction({
      action: PostActions.edit,
      postId: id,
      data: { content, title, bgColor },
    });

  const handleHidePost = () =>
    onPostAction({ action: PostActions.hide, postId: id, data: !isHidden });

  return (
    <article
      className={cn(
        "poem-card bg-card rounded-lg border border-border p-6 ",
        className,
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <Avatar className="w-10 h-10">
            <AvatarImage src={author.avatar} alt={"ss"} />
            <AvatarFallback className="bg-secondary text-secondary-foreground">
              <User />
            </AvatarFallback>
          </Avatar>
          <div>
            <p className="font-medium text-sm text-foreground">{author}</p>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <span className="text-xs font-light text-radix-slate-11">
                Posted On: {timeAgoUTC(createdAt)}
              </span>
            </div>
          </div>
        </div>
        {showMenu && (
          <PostActionMenu
            mode={mode}
            isHidden={isHidden}
            handleHidePost={handleHidePost}
            handleEditPost={handleEditPost}
            handleDeletePost={handleDeletePost}
          />
        )}
      </div>

      <div
        className="font-display text-xl text-foreground mb-3 group-hover:text-primary transition-colors"
        dangerouslySetInnerHTML={{ __html: sanitizePostTitle || "untitled" }}
      />
      <div
        className="font-poetry text-lg text-muted-foreground leading-relaxed line-clamp-4 whitespace-pre-line"
        dangerouslySetInnerHTML={{ __html: sanitizedPost }}
      />

      {/* Actions */}
      <div className="flex items-center gap-1 mt-5 pt-4 border-t border-border">
        <Button
          variant="ghost"
          size="sm"
          className={cn(
            "gap-2 text-muted-foreground hover:text-primary",
            isLiked && "text-prayer-red",
          )}
        >
          <Heart className={cn("w-4 h-4", isLiked && "fill-current")} />
          <span className="text-sm">{likes}</span>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="gap-2 text-muted-foreground hover:text-primary"
        >
          <MessageCircle className="w-4 h-4" />
          <span className="text-sm">{comments}</span>
        </Button>
      </div>
    </article>
  );
}

export default Post;

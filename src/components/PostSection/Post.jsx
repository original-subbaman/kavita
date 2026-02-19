import DOMPurify from "dompurify";
import { Heart, MessageCircle, User } from "lucide-react";
import { cn, timeAgoUTC } from "../../utils/Helper";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/Avatar";
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
  className,
}) {
  const sanitizePostTitle = DOMPurify.sanitize(title);
  const sanitizedPost = DOMPurify.sanitize(content);

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

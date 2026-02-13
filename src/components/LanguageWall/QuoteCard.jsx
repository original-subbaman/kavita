import {
  Quote,
  Trash2,
  ExternalLink,
  DeleteIcon,
  Delete,
  Trash,
} from "lucide-react";
import { Button } from "../ui/Button";
import { cn } from "../../utils/Helper";
import { Link } from "react-router-dom";
import DOMPurify from "dompurify";

export const QuoteCard = ({
  id,
  text,
  poemTitle,
  poemId,
  author,
  onDelete,
  className,
}) => {
  const sanitizedPostTitle = DOMPurify.sanitize(poemTitle);
  return (
    <div
      className={cn(
        "bg-card rounded-lg border border-border p-5 shadow-card border-l-4",
        "border-l-primary",
        className,
      )}
    >
      <div className="flex items-start gap-3 mb-3">
        <Quote className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
        <p className="font-poetry text-lg leading-relaxed text-foreground italic">
          "{text}"
        </p>
      </div>

      <div className="flex items-center justify-between mt-4 pt-3 border-t border-border">
        <div className="text-sm">
          <Link
            to={`/post/${poemId}`}
            className="text-primary hover:underline font-medium"
          >
            <div dangerouslySetInnerHTML={{ __html: sanitizedPostTitle }}></div>
          </Link>
          <p className="text-muted-foreground text-xs mt-0.5">by {author}</p>
        </div>
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => onDelete(id)}
          >
            <Trash2 className="w-4 h-4" />
          </Button>
          <Link to={`/post/${poemId}`}>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ExternalLink className="w-4 h-4" />
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

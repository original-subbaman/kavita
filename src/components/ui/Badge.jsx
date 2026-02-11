import { cn } from "../../utils/Helper"; // optional if you're using class merge util

const Badge = ({
  children,
  content,
  className,
  badgeClassName,
  invisible = false,
  max,
}) => {
  if (invisible) {
    return children;
  }

  let displayContent = content;

  if (max && typeof content === "number" && content > max) {
    displayContent = `${max}+`;
  }

  return (
    <div className={cn("relative inline-flex", className)}>
      {children}

      {content != null && (
        <span
          className={cn(
            `absolute -top-4 -right-4 flex h-6 w-6 p-2
             items-center justify-center rounded-full 
             text-xs font-light bg-primary text-white`,
            badgeClassName,
          )}
        >
          {displayContent}
        </span>
      )}
    </div>
  );
};

export default Badge;

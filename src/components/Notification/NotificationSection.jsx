import clsx from "clsx";
import { MdKeyboardArrowLeft, MdKeyboardArrowRight } from "react-icons/md";
import { Card, CardContent } from "../ui/Card";
import { cn } from "../../utils/Helper";

const IconButton = ({
  onClick,
  disabled = false,
  children,
  className = "",
  ariaLabel,
}) => {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`w-8 h-8 p-2 rounded-full flex items-center justify-center 
                  text-radix-green hover:bg-radix-grass/10 
                  disabled:bg-transparent disabled:text-gray-400 
                  disabled:cursor-not-allowed disabled:pointer-events-none
                  ${className}`}
    >
      {children}
    </button>
  );
};

function NotificationSection({
  title,
  notifications,
  pageSize,
  pagination,
  setPagination,
}) {
  const handleNext = () => {
    const nextFrom = pagination.toOffset + 1;
    const nextTo = nextFrom + pageSize - 1;

    setPagination({ fromOffset: nextFrom, toOffset: nextTo });
  };

  const handlePrev = () => {
    const prevFrom = Math.max(0, pagination.fromOffset - pageSize);
    const prevTo = prevFrom + pageSize - 1;

    setPagination({ fromOffset: prevFrom, toOffset: prevTo });
  };

  return (
    <ul className="space-y-4">
      <div className="flex gap-2 items-center justify-between w-full">
        <p className="text-gray-500 text-xl font-display font-semibold">
          {title}
        </p>
        <div className="flex items-center gap-1">
          <IconButton
            onClick={handlePrev}
            disabled={pagination.fromOffset === 0}
          >
            <MdKeyboardArrowLeft />
          </IconButton>
          <IconButton
            onClick={handleNext}
            disabled={notifications?.length < pageSize}
          >
            <MdKeyboardArrowRight />
          </IconButton>
        </div>
      </div>
      {notifications && notifications.length === 0 && (
        <p className="text-gray-500 text-sm">You're all caught up 🎉</p>
      )}
      {notifications &&
        notifications.length > 0 &&
        notifications.map((notification) => {
          return (
            <li key={notification.id}>
              <Card
                className={cn(
                  "transition-colors",
                  !notification.read && "border-primary/30 bg-primary/5",
                )}
              >
                <CardContent className="flex items-start gap-4 p-4">
                  <div className="flex-1 min-w-0">
                    <h2 className={"font-display"}>{notification.title}</h2>
                    <p className="text-sm text-foreground">
                      {notification.message}
                    </p>
                  </div>
                  {!notification.read && (
                    <div className="w-2 h-2 rounded-full bg-primary mt-2" />
                  )}
                </CardContent>
              </Card>
            </li>
          );
        })}
    </ul>
  );
}

export default NotificationSection;

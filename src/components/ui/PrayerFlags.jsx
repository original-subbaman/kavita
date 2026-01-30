import { cn } from "../../utils/Helper";


export const PrayerFlags = ({ className, size = "md" }) => {
  const sizeClasses = {
    sm: "w-1.5 h-6",
    md: "w-2 h-8",
    lg: "w-3 h-12",
  };

  const colors = [
    "bg-prayer-blue",
    "bg-prayer-white",
    "bg-prayer-red",
    "bg-prayer-green",
    "bg-prayer-yellow",
  ];

  return (
    <div className={cn("flex gap-1", className)}>
      {colors.map((color, i) => (
        <div
          key={i}
          className={cn(sizeClasses[size], color, "rounded-sm opacity-80")}
          style={{ animationDelay: `${i * 0.1}s` }}
        />
      ))}
    </div>
  );
};

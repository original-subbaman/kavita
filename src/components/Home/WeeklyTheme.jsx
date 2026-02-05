import { Sparkles } from "lucide-react";

const WeeklyTheme = ({
  title = "Today's writing theme:",
  writingTheme,
  themeDescription = "",
  submissions = 0,
  daysLeft = 7,
}) => {
  return (
    <div className={"relative flex flex-col md:flex-row md:items-center gap-6"}>
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-2">
          <Sparkles className="w-4 h-4 text-accent" />
          <span className="text-sm font-medium text-accent">{title}</span>
        </div>
        <h2 className="font-display text-2xl font-bold text-foreground mb-2">
          {writingTheme}
        </h2>
        <p className="text-muted-foreground text-sm leading-relaxed max-w-xl">
          {themeDescription}
        </p>
      </div>

      <div className="flex flex-row md:flex-col gap-4 md:gap-2 md:text-right">
        <div>
          <div className="text-2xl font-bold text-primary">{submissions}</div>
          <div className="text-xs text-muted-foreground">submissions</div>
        </div>
        {/* <div>
          <div className="text-2xl font-bold text-accent">{daysLeft}</div>
          <div className="text-xs text-muted-foreground">days left</div>
        </div> */}
      </div>
    </div>
  );
};

export default WeeklyTheme;

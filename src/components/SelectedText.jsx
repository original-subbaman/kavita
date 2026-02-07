import { Quote, Bookmark } from "lucide-react";
import { Button } from "./ui/Button";

function SelectedText({ selectedText, captureLanguage, theme }) {
  return (
    <div className="bg-accent/10 border border-accent/30 rounded-lg p-4 mb-8 animate-fade-in">
      <div className="flex items-start gap-3">
        <Quote className="w-5 h-5 text-accent flex-shrink-0 mt-1" />
        <div className="flex-1">
          <p className="font-poetry text-lg italic text-foreground mb-3">
            "
            {selectedText ||
              "Highlight text to quote it and add it to your Language Wall."}
            "
          </p>
          <Button
            size="sm"
            onClick={captureLanguage}
            className="gap-2 bg-accent text-accent-foreground hover:bg-accent/90"
            disabled={!selectedText}
          >
            <Bookmark className="w-4 h-4" />
            Save to Language Wall
          </Button>
        </div>
      </div>
    </div>
  );
}

export default SelectedText;

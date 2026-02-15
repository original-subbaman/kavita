import { Search } from "lucide-react";

function QuoteSearchBox({ searchQuery, handleSearchChange }) {
  return (
    <div className="relative mb-6">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      <input
        type="text"
        placeholder="Search quotes..."
        value={searchQuery}
        onChange={handleSearchChange}
        className="w-full pl-10 pr-4 py-2.5 rounded-lg border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring shadow-card text-sm"
      />
    </div>
  );
}

export default QuoteSearchBox;

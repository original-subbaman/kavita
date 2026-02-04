import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/DropdownMenu";
import { Filter, Search, Clock, TrendingUp } from "lucide-react";
import Input from "../ui/Input";
import { Button } from "../ui/Button";

const PostFilter = ({
  searchQuery,
  sortBy,
  setSortBy,
  setOption,
  setSearchQuery,
}) => {
  return (
    <div className="bg-card border border-border rounded-lg p-4  shadow-card">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder="Search poems, poets, or content..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-background"
          />
        </div>

        {/* Sort buttons */}
        <DropdownMenu className="border border-accent">
          <DropdownMenuTrigger asChild>
            <Button variant="soft">
              <Filter size={14} />
              Filter
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem
              onSelect={() => setOption((f) => ({ ...f, feedType: "all" }))}
            >
              All
            </DropdownMenuItem>
            <DropdownMenuItem
              onSelect={() =>
                setOption((f) => ({ ...f, feedType: "following" }))
              }
            >
              Followed Poets
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};

export default PostFilter;

import {
  Button,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuRoot,
  DropdownMenuContent,
} from "@radix-ui/themes";

const PostFilter = ({ setOption }) => {
  return (
    <DropdownMenuRoot>
      <DropdownMenuTrigger>
        <Button variant="soft">Filter</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem
          onSelect={(e) => setOption((f) => ({ ...f, feedType: "all" }))}
        >
          All
        </DropdownMenuItem>
        <DropdownMenuItem
          onSelect={(e) => setOption((f) => ({ ...f, feedType: "following" }))}
        >
          Followed Poets
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenuRoot>
  );
};

export default PostFilter;

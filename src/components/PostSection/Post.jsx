import { Avatar, Box, Flex, Text } from "@radix-ui/themes";
import DOMPurify from "dompurify";
import { timeAgoUTC } from "../../utils/Helper";
function PostButton({ children }) {
  return (
    <button className="bg-transparent duration-300 transition-all hover:bg-radix-grass flex items-center justify-center w-12 h-12">
      {children}
    </button>
  );
}
function Post({ content, author, createdAt, width, height, bgColor }) {
  console.log("🚀 ~ Post ~ createdAt:", createdAt);
  const sanitizedPost = DOMPurify.sanitize(content);
  return (
    <div
      className={`relative group cursor-pointer rounded-md`}
      style={{
        backgroundColor: bgColor || "var(--radix-ice-berg-dark)",
      }}
    >
      {/* Main card */}
      <Box
        size="none"
        className={`w-[${width}] h-[${height}] text-white cursor-pointer rounded-md p-0 hover:shadow-xl`}
        style={{
          backgroundColor: bgColor || "var(--radix-ice-berg-dark)",
        }}
      >
        <Box className="flex flex-row items-center gap-3 mb-4 p-2 bg-dark-light rounded-t-sm">
          <Avatar
            src="https://i.pravatar.cc/300"
            alt="User Avatar"
            fallback="JD"
          />
          <Flex direction={"column"}>
            <Text className="text-base text-radix-slate-12">{author}</Text>
            <span className="text-xs text-radix-slate-11">
              {timeAgoUTC(createdAt)} ago
            </span>
          </Flex>
        </Box>

        {/* Post Content */}
        <Box className="px-4 pb-4">
          <Box
            dangerouslySetInnerHTML={{ __html: sanitizedPost }}
            onMouseUp={(event) => console.log(event.type)}
            className="cursor-pointer"
            wrap={"wrap"}
          />
        </Box>
      </Box>
    </div>
  );
}

export default Post;

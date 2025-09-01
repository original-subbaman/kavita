import { Avatar, Box, Flex, IconButton, Text } from "@radix-ui/themes";
import DOMPurify from "dompurify";
import { timeAgoUTC } from "../../utils/Helper";
import { DotsVerticalIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { PostActionMenu } from "../MyPosts/PostActionMenu";
function PostButton({ children }) {
  return (
    <button className="bg-transparent duration-300 transition-all hover:bg-radix-grass flex items-center justify-center w-12 h-12">
      {children}
    </button>
  );
}

const ShowMenuButon = ({ onClick }) => {
  return (
    <IconButton variant="ghost" className="rounded-full" onClick={onClick}>
      <DotsVerticalIcon />
    </IconButton>
  );
};

function Post({
  content,
  author,
  authorImg,
  createdAt,
  width,
  height,
  bgColor,
  showMenu = false,
}) {
  const [openMenu, setOpenMenu] = useState(false);
  const sanitizedPost = DOMPurify.sanitize(content);
  const handleShowMenu = (e) => {
    console.log("🚀 ~ handleShowMenu ~ e:", e);
    e.stopPropagation();
    setOpenMenu((prev) => !prev);
  };

  return (
    <div
      className={`relative group cursor-pointer rounded-md drop-shadow-md `}
      style={{
        backgroundColor: bgColor || "var(--radix-ice-berg-dark)",
      }}
    >
      {/* Main card */}
      <Box
        size="none"
        className={`w-[${width}] h-[${height}] text-white cursor-pointer rounded-md p-0 drop-shadow-2xl hover:shadow-xl`}
        style={{
          backgroundColor: bgColor || "var(--radix-ice-berg-dark)",
        }}
      >
        <Box
          className="flex flex-row items-center justify-between 
          mb-4 p-2 px-4 bg-dark-light 
          border-t-[1px]  border-dark-light 
          rounded-t-sm"
        >
          <Box className="flex flex-row items-center gap-2">
            <Avatar src={authorImg} alt="User Avatar" fallback="JD" />
            <Flex direction={"column"}>
              <Text className="text-base text-radix-slate-12">{author}</Text>
              <span className="text-xs text-radix-slate-11">
                {timeAgoUTC(createdAt)} ago
              </span>
            </Flex>
          </Box>
          {showMenu && (
            <>
              <PostActionMenu onClick={handleShowMenu} />
            </>
          )}
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

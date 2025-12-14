import { Avatar, Box, Flex, Text } from "@radix-ui/themes";
import DOMPurify from "dompurify";
import usePostActions from "../../hooks/post/usePostActions";
import { timeAgoUTC } from "../../utils/Helper";
import { PostActionMenu } from "../MyPosts/PostActionMenu";
import { PostActions } from "../../context/PostActionContext";
import { useAppTheme } from "../../hooks/useAppTheme";
import { Quote } from "lucide-react";
import { ImQuotesLeft, ImQuotesRight } from "react-icons/im";

function Post({
  id,
  title,
  content,
  author,
  authorId,
  authorImg,
  createdAt,
  width,
  height,
  bgColor,
  isHidden,
  showMenu = false,
}) {
  console.log("🚀 ~ Post ~ author:", author);
  const { mode } = useAppTheme();
  const { onPostAction } = usePostActions();
  const sanitizedPost = DOMPurify.sanitize(content);

  const handleDeletePost = () =>
    onPostAction({ action: PostActions.delete, postId: id, data: authorId });

  const handleEditPost = () =>
    onPostAction({
      action: PostActions.edit,
      postId: id,
      data: { content, bgColor },
    });

  const handleHidePost = () =>
    onPostAction({ action: PostActions.hide, postId: id, data: !isHidden });

  return (
    <div className={`relative group cursor-pointer rounded-2xl`}>
      {/* Main card */}
      <Box
        size="none"
        className={`w-[${width}] h-[${height}] max-h-[400px] overflow-hidden border
        cursor-pointer ${
          mode === "dark" ? "bg-dark-light text-white " : "bg-white"
        }  
        rounded-2xl p-0`}
      >
        <Box
          className={`flex flex-row items-center justify-between 
          mb-2 p-2 px-4 rounded-t-lg
          `}
        >
          <Box className="flex flex-row items-center w-full">
            <Flex direction={"column"} className="w-full flex-1">
              <Text className="text-base font-bold text-radix-slate-12">
                {author}
              </Text>
              <span className="text-xs font-light text-radix-slate-11">
                Posted On: {timeAgoUTC(createdAt)}
              </span>
              <Flex direction={"column"} className="w-full flex-1 gap-2 mt-4">
                <ImQuotesLeft />
                <Text className="font-light">{title || "untitled"}</Text>
                <ImQuotesRight />
              </Flex>
            </Flex>
          </Box>
          {showMenu && (
            <PostActionMenu
              mode={mode}
              isHidden={isHidden}
              handleHidePost={handleHidePost}
              handleEditPost={handleEditPost}
              handleDeletePost={handleDeletePost}
            />
          )}
        </Box>

        {/* Post Content */}
        <Box className="px-4 pb-4">
          <Box
            dangerouslySetInnerHTML={{ __html: sanitizedPost }}
            onMouseUp={(event) => console.log(event.type)}
            className="cursor-pointer text-md md:text-sm "
            wrap={"wrap"}
          />
        </Box>
      </Box>
    </div>
  );
}

export default Post;

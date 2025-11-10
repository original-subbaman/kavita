import { Avatar, Box, Flex, Text } from "@radix-ui/themes";
import DOMPurify from "dompurify";
import usePostActions from "../../hooks/post/usePostActions";
import { timeAgoUTC } from "../../utils/Helper";
import { PostActionMenu } from "../MyPosts/PostActionMenu";
import { PostActions } from "../../context/PostActionContext";
import { useAppTheme } from "../../hooks/useAppTheme";

function Post({
  id,
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
    <div className={`relative group cursor-pointer rounded drop-shadow-md `}>
      {/* Main card */}
      <Box
        size="none"
        className={`w-[${width}] h-[${height}] 
        cursor-pointer ${
          mode === "dark"
            ? "bg-dark-light text-white"
            : "bg-white border border-gray-300"
        }  
        rounded-md p-0 hover:shadow-xl`}
      >
        <Box
          className={`flex flex-row items-center justify-between 
          mb-4 p-2 px-4 border-b  drop-shadow-sm rounded-t-md
          ${
            mode === "dark"
              ? "bg-[#2e2b29] text-white border-gray-900"
              : "bg-gray-100 border-gray-300"
          }`}
        >
          <Box className="flex flex-row items-center gap-2">
            <Avatar src={authorImg} alt="User Avatar" fallback="JD" />
            <Flex direction={"column"}>
              <Text className="text-base text-radix-slate-12">{author}</Text>
              <span className="text-xs text-radix-slate-11">
                {timeAgoUTC(createdAt)}
              </span>
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
            className="cursor-pointer "
            wrap={"wrap"}
          />
        </Box>
      </Box>
    </div>
  );
}

export default Post;

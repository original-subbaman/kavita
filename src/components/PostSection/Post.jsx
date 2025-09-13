import { Avatar, Box, Flex, Text } from "@radix-ui/themes";
import DOMPurify from "dompurify";
import usePostActions from "../../hooks/post/usePostActions";
import { timeAgoUTC } from "../../utils/Helper";
import { PostActionMenu } from "../MyPosts/PostActionMenu";
import { PostActions } from "../../context/PostActionContext";

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
            <PostActionMenu
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

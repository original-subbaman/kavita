import { Box, Container, Heading } from "@radix-ui/themes";
import Masonry from "react-responsive-masonry";
import { NavLink } from "react-router-dom";
import { getRandomDimensions } from "../../utils/Helper";
import Post from "./Post";

const NoPost = () => (
  <Box className="flex justify-center items-center text-gray-500 w-full h-full mt-48">
    <Heading as="h1">No posts to show</Heading>
  </Box>
);

function PostSection({ posts, showMenu = false }) {
  const dimensions = getRandomDimensions(posts ? posts.length : 0);
  const isSmallScreen = window.matchMedia("(max-width: 639px)").matches;
  const isEmptyPosts = posts.length === 0;
  return (
    <Container className="px-3 my-2 sm:p-0">
      {isEmptyPosts ? (
        <NoPost />
      ) : (
        <Masonry gutter="10px" columnsCount={isSmallScreen ? 1 : 2}>
          {posts.map((post, index) => (
            <Post
              content={post.post}
              author={post.user.user_name}
              width={dimensions[index].width}
              height={dimensions[index].height}
              createdAt={post.created_at}
              bgColor={post.bg_color}
              showMenu={showMenu}
            />
          ))}
        </Masonry>
      )}
    </Container>
  );
}

export default PostSection;

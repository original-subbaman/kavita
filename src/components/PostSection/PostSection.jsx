import { Box, Container, Heading } from "@radix-ui/themes";
import Masonry from "react-responsive-masonry";
import { NavLink } from "react-router-dom";
import { getRandomDimensions } from "../../utils/Helper";
import Post from "./Post";

function PostSection({ posts }) {
  const dimensions = getRandomDimensions(posts ? posts.length : 0);
  const isSmallScreen = window.matchMedia("(max-width: 639px)").matches;
  return (
    <Container className="px-3 sm:p-0">
      {posts && posts.length === 0 && (
        <Box className="flex justify-center items-center text-gray-500 w-full h-full mt-48">
          <Heading as="h1">No posts to show</Heading>
        </Box>
      )}
      {posts && posts.length > 0 && (
        <Masonry gutter="10px" columnsCount={isSmallScreen ? 1 : 2}>
          {posts.map((post, index) => (
            <NavLink to={`/post/${post.id}`} key={post.id}>
              <Post
                content={post.post}
                author={post.user.user_name}
                width={dimensions[index].width}
                height={dimensions[index].height}
              />
            </NavLink>
          ))}
        </Masonry>
      )}
    </Container>
  );
}

export default PostSection;

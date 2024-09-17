import React from "react";
import Post from "./Post";
import { NavLink } from "react-router-dom";
import { Box, Container, Heading } from "@radix-ui/themes";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

function PostSection({ posts }) {
  return (
    <Container>
      {posts && posts.length === 0 && (
        <Box className="flex justify-center items-center text-gray-500 w-full h-full mt-48">
          <Heading as="h1">
            No posts to show. Maybe you should contribute a writing piece...
          </Heading>
        </Box>
      )}
      {posts && posts.length > 0 && (
        <ResponsiveMasonry
          className="px-4 sm:px-2 md:px-0"
          columnsCountBreakPoints={{ 350: 1, 750: 3, 900: 4 }}
        >
          <Masonry gutter="20px" columnsCount={4}>
            {posts.map((post) => (
              <NavLink to={`/post/${post.id}`} key={post.id}>
                <Post content={post.post} author={post.user.user_name} />
              </NavLink>
            ))}
          </Masonry>
        </ResponsiveMasonry>
      )}
    </Container>
  );
}

export default PostSection;

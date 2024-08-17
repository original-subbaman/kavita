import React, { useEffect, useState } from "react";
import Post from "./Post";
import { HeartIcon } from "@radix-ui/react-icons";
import { NavLink } from "react-router-dom";
import { AlertDialog, Button, Container, Flex, Box } from "@radix-ui/themes";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { fetchPosts } from "../../api/post.api";

function PostSection(props) {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const data = await fetchPosts();
        if (data) {
          setPosts(data);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchPostData();
  }, []);

  return (
    <Container>
      <AlertDialog.Root>
        <ResponsiveMasonry
          className="px-4 sm:px-2 md:px-0"
          columnsCountBreakPoints={{ 350: 1, 750: 3, 900: 4 }}
        >
          <Masonry gutter="20px" columnsCount={4}>
            {posts.map((post) => (
              <NavLink to={`/post/${post.id}`}>
                <Post content={post.post} author={post.user_id} />
              </NavLink>
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </AlertDialog.Root>
    </Container>
  );
}

export default PostSection;

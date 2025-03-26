import React, { Fragment } from "react";
import useGetInfinitePosts from "../../hooks/post/useGetInfinitePosts";
import { Container } from "@radix-ui/themes";
import Post from "./Post";
import { NavLink } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "../Loading";

function InfinitePostSection(props) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } =
    useGetInfinitePosts();

  const status = "pending";

  if (status === "pending") {
    return <Loading message={"Loading posts..."} />;
  }

  if (status === "error") {
    return <div>Error loading posts</div>;
  }

  const posts = data?.pages.reduce((acc, page) => {
    return [...acc, ...page.data];
  }, []);

  return (
    <Container className="px-3 sm:p-0">
      <InfiniteScroll
        dataLength={posts ? posts.length : 0}
        next={() => fetchNextPage()}
        hasMore={hasNextPage}
        loader={<div className="text-white text-2xl">Loading...</div>}
      >
        {posts &&
          posts.map((post, index) => (
            <NavLink
              to={`/post/${post.id}`}
              key={post.id}
              style={{ marginBottom: "0.2rem" }}
            >
              <Post
                content={post.post}
                author={post.user.user_name}
                width={"300px"}
                height={"400px"}
              />
            </NavLink>
          ))}
      </InfiniteScroll>
      {isFetchingNextPage && (
        <div className="text-white">Loading more posts...</div>
      )}

      {!hasNextPage && <div className="text-white">No more posts to load</div>}
    </Container>
  );
}

export default InfinitePostSection;

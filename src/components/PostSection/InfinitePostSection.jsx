import React, { Fragment } from "react";
import useGetInfinitePosts from "../../hooks/post/useGetInfinitePosts";
import { Container } from "@radix-ui/themes";
import Post from "./Post";
import { NavLink } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import Loading from "../Loading";
import ErrorMessage from "../ErrorMessage";

function InfinitePostSection(props) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useGetInfinitePosts();

  if (status === "pending") {
    return <Loading message={"Loading posts..."} />;
  }

  if (status === "error") {
    return (
      <ErrorMessage message={"Error loading posts. Try refreshing the page."} />
    );
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
      {isFetchingNextPage && <Loading message={"Fetching more posts..."} />}

      {!hasNextPage && (
        <div className="text-white text-center mt-4 mb-8 text-lg">
          No more posts to show
        </div>
      )}
    </Container>
  );
}

export default InfinitePostSection;

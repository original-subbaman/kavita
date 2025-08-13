import { Container } from "@radix-ui/themes";
import InfiniteScroll from "react-infinite-scroll-component";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import { NavLink } from "react-router-dom";
import useGetInfinitePosts from "../../hooks/post/useGetInfinitePosts";
import ErrorMessage from "../ErrorMessage";
import Loading from "../Loading";
import "./masonry-grid.css";
import Post from "./Post";

const breakpointColumnsObj = {
  900: 3,
  750: 2,
  350: 1,
};

function InfinitePostSection(props) {
  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, status } =
    useGetInfinitePosts();

  if (status === "error") {
    return (
      <ErrorMessage message={"Error loading posts. Try refreshing the page."} />
    );
  }

  const posts = data?.pages.reduce((acc, page) => {
    return [...acc, ...page.data];
  }, []);

  return (
    <Container className="px-3 sm:p-0 md:w-[800px]">
      <InfiniteScroll
        dataLength={posts ? posts.length : 0}
        next={() => fetchNextPage()}
        hasMore={hasNextPage}
        loader={<div className="text-white text-2xl"></div>}
      >
        <ResponsiveMasonry breakpointCols={breakpointColumnsObj}>
          {posts && (
            <Masonry
              className="my-masonry-grid"
              columnClassName="my-masonry-grid_column"
            >
              {posts.map((post) => (
                <NavLink
                  to={`/post/${post.id}`}
                  key={post.id}
                  style={{ width: "100%", margin: "0.5rem" }}
                >
                  <Post
                    content={post.post}
                    author={post.user.user_name}
                    createdAt={post.created_at}
                    bgColor={post.bg_color}
                    width="100%" // Let Masonry decide width
                    height="auto"
                  />
                </NavLink>
              ))}
            </Masonry>
          )}
        </ResponsiveMasonry>
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

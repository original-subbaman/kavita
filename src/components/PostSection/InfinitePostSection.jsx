import { motion } from "framer-motion";
import InfiniteScroll from "react-infinite-scroll-component";
import { NavLink } from "react-router-dom";
import ErrorMessage from "../ErrorMessage";
import Loading from "../Loading";
import "./masonry-grid.css";
import Post from "./Post";

function InfinitePostSection({
  data,
  fetchNextPage,
  hasNextPage,
  isFetchingNextPage,
  status,
  showMenu = false,
  getPostLink = (post) => `/post/${post.id}`,
  postGridStyles = "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 ",
}) {
  if (status === "error") {
    return (
      <ErrorMessage message={"Error loading posts. Try refreshing the page."} />
    );
  }

  const posts = data?.pages.reduce((acc, page) => {
    return [...acc, ...page.data];
  }, []);

  return (
    <div>
      <InfiniteScroll
        dataLength={posts ? posts.length : 0}
        next={() => fetchNextPage()}
        hasMore={hasNextPage}
        loader={<div className="text-white text-2xl"></div>}
        style={{ overflow: "hidden" }}
      >
        <div className={postGridStyles}>
          {posts ? (
            posts.map((post) => {
              return (
                <motion.div
                  initial={{ y: 30, opacity: 0, filter: "blur(10px)" }}
                  animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
                  style={{ width: "100%" }}
                  key={post.id}
                >
                  <NavLink to={getPostLink(post)} style={{ width: "100%" }}>
                    <Post
                      title={post?.post_title}
                      content={post.post}
                      author={
                        post?.is_anon_post
                          ? post?.anon_author
                          : post?.profiles?.user_name
                      }
                      authorImg={post?.profiles?.profile_link}
                      createdAt={post.created_at}
                      bgColor={post.bg_color}
                      height={"300px"}
                      likes={post.likes[0]?.count}
                      comments={post.post_comment[0]?.count}
                      showMenu={showMenu}
                    />
                  </NavLink>
                </motion.div>
              );
            })
          ) : (
            <></>
          )}
        </div>
      </InfiniteScroll>
      {isFetchingNextPage && <Loading message={"Fetching more posts..."} />}

      {!posts ||
        (posts?.length === 0 && (
          <div className="text-center text-gray-400 dark:text-gray-600 mt-4 mb-8 text-lg">
            No more posts to show
          </div>
        ))}
    </div>
  );
}

export default InfinitePostSection;

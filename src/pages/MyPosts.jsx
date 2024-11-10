import PostSection from "../components/PostSection/PostSection";
import RootWrapper from "../components/RootWrapper";
import useGetUserPosts from "../hooks/post/useGetUserPosts";
const MyPosts = () => {
  const { data: posts } = useGetUserPosts({
    id: "1feebd99-74d7-4b2d-9692-9742e6d7dd2d",
  });

  return (
    <RootWrapper>
      <h1>Your posts</h1>
      <PostSection posts={posts} />
    </RootWrapper>
  );
};

export default MyPosts;

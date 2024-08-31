import PostSection from "../components/PostSection/PostSection";
import PromptSection from "../components/PromptSection/PromptSection";
import RootWrapper from "../components/RootWrapper";
import useGetPosts from "../hooks/post/useGetPosts";
import useAddPost from "../hooks/post/useAddPost";
import PromptText from "../components/PromptSection/PromptText";
import AddPostButton from "../components/PromptSection/AddPostButton";
import InputAlertDialog from "../components/PromptSection/InputAlertDialog";
import { Root as AlertDialogRoot } from "@radix-ui/react-alert-dialog";
import { useState } from "react";
function Home() {
  const [addPostDialog, setAddPostDialog] = useState(false);

  const { mutate: addPost, isPending: isPosting } = useAddPost({
    onSuccess: () => {
      setAddPostDialog(false);
      setPost("");
    },
  });

  const { data: posts } = useGetPosts({ keys: [isPosting] });

  return (
    <RootWrapper>
      <PromptSection>
        <PromptText />
        <AlertDialogRoot open={addPostDialog} onOpenChange={setAddPostDialog}>
          <AddPostButton />
          <InputAlertDialog
            addPost={addPost}
            prompt={"A quick brown fox jumped over the lazy dog"} // Replace with actual prompt from the backend
            mutationState={isPosting}
          />
        </AlertDialogRoot>
      </PromptSection>
      <PostSection posts={posts} />
    </RootWrapper>
  );
}

export default Home;

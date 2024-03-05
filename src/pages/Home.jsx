import PostSection from "../components/PostSection/PostSection";
import PromptSection from "../components/PromptSection/PromptSection";
import RootWrapper from "../components/RootWrapper";

function Home() {
  return (
    <RootWrapper>
      <PromptSection />
      <PostSection />
    </RootWrapper>
  );
}

export default Home;

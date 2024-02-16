import Header from "./components/Header/Header";
import PostSection from "./components/PostSection/PostSection";
import PromptSection from "./components/PromptSection/PromptSection";
import RootWrapper from "./components/RootWrapper";

function App() {
  return (
    <RootWrapper>
      <Header />
      <PromptSection />
      <PostSection />
    </RootWrapper>
  );
}

export default App;

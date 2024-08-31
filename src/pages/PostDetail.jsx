import React, { useState } from "react";
import { Container, Heading, Section, Text } from "@radix-ui/themes";
import { useParams } from "react-router-dom";
import RootWrapper from "../components/RootWrapper";
import CommentSection from "../components/Comments/CommentSection";
import SelectedText from "../components/SelectedText";
import useGetPost from "../hooks/post/useGetPost";
import { convertISOTimestamp } from "../utils/Date";
export default function PostDetail() {
  let { id } = useParams();

  const [selectedText, setSelectedText] = useState();
  const { data: post } = useGetPost({ id });
  console.log("🚀 ~ PostDetail ~ post:", post);

  function getSelectionText() {
    const selection = window.getSelection().toString();
    if (selection) {
      setSelectedText(selection);
    }
  }

  return (
    <RootWrapper>
      <Container>
        <Section size={"1"} className="text-center">
          <Heading className="text-white">{post?.user?.name}</Heading>
          <Text className="text-gray-500">
            Posted On: {convertISOTimestamp(post?.created_at)}
          </Text>
        </Section>
        <Section className="rounded-md px-8 bg-gray-50 bg-opacity-5 mb-2">
          <SelectedText selectedText={selectedText} />
          <Text
            onMouseMove={(event) => getSelectionText()}
            onMouseUp={(event) => window.getSelection().removeAllRanges()}
            size={"6"}
            className="text-white text-start font-primary font-extralight whitespace-pre-line"
          >
            {post?.post}
          </Text>
        </Section>
        <CommentSection />
      </Container>
    </RootWrapper>
  );
}

import React from "react";
import {
  Button,
  Container,
  Heading,
  Section,
  Text,
  TextArea,
} from "@radix-ui/themes";
import { useParams } from "react-router-dom";
import RootWrapper from "../components/RootWrapper";
import LikeButton from "../components/PostDetail/LikeButton";

export default function PostDetail() {
  let { id } = useParams();
  let message = `There was once a ship thatThere once was a ship that put to sea 
The name of the ship was the Billy O' Tea The winds blew up, her bow
            dipped down Oh blow, my bully boys, blow (huh) Soon may the
            Wellerman come To bring us sugar and tea and rum One day, when the
            tonguing is done We'll take our leave and go`;
  return (
    <RootWrapper>
      <Container>
        <Section size={"1"} className="text-center">
          <Heading className="text-white">John Doe</Heading>
          <Text className="text-gray-500">Posted On: 14-07-2024</Text>
        </Section>
        <Section className="rounded-md px-8 bg-gray-50 bg-opacity-5 mb-0">
          <Text
            size={"6"}
            className="text-white text-left font-primary font-extralight whitespace-pre-line"
          >
            {message}
          </Text>
        </Section>
        <Section className="flex flex-col gap-2">
          <Text size={"4"} className="text-white ">
            Leave a comment
          </Text>
          <TextArea
            variant="soft"
            color="green"
            size={"3"}
            placeholder="Add a comment..."
          />
          <div className="flex justify-end">
            <Button variant="soft" size={"3"}>
              Post
            </Button>
          </div>
        </Section>
      </Container>
    </RootWrapper>
  );
}

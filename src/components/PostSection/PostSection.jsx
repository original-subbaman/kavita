import React, { useState } from "react";
import Post from "./Post";
import { AlertDialog, Button, Container, Grid, Flex } from "@radix-ui/themes";
const ExampleData = {
  content:
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequuntur, fuga? Architecto, eveniet quo? Libero unde, quidem excepturi voluptatibus distinctio blanditiis, officiis nostrum aspernatur maiores, voluptates eos eligendi sint aperiam quod.",
  author: "John Doe",
};
function PostSection(props) {
  const [selectedText, setSelectedText] = useState("");
  function getSelectionText() {
    const selection = window.getSelection().toString();
    if (selection.length > 0) {
      setSelectedText(selectedText);
    }
  }
  return (
    <Container>
      <AlertDialog.Root>
        <Grid
          columns={{ xs: "1", md: "4" }}
          gap="4"
          align="center"
          justify="center"
          className="px-2 md:px-0"
        >
          <Post content={ExampleData.content} author={ExampleData.author} />
          <Post content={ExampleData.content} author={ExampleData.author} />
          <Post content={ExampleData.content} author={ExampleData.author} />
          <Post content={ExampleData.content} author={ExampleData.author} />
          <Post content={ExampleData.content} author={ExampleData.author} />
        </Grid>
        <AlertDialog.Content>
          <AlertDialog.Title>By: {ExampleData.author}</AlertDialog.Title>
          <AlertDialog.Description
            onMouseUp={(event) => {
              getSelectionText();
            }}
          >
            {ExampleData.content}
          </AlertDialog.Description>
          <Flex gap="3" mt="4" justify="end">
            <AlertDialog.Cancel>
              <Button variant="soft" color="gray">
                Close
              </Button>
            </AlertDialog.Cancel>
            <AlertDialog.Action>
              <Button variant="solid" color="green">
                Like
              </Button>
            </AlertDialog.Action>
          </Flex>
        </AlertDialog.Content>
      </AlertDialog.Root>
    </Container>
  );
}

export default PostSection;

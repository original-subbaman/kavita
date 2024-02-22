import React, { useState } from "react";
import Post from "./Post";
import { HeartIcon } from "@radix-ui/react-icons";
import { AlertDialog, Button, Container, Grid, Flex } from "@radix-ui/themes";
const ExampleData = {
  content:
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequuntur, fuga? Architecto, eveniet quo? Libero unde, quidem excepturi voluptatibus distinctio blanditiis, officiis nostrum aspernatur maiores, voluptates eos eligendi sint aperiam quod.",
  author: "John Doe",
};
function PostSection(props) {
  const [selectedText, setSelectedText] = useState();
  function getSelectionText() {
    const selection = window.getSelection().toString();
    console.log(selection);
    if (selection) {
      setSelectedText(selection);
    }

    console.log("selectedText", selectedText);
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
          <div
            onMouseDown={(event) => {
              console.log(window.getSelection().toString());
            }}
            onMouseMove={(event) =>
              setSelectedText(window.getSelection().toString())
            }
            onMouseUp={(event) => {
              getSelectionText();
            }}
          >
            <div className="flex items-center  text-white bg-radix-grass/80 my-4 backdrop-blur-lg rounded-lg text-center py-2">
              <span className="flex-1">
                {selectedText || "Highlight text to capture language"}
              </span>
              <Button
                variant="ghost"
                style={{
                  color: "white",
                  marginRight: "8px",
                  borderRadius: "100%",
                }}
              >
                <HeartIcon />
              </Button>
            </div>
            {ExampleData.content}
          </div>
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

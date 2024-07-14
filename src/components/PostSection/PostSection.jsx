import React, { useState } from "react";
import Post from "./Post";
import { HeartIcon } from "@radix-ui/react-icons";
import { NavLink} from "react-router-dom";
import {
  AlertDialog,
  Button,
  Container,
  Flex,
  Box,
} from "@radix-ui/themes";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
const ExampleData = {
  content:
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequuntur, fuga? Architecto, eveniet quo? Libero unde, quidem excepturi voluptatibus distinctio blanditiis, officiis nostrum aspernatur maiores, voluptates eos eligendi sint aperiam quod.",
  author: "John Doe",
};
const ExampleData2 = {
  content:
    "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Consequuntur, fuga? Architecto, eveniet quo? Libero unde, quidem excepturi voluptatibus distinctio blanditiis, officiis nostrum aspernatur maiores, voluptates eos eligendi sint aperiam quod. orem ipsum, dolor sit amet consectetur adipisicing elit. Consequuntur, fuga? Architecto, eveniet quo? Libero unde, quidem excepturi voluptatibus distinctio blanditiis, officiis nostrum aspernatur maiores, voluptates eos eligendi sint aperiam quod.",
  author: "John Doe",
};
function PostSection(props) {
  const [selectedText, setSelectedText] = useState();
  function getSelectionText() {
    const selection = window.getSelection().toString();
    if (selection) {
      console.log("captured");
      setSelectedText(selection);
    }
  }
  return (
    <Container>
      <AlertDialog.Root>
        <ResponsiveMasonry
          className="px-4 sm:px-2 md:px-0"
          columnsCountBreakPoints={{ 350: 1, 750: 3, 900: 4 }}
        >
          <Masonry gutter="20px" columnsCount={4}>
            <NavLink to="/post/1"><Post content={ExampleData.content} author={ExampleData.author} /></NavLink>
            <NavLink to="/post/2"><Post content={ExampleData2.content} author={ExampleData2.author} /></NavLink>
            <NavLink to="/post/3"><Post content={ExampleData.content} author={ExampleData.author} /></NavLink>
            <NavLink to="/post/4"><Post content={ExampleData2.content} author={ExampleData2.author} /></NavLink>
            <NavLink to="/post/5"><Post content={ExampleData2.content} author={ExampleData2.author} /></NavLink>
            <NavLink to="/post/6"><Post content={ExampleData.content} author={ExampleData.author} /></NavLink>
            <NavLink to="/post/7"><Post content={ExampleData.content} author={ExampleData.author} /></NavLink>
            <NavLink to="/post/8"><Post content={ExampleData2.content} author={ExampleData2.author} /></NavLink>
            <NavLink to="/post/9"><Post content={ExampleData.content} author={ExampleData.author} /></NavLink>
            <NavLink to="/post/10"><Post content={ExampleData2.content} author={ExampleData2.author} /></NavLink>
          </Masonry>
        </ResponsiveMasonry>
        <AlertDialog.Content>
          <AlertDialog.Title>By: {ExampleData2.author}</AlertDialog.Title>
          <Box>
            <div
              onMouseMove={(event) => getSelectionText()}
              onMouseUp={(event) => window.getSelection().removeAllRanges()}
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
              {ExampleData2.content}
            </div>
          </Box>
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

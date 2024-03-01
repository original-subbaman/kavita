import React from "react";
import { Card, Text, Flex, Box, Button, AlertDialog } from "@radix-ui/themes";
import { HeartIcon, QuestionMarkCircledIcon } from "@radix-ui/react-icons";
function PostButton({ children }) {
  return (
    <button className="bg-transparent duration-300 transition-all hover:bg-radix-grass flex items-center justify-center w-12 h-12">
      {children}
    </button>
  );
}
function Post({ content, author }) {
  function getSelectedText(element) {
    let selectedText = "";
    let selection = window.getSelection();
    if (selection.rangeCount > 0) {
      let range = selection.getRangeAt(0);
      if (element.contains(range.commonAncestorContainer)) {
        selectedText.rangeText();
      }
    }

    return selectedText;
  }

  function onMouseUpEventHandler(event) {
    console.log(event);
  }

  return (
    <AlertDialog.Trigger>
      <Card
        onMouseUp={(event) => console.log(event.type)}
        className="relative 
      md:max-w-[300px] max-h-[340px] text-white cursor-pointer drop-shadow-lg decoration-slate-200 hover:border-2 hover:border-radix-green hover:scale-105 duration-300 transition-all"
        style={{ backgroundColor: "#191919" }}
      >
        <Box className="bg-dark-light p-4 z-0">
          <Text
            className="cursor-pointer"
            onClick={(event) => console.log(event)}
            onMouseUp={(event) => console.log(event.type)}
          >
            {content}
          </Text>
        </Box>
        <Box className="bg-white bg-opacity-0 absolute inset-0 opacity-0 hover:opacity-100 duration-500 trasition-all rounded-b-lg text-white z-10">
          <Flex
            className="bg-radix-green bottom-0 absolute inset-x-0"
            justify="between"
            align="center"
          >
            <Text size="3" className="pl-4">
              Author: John Doe
            </Text>
            <Box className="flex p-0">
              <PostButton>
                <QuestionMarkCircledIcon className="w-6 h-6" />
              </PostButton>
              <PostButton>
                <HeartIcon className="w-6 h-6" />
              </PostButton>
            </Box>
          </Flex>
        </Box>
      </Card>
    </AlertDialog.Trigger>
  );
}

export default Post;

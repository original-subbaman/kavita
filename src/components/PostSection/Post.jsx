import React from "react";
import { Card, Text, Flex, Box, Button } from "@radix-ui/themes";
import { HeartIcon, QuestionMarkCircledIcon } from "@radix-ui/react-icons";
function PostButton({ children }) {
  return (
    <button className="bg-transparent duration-300 transition-all hover:bg-radix-grass flex items-center justify-center w-12 h-12">
      {children}
    </button>
  );
}
function Post(props) {
  return (
    <Card
      className="relative 
      max-w-[300px] max-h-[340px] text-white cursor-pointer drop-shadow-lg decoration-slate-200 hover:border-2 hover:border-radix-green hover:scale-105 duration-300 transition-all"
      style={{ backgroundColor: "#191919" }}
    >
      <Box className="bg-dark-light p-4 z-0">
        <Text>
          Lorem ipsum, dolor sit amet consectetur adipisicing elit.
          Consequuntur, fuga? Architecto, eveniet quo? Libero unde, quidem
          excepturi voluptatibus distinctio blanditiis, officiis nostrum
          aspernatur maiores, voluptates eos eligendi sint aperiam quod.
        </Text>
      </Box>
      <Box className="bg-white bg-opacity-0 absolute inset-0 opacity-0 hover:opacity-100 rounded-b-lg text-white z-10">
        <Flex
          className="bg-radix-green/50 bottom-0 absolute inset-x-0"
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
  );
}

export default Post;

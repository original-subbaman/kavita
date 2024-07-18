import { Flex, TextArea, Button, Text } from "@radix-ui/themes";
const CommentForm = () => {
  return (
    <Flex className="flex flex-col gap-2">
      <Text size={"4"} color="green" weight={"bold"} className="text-white ">
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
    </Flex>
  );
};

export default CommentForm;

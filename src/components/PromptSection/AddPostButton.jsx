import { AlertDialogTrigger } from "@radix-ui/react-alert-dialog";
import { Pencil1Icon } from "@radix-ui/react-icons";
import { Button, Flex, Text } from "@radix-ui/themes";

function AddPostButton() {
  return (
    <Flex direction="column" gap="4">
      <AlertDialogTrigger asChild>
        <Button
          size="3"
          variant="soft"
          radius="large"
          className="h-12 rounded-lg"
        >
          <Pencil1Icon className="w-5 h-5 md:w-6 md:h-6 mr-[2px]" />
          <Text className="text-xl md:text-2xl">Submit your piece</Text>
        </Button>
      </AlertDialogTrigger>
    </Flex>
  );
}

export default AddPostButton;

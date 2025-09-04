import { Dialog, Flex, Button } from "@radix-ui/themes";

const DeleteDialog = ({ open, setOpen, onDelete }) => {
  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Content maxwidth="450px">
        <Dialog.Title>Delete Post</Dialog.Title>
        <Dialog.Description className="mb-6 text-gray-600">
          Are you sure you want to delete this post? This action cannot be
          undone.
        </Dialog.Description>
        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Dialog.Close>
            <Button color="red" onClick={onDelete}>
              Delete
            </Button>
          </Dialog.Close>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
};

export default DeleteDialog;

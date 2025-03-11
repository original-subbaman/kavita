import React, { useRef } from "react";
import { Dialog, Flex, TextField, Button, Text } from "@radix-ui/themes";
import CustomTextField from "../CustomTextField";
import { useForm } from "react-hook-form";
function EditProfileDialog({ open, setOpen }) {
  const {
    formState: { errors },
    control,
    handleSubmit,
  } = useForm();
  const formRef = useRef(null);

  const triggerSubmit = () => {
    if (formRef.current) {
      formRef.current.requestSubmit();
    }
  };
  const onSubmit = (data) => {
    console.log("🚀 ~ onSubmit ~ data:", data);
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Content maxWidth="450px">
        <Dialog.Title>Edit Profile</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Make changes to your profile.
        </Dialog.Description>
        <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
          <Flex direction="column" gap="3">
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Name
              </Text>
              <CustomTextField
                name={"name"}
                placeholder={"Enter your full name"}
                control={control}
                error={errors?.name?.message}
                rules={{ required: "Name is required" }}
              />
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Username
              </Text>
              <CustomTextField
                name={"user_name"}
                placeholder={"Enter your username"}
                control={control}
                error={errors?.user_name?.message}
                rules={{ required: "Username is required" }}
              />
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Address
              </Text>
              <CustomTextField
                name={"address"}
                placeholder={"Enter your address"}
                control={control}
                error={errors?.address?.message}
                rules={{ required: "Address is required" }}
              />
            </label>
          </Flex>
        </form>

        <Flex gap="3" mt="4" justify="end">
          <Dialog.Close>
            <Button variant="soft" color="gray">
              Cancel
            </Button>
          </Dialog.Close>
          <Button onClick={triggerSubmit}>Save</Button>
        </Flex>
      </Dialog.Content>
    </Dialog.Root>
  );
}

export default EditProfileDialog;

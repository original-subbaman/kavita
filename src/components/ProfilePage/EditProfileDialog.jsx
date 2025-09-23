import { Button, Dialog, Flex, Text, Box } from "@radix-ui/themes";
import React, { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import CustomTextField from "../CustomTextField";
import UploadProfile from "./UploadProfile";

function EditProfileDialog({
  open,
  setOpen,
  userId,
  user,
  updateUser,
  updateProfile,
  loading,
}) {
  const [profile, setProfile] = useState();
  const [preview, setPreview] = useState(user?.profile);

  const {
    formState: { errors },
    control,
    handleSubmit,
  } = useForm({
    defaultValues: user,
  });

  const formRef = useRef(null);

  const onSubmit = async (data) => {
    delete data["profile"];
    updateUser({ userId: userId, user: data });

    if (profile) {
      updateProfile({ userId, profile });
    }

    setOpen(false);
    setPreview(null);
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Content maxwidth="450px">
        <Dialog.Title>Edit Profile</Dialog.Title>
        <Dialog.Description size="2" mb="4">
          Make changes to your profile.
        </Dialog.Description>
        <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
          <Box className="flex justify-center">
            <UploadProfile
              preview={preview}
              setPreview={setPreview}
              setProfile={setProfile}
            />
          </Box>
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
                defaultValue={user?.user_name}
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
                defaultValue={user?.address}
                error={errors?.address?.message}
                rules={{ required: "Address is required" }}
              />
            </label>
            <label>
              <Text as="div" size="2" mb="1" weight="bold">
                Bio
              </Text>
              <CustomTextField
                name={"bio"}
                placeholder={"Bio"}
                control={control}
                defaultValue={user?.bio}
                error={errors?.bio?.message}
              />
            </label>
          </Flex>
          <Flex gap="3" mt="4" justify="end">
            <Dialog.Close>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </Dialog.Close>
            <Button loading={loading} type="submit">
              Save
            </Button>
          </Flex>
        </form>
      </Dialog.Content>
    </Dialog.Root>
  );
}

export default EditProfileDialog;

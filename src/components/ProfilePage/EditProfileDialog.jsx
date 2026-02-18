import { Box, Flex } from "@radix-ui/themes";
import { useRef, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import Input from "../ui/Input";
import { Textarea } from "../ui/Textarea";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogTitle,
  DialogFooter,
} from "../../components/ui/Dialog";

import { Button } from "../ui/Button";
import { Label } from "../ui/Label";
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
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent maxwidth="450px">
        <DialogTitle>Edit Profile</DialogTitle>
        <DialogDescription size="2" mb="4">
          Make changes to your profile.
        </DialogDescription>
        <form ref={formRef} onSubmit={handleSubmit(onSubmit)}>
          <Box className="flex justify-center">
            <UploadProfile
              preview={preview}
              setPreview={setPreview}
              setProfile={setProfile}
            />
          </Box>

          <div className="flex flex-col gap-2 mb-4">
            <div>
              <Label htmlFor="name">Name</Label>
              <Controller
                name="name"
                control={control}
                rules={{ required: "Name is required" }}
                render={({ field }) => <Input id="name" {...field} />}
              />
              {errors.name && (
                <span className="text-red-500 text-xs">
                  {errors.name.message}
                </span>
              )}
            </div>

            <div>
              <Label htmlFor="username">Username</Label>
              <Controller
                name="user_name"
                control={control}
                rules={{ required: "Username is required" }}
                render={({ field }) => <Input id="username" {...field} />}
              />
              {errors.username && (
                <span className="text-red-500 text-xs">
                  {errors.username.message}
                </span>
              )}
            </div>

            <div>
              <Label htmlFor="address">Address</Label>
              <Controller
                name="address"
                control={control}
                render={({ field }) => <Input id="address" {...field} />}
              />
            </div>

            <div>
              <Label htmlFor="bio">Bio</Label>
              <Controller
                name="bio"
                control={control}
                render={({ field }) => (
                  <Textarea id="bio" rows={3} {...field} />
                )}
              />
            </div>

            <div>
              <Label htmlFor="status">Status</Label>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <Input
                    id="status"
                    placeholder="What are you up to?"
                    {...field}
                  />
                )}
              />
            </div>
          </div>
          <DialogFooter>
            <DialogClose>
              <Button variant="soft" color="gray">
                Cancel
              </Button>
            </DialogClose>
            <Button loading={loading} type="submit">
              Save
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default EditProfileDialog;

import React, { useState } from "react";
import ProfileSectionWrapper from "./ProfileSectionWrapper";
import { Button, Text } from "@radix-ui/themes";
import { Avatar } from "@mui/material";
import useAuth from "../../hooks/auth/useAuth";
import { getInitialsOfName } from "../../utils/Helper";
import LittleInfo from "./LittleInfo";
import StatCard from "./StatCard";
import EditProfileDialog from "./EditProfileDialog";
import useGetUser from "../../hooks/user/useGetUser";
import useUpdateUser from "../../hooks/user/useUpdateUser";
import ResponseSnackbar from "../ResponseSnackbar";
import { useQueryClient } from "@tanstack/react-query";

function UserDetailSection(props) {
  const { user } = useAuth();
  const { name, email } = user.user_metadata;
  const [openEdit, setOpenEdit] = useState(false);
  const [response, setResponse] = useState({ success: false, error: false });
  const queryClient = useQueryClient();

  const onUpdateSuccess = (data) => {
    setResponse((prev) => ({ ...prev, success: true }));
    queryClient.invalidateQueries({ queryKey: ["user_get_user", user.id] });
    setOpenEdit(false);
  };
  const onUpdateError = (error) => {
    setResponse((prev) => ({ ...prev, error: true }));
  };

  const { mutate: updateUser, isPending: isUpdating } = useUpdateUser({
    onSuccess: onUpdateSuccess,
    onError: onUpdateError,
  });

  const { data, isFetched } = useGetUser({ userId: user.id });

  let joinedOn = "";
  let username = "";
  let address = "";
  if (isFetched) {
    joinedOn = new Date(data.created_at).toLocaleDateString("en-IN");
    username = data.user_name;
    address = data.address;
  }

  const handleResponseClose = () => {
    setResponse({ success: false, error: false });
  };
  return (
    <ProfileSectionWrapper height={"15rem"}>
      {/* Success Snackbar */}
      <ResponseSnackbar
        open={response.success}
        onClose={handleResponseClose}
        message={"Profile updated successfully"}
        severity={"success"}
      />
      {/* Error Snackbar */}
      <ResponseSnackbar
        open={response.error}
        onClose={handleResponseClose}
        message={"Unexpected error! Please try again later"}
        severity={"error"}
      />
      {/* Edit Profile Dialog */}
      <EditProfileDialog
        open={openEdit}
        setOpen={setOpenEdit}
        userId={user.id}
        user={{ address, user_name: username, name }}
        updateUser={updateUser}
        loading={isUpdating}
      />
      <div className="flex justify-between">
        <div className="flex gap-2">
          <div className="w-1 h-8 bg-radix-green rounded-full"></div>
          <Text size={"6"}>Profile</Text>
        </div>
        <div>
          <Button onClick={() => setOpenEdit(true)}>Update</Button>
        </div>
      </div>
      <div className="flex gap-8 mt-4  h-full">
        <div>
          <Avatar
            sizes=""
            sx={{
              width: 80,
              height: 80,
              bgcolor: "#30a46c",
              fontSize: "1.8rem",
            }}
          >
            {getInitialsOfName(name)}
          </Avatar>
        </div>
        <div className="w-full">
          <Text size={"5"}>{name}</Text>
          <div className="mt-4 flex justify-start gap-20 w-full">
            <LittleInfo title={"username"} info={username} />
            <LittleInfo title={"email"} info={email || ""} />
            <LittleInfo title={"address"} info={address} />
            <LittleInfo title={"joined_on"} info={joinedOn} />
          </div>
        </div>
      </div>
    </ProfileSectionWrapper>
  );
}

export default UserDetailSection;

import { Avatar } from "@mui/material";
import { Button, Text } from "@radix-ui/themes";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import useAuth from "../../hooks/auth/useAuth";
import useGetProfile from "../../hooks/user/useGetProfile";
import useGetUser from "../../hooks/user/useGetUser";
import useUpdateUser from "../../hooks/user/useUpdateUser";
import useUploadProfile from "../../hooks/user/useUploadProfile";
import { getInitialsOfName } from "../../utils/Helper";
import ResponseSnackbar from "../ResponseSnackbar";
import EditProfileDialog from "./EditProfileDialog";
import LittleInfo from "./LittleInfo";
import ProfileSectionWrapper from "./ProfileSectionWrapper";
import { useNavigate } from "react-router-dom";

const defaultErrMsg = "Unexpected error! Please try again later";

function UserDetailSection(props) {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [openEdit, setOpenEdit] = useState(false);
  const [response, setResponse] = useState({
    success: false,
    error: false,
    message: "",
  });
  const queryClient = useQueryClient();

  const onUpdateSuccess = (data) => {
    setResponse((prev) => ({ ...prev, success: true }));
    navigate(0);
  };

  const onUpdateError = (error) => {
    const errMsg = error.response.data?.message;
    setResponse((prev) => ({
      ...prev,
      error: true,
      message: errMsg || defaultErrMsg,
    }));
  };

  const { mutate: updateUser, isPending: isUpdating } = useUpdateUser({
    onSuccess: onUpdateSuccess,
    onError: onUpdateError,
  });

  const { mutate: updateProfile, isPending: isUploadingProfile } =
    useUploadProfile({
      onSuccess: (res) => {
        queryClient.invalidateQueries({ queryKey: ["get_profile", user.id] });
      },
      onError: onUpdateError,
    });

  const { data, isFetched: isUserFetched } = useGetUser({
    userId: user.id,
    table: "user",
  });

  const { data: profile } = useGetProfile({ userId: user.id });

  let joinedOn = "";
  let username = "";
  let address = "";
  let status = "";
  let name = "";
  let email = "";

  if (isUserFetched) {
    joinedOn = new Date(data.created_at).toLocaleDateString("en-IN");
    username = data.user_name;
    address = data.address;
    status = data.status || "You should update your status!";
    name = data.name;
    email = data.email;
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
        message={response.message}
        severity={"error"}
      />
      {/* Edit Profile Dialog */}
      {openEdit && isUserFetched && (
        <EditProfileDialog
          open={openEdit}
          setOpen={setOpenEdit}
          userId={user.id}
          user={{ address, user_name: username, name, profile: profile }}
          updateUser={updateUser}
          updateProfile={updateProfile}
          loading={isUpdating || isUploadingProfile ? "true" : "false"}
        />
      )}
      <div className="flex justify-between">
        <div className="flex gap-2">
          <div className="w-1 h-8 bg-radix-green rounded-full"></div>
          <Text size={"6"}>Profile</Text>
        </div>
        <div>
          <Button onClick={() => setOpenEdit(true)}>Update</Button>
        </div>
      </div>
      <div className="flex gap-8 mt-4">
        <Avatar
          src={profile}
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
        <div className="w-full">
          <div className="flex flex-col">
            <Text size={"5"}>{name}</Text>
            <Text size={"2"} className="text-gray-400">
              {status}
            </Text>
          </div>
          <div className="mt-4 flex flex-col sm:flex-row sm:flex-wrap justify-start sm:gap-20 w-full">
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

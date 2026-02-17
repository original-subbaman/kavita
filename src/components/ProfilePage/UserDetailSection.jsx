import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/auth/useAuth";
import useGetProfile from "../../hooks/user/useGetProfile";
import useGetUser from "../../hooks/user/useGetUser";
import useUpdateUser from "../../hooks/user/useUpdateUser";
import useUploadProfile from "../../hooks/user/useUploadProfile";
import { getInitialsOfName } from "../../utils/Helper";
import ResponseSnackbar from "../ResponseSnackbar";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/Avatar";
import { Button } from "../ui/Button";
import {
  Edit,
  Settings,
  MapPin,
  Calendar,
  PenLine,
  Heart,
  Bookmark,
  Users,
} from "lucide-react";
import EditProfileDialog from "./EditProfileDialog";

const defaultErrMsg = "Unexpected error! Please try again later";

const STATS_ICON_STYLE = "w-3 h-3";

function UserDetailSection({ userStats }) {
  const { user } = useAuth();
  const [openEdit, setOpenEdit] = useState(false);
  const [response, setResponse] = useState({
    success: false,
    error: false,
    message: "",
  });
  const queryClient = useQueryClient();

  const onUpdateSuccess = (data) => {
    setResponse((prev) => ({ ...prev, success: true }));
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

  // Array of stat definitions
  const stats = [
    {
      value: userStats.postsCount,
      label: "Poems",
      Icon: PenLine,
      className: "text-center",
    },
    {
      value: userStats.likesReceived,
      label: "Likes",
      Icon: Heart,
      className: "text-center",
    },
    {
      value: userStats.savedQuotes,
      label: "Saved",
      Icon: Bookmark,
      className: "text-center",
    },
    {
      value: userStats.followers,
      label: "Followers",
      Icon: Users,
      className: "text-start",
    },
  ];

  return (
    <div className="px-6 pb-6">
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

      {/* Avatar and actions */}
      <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between my-4">
        <div className="flex items-end gap-4">
          <Avatar className="w-24 h-24 border-4 border-card shadow-lg">
            <AvatarImage src={profile} alt={name} />
            <AvatarFallback className="bg-secondary text-secondary-foreground text-2xl">
              {getInitialsOfName(name)}
            </AvatarFallback>
          </Avatar>
          <div className="mb-2">
            <h1 className="font-display text-2xl font-bold text-foreground">
              {name}
            </h1>
            <p className="text-muted-foreground">@{username}</p>
          </div>
        </div>
        <div className="flex gap-2 mt-4 sm:mt-0">
          <Button
            variant="outline"
            size="sm"
            className="gap-2 border-border"
            onClick={() => setOpenEdit(true)}
          >
            <Edit />
            Edit Profile
          </Button>
          <Button variant="ghost" size="icon" className="h-9 w-9">
            <Settings />
          </Button>
        </div>
      </div>

      {/* Bio */}
      <p className="text-foreground mb-4 max-w-2xl">{status}</p>

      {/* Meta info */}
      <div className="flex flex-wrap gap-4 text-sm text-muted-foreground mb-6">
        <span className="flex items-center gap-1">
          <MapPin className="w-4 h-4 mb-1" />
          {address || "Unknown"}
        </span>
        <span className="flex justify-center items-center gap-1">
          <Calendar className="w-4 h-4 mb-1" />
          Joined {joinedOn}
        </span>
      </div>

      {/* Stats */}
      <div className="flex flex-wrap gap-6">
        {stats.map(({ value, label, Icon, className }, idx) => (
          <StatItem
            key={label}
            value={value}
            label={label}
            Icon={Icon}
            className={className}
          />
        ))}
      </div>
    </div>
  );
}

function StatItem({ value, label, Icon }) {
  return (
    <div className="text-start">
      <div className="text-2xl font-bold text-foreground">{value}</div>
      <div className="text-sm text-muted-foreground flex items-center gap-1">
        <Icon className={STATS_ICON_STYLE} />
        {label}
      </div>
    </div>
  );
}

export default UserDetailSection;

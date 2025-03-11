import React, { useState } from "react";
import ProfileSectionWrapper from "./ProfileSectionWrapper";
import { Button, Text } from "@radix-ui/themes";
import { Avatar } from "@mui/material";
import useAuth from "../../hooks/auth/useAuth";
import { getInitialsOfName } from "../../utils/Helper";
import LittleInfo from "./LittleInfo";
import StatCard from "./StatCard";
import EditProfileDialog from "./EditProfileDialog";

function UserDetailSection(props) {
  const { user } = useAuth();
  const { name, email } = user.user_metadata;
  const [openEdit, setOpenEdit] = useState(false);
  return (
    <ProfileSectionWrapper height={"15rem"}>
      <EditProfileDialog open={openEdit} setOpen={setOpenEdit} />
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
            <LittleInfo title={"username"} info={"_username"} />
            <LittleInfo title={"email"} info={"abc@gmail.com"} />
            <LittleInfo title={"address"} info={"xyz, xyz, yz"} />
            <LittleInfo title={"joined_on"} info={"14/01/2025"} />
          </div>
          <div className="flex gap-4 mt-4">
            <StatCard title={"total_posts"} value={"304"} />
            <StatCard title={"total_likes"} value={"304"} />
            <StatCard title={"quotes_recorded"} value={"304"} />
            <StatCard title={"current_streak"} value={"304"} />
          </div>
        </div>
      </div>
    </ProfileSectionWrapper>
  );
}

export default UserDetailSection;

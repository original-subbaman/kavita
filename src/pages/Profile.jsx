import { Avatar, Box, Grid, Container, Text, Heading } from "@radix-ui/themes";
import RootWrapper from "../components/RootWrapper";
import UploadProfile from "../components/ProfilePage/UploadProfile";
import { useState } from "react";
import HeatMap from "@uiw/react-heat-map";
import UserDetailSection from "../components/ProfilePage/UserDetailSection";

function Profile() {
  const [profile, setProfile] = useState(null);
  const value = [
    { date: "2016/01/11", count: 2 },
    { date: "2016/01/12", count: 2 },
    { date: "2016/01/13", count: 2 },
    { date: "2016/01/14", count: 5 },
    { date: "2016/02/11", count: 20 },
  ];
  const handleProfileClick = () => {
    document.getElementById("upload_profile").click();
  };
  const handleProfileImageSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imgURL = URL.createObjectURL(file);
      setProfile(imgURL);
    }
  };
  return (
    <RootWrapper>
      <Container className="py-4">
        <UserDetailSection />
      </Container>
    </RootWrapper>
  );
}

export default Profile;

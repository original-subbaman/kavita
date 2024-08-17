import { Avatar, Box, Grid, Container, Text, Heading } from "@radix-ui/themes";
import RootWrapper from "../components/RootWrapper";
import UploadProfile from "../components/ProfilePage/UploadProfile";
import { useState } from "react";
import HeatMap from "@uiw/react-heat-map";

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
        <Box className="flex">
          <Grid as="div" className="max-w-60">
            <UploadProfile
              profile={profile}
              handleOnClick={handleProfileClick}
              onImgSelect={handleProfileImageSelect}
            />
            <Heading size={"8"} className="text-white text-left" mt={"4"}>
              John Doe
            </Heading>
            <Text size={"7"} className="text-gray-50">
              john_doe
            </Text>
            <p className="text-white mt-4 break-words">
              Hi! Living life at several WTF per uncaught exception
              asd;fljasd;flkasjdflasdfj
            </p>
          </Grid>
          <Box className="text-white">
            <Heading as="h2">John Doe</Heading>
            <HeatMap
              value={value}
              weekLabels={[" ", "Mon", " ", "Wed", " ", "Fri", " "]}
              startDate={new Date("2016/01/01")}
            />
          </Box>
        </Box>
      </Container>
    </RootWrapper>
  );
}

export default Profile;

import { Container } from "@radix-ui/themes";
import { useState } from "react";
import UserDetailSection from "../components/ProfilePage/UserDetailSection";
import RootWrapper from "../components/RootWrapper";
import ActivitySection from "../components/ProfilePage/ActivitySection";
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
        <div className="mt-4">
          <ActivitySection />
        </div>
      </Container>
    </RootWrapper>
  );
}

export default Profile;

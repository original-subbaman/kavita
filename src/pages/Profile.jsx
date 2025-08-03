import { Container, Grid } from "@radix-ui/themes";
import { useState } from "react";
import ActivitySection from "../components/ProfilePage/ActivitySection";
import StatCard from "../components/ProfilePage/StatCard";
import UserDetailSection from "../components/ProfilePage/UserDetailSection";
import useAuth from "../hooks/auth/useAuth";
import useGetPostCount from "../hooks/post/useGetPostCount";
import useGetTotalLikes from "../hooks/user/useGetTotalLikes";
import useGetLanguageCount from "../hooks/language/useGetLanguageCount";
function Profile() {
  const { user } = useAuth();
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

  const { data: postCount, isFetching: isFetchingPostCount } = useGetPostCount({
    userId: user.id,
  });
  const { data: likeCount, isFetching: isFetchingLikeCount } = useGetTotalLikes(
    { userId: user.id }
  );
  const { data: languageCount, isFetching: isFetchingLangCount } =
    useGetLanguageCount({
      userId: user.id,
    });

  return (
    <Container className="py-4">
      <UserDetailSection />
      <div className="my-4">
        <ActivitySection />
      </div>
      <Grid columns="2" gap="3" width="auto">
        <StatCard
          title="total posts"
          value={isFetchingPostCount ? 0 : postCount}
        />
        <StatCard
          title="total likes"
          value={isFetchingLikeCount ? 0 : likeCount}
        />
        <StatCard
          title="language recorded"
          value={isFetchingLangCount ? 0 : languageCount}
        />
        <StatCard title="current streak" value={3} />
      </Grid>
    </Container>
  );
}

export default Profile;

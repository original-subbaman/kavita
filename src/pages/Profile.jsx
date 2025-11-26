import { Container, Grid } from "@radix-ui/themes";
import ActivitySection from "../components/ProfilePage/ActivitySection";
import StatCard from "../components/ProfilePage/StatCard";
import UserDetailSection from "../components/ProfilePage/UserDetailSection";
import useAuth from "../hooks/auth/useAuth";
import useGetLanguageCount from "../hooks/language/useGetLanguageCount";
import useGetPostCount from "../hooks/post/useGetPostCount";
import useGetLongestStreak from "../hooks/user/useGetLongestStreak";
import useGetTotalLikes from "../hooks/user/useGetTotalLikes";

function Profile() {
  const { user } = useAuth();

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
  const { data: longestStreak, isFetching: isFetchingLongestStreak } =
    useGetLongestStreak({ userId: user.id });

  return (
    <Container className="flex flex-col justify-be mx-3 min-h-screen py-4">
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
          title="quotes saved"
          value={isFetchingLangCount ? 0 : languageCount}
        />
        <StatCard
          title="longest streak"
          value={isFetchingLongestStreak ? 0 : longestStreak[0]?.streak_length}
        />
      </Grid>
    </Container>
  );
}

export default Profile;

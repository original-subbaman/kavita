import { Container, Text, Box } from "@radix-ui/themes";
import PoetDetailCard from "../components/PoetProfile/PoetDetailCard";
import useGetUser from "../hooks/user/useGetUser";
import useGetProfile from "../hooks/user/useGetProfile";
import { useLocation, useParams } from "react-router-dom";
import useGetPostCount from "../hooks/post/useGetPostCount";

const PoetProfile = () => {
  const params = useParams();
  const userId = params?.id;
  const { data: user } = useGetUser({ userId: userId });
  const { data: profile } = useGetProfile({ userId: userId });
  const { data: posts } = useGetPostCount({ userId: userId });

  return (
    <Container className="min-h-screen py-10" size={"2"}>
      <PoetDetailCard
        profile={profile}
        username={user?.user_name || ""}
        name={user?.name || ""}
        poems={posts || 0}
        bio={user?.bio}
        followers={100}
      />
      <Text size={"5"} className="text-white">
        Recent Posts
      </Text>
      <Box></Box>
    </Container>
  );
};

export default PoetProfile;

import { Container, Text } from "@radix-ui/themes";
import PoetDetailCard from "../components/PoetProfile/PoetDetailCard";

const PoetProfile = () => {
  return (
    <Container className="min-h-screen py-10" size={"2"}>
      <PoetDetailCard />
      <Text size={"5"} className="text-white">
        Recent Posts
      </Text>
    </Container>
  );
};

export default PoetProfile;

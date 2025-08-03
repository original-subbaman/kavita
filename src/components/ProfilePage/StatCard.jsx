import { Card, Flex, Text } from "@radix-ui/themes";

function StatCard({ title, value }) {
  return (
    <Card className="min-w-[10rem] p-4  bg-[#212327] rounded-lg border-0">
      <Flex direction="column" align="center">
        <Text size={"6"} className="text-white">
          {value}
        </Text>
        <Text size={"2"} weight={"thin"} className="text-gray-400">
          {title}
        </Text>
      </Flex>
    </Card>
  );
}

export default StatCard;

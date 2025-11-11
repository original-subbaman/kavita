import { Card, Flex, Text } from "@radix-ui/themes";
import { useAppTheme } from "../../hooks/useAppTheme";

function StatCard({ title, value }) {
  const { mode } = useAppTheme();
  return (
    <Card
      className={`min-w-[10rem] p-4 rounded-lg border-0 ${
        mode === "dark" ? "bg-[#212327]" : "bg-white"
      }`}
    >
      <Flex direction="column" align="center">
        <Text
          size={"6"}
          className={mode === "dark" ? "text-white" : "text-black"}
        >
          {value}
        </Text>
        <Text
          size={"2"}
          weight={"thin"}
          className={mode === "dark" ? "text-gray-400" : "text-gray-600"}
        >
          {title}
        </Text>
      </Flex>
    </Card>
  );
}

export default StatCard;

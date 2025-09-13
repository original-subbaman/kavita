import { Text } from "@radix-ui/themes";
function PromptText({ prompt }) {
  return (
    <Text
      align="center"
      className="w-full font-primary text-2xl md:text-3xl text-center text-bold text-green-700"
    >
      {prompt}
    </Text>
  );
}

export default PromptText;

import { Box, Text } from "@radix-ui/themes";
function PromptText({ prompt }) {
  return (
    <Box className="flex flex-col items-start gap-2 w-full">
      <Text
        align="center"
        size={{ xs: "4", md: "8" }}
        className="w-full font-primary text-center text-bold text-green-700"
      >
        {prompt}
      </Text>
    </Box>
  );
}

export default PromptText;

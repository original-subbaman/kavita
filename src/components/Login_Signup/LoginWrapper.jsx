import { Box, Flex, Text } from "@radix-ui/themes";
import { useAppTheme } from "../../hooks/useAppTheme";

const LoginWrapper = ({ title, children }) => {
  const { mode } = useAppTheme();
  return (
    <main
      className={`w-full font-primary min-h-screen ${
        mode === "dark" ? "bg-dark-light" : "bg-white border"
      }`}
    >
      <Flex align={"center"} justify={"center"} className="min-h-screen">
        <Box
          className={`bg-white p-6 md:min-w-[500px] md:min-h-[400px] shadow-lg rounded-md border border-gray-300`}
        >
          <Text size={"6"} className="text-[#30a46c]">
            {title}
          </Text>
          <hr className="my-4"></hr>
          {children}
        </Box>
      </Flex>
    </main>
  );
};

export default LoginWrapper;

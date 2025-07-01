import { Box, Flex, Text } from "@radix-ui/themes";

const LoginWrapper = ({ title, children }) => {
  return (
    <main className="w-full font-primary min-h-screen bg-dark-light">
      <Flex align={"center"} justify={"center"} className="min-h-screen">
        <Box className="bg-white p-6 min-w-[500px] min-h-[400px] shadow-lg rounded-md">
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

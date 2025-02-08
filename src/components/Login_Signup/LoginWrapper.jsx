import { Flex, Box, Text } from "@radix-ui/themes";
import RootWrapper from "../RootWrapper";

const LoginWrapper = ({ title, children }) => {
  return (
    <RootWrapper showHeader={false}>
      <Flex align={"center"} justify={"center"} className="min-h-screen">
        <Box className="bg-white p-6 min-w-[500px] min-h-[400px] shadow-lg rounded-md">
          <Text size={"6"} className="text-[#30a46c]">
            {title}
          </Text>
          <hr className="my-4"></hr>
          {children}
        </Box>
      </Flex>
    </RootWrapper>
  );
};

export default LoginWrapper;

import { Box, Flex, Text } from "@radix-ui/themes";
import { useAppTheme } from "../../hooks/useAppTheme";
import AppLogo from "../AppLogo";
import Header from "../layout/Header";

const LoginWrapper = ({ title, subtitle, children }) => {
  const { mode } = useAppTheme();
  // Set background and foreground colors based on mode, similar to Home
  const bgMain = mode === "dark" ? "bg-dark-light" : "bg-slate-50";
  const fgMain = mode === "dark" ? "text-white" : "text-black";
  const boxBg =
    mode === "dark"
      ? "bg-[#23211f] border border-[#3a3734]"
      : "bg-white border border-gray-300";
  const subtitleColor = mode === "dark" ? "text-gray-400" : "text-gray-500";

  return (
    <>
      <Header theme={mode} />
      <main className={`w-full font-primary min-h-screen ${bgMain} ${fgMain}`}>
        <Flex align={"center"} justify={"center"} className="min-h-screen">
          <Box
            className={`p-6 md:min-w-[400px] md:min-h-[400px] shadow-lg rounded-md ${boxBg}`}
          >
            <AppLogo />
            <Box className="w-full mt-4">
              <p className="text-[1.5rem] text-[#30a46c] w-full text-center font-bold">
                {title}
              </p>
              <p className={`w-full text-center ${subtitleColor}`}>
                {subtitle}
              </p>
            </Box>
            <hr className="my-4"></hr>
            {children}
          </Box>
        </Flex>
      </main>
    </>
  );
};

export default LoginWrapper;

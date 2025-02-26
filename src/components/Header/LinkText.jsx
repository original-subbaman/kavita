import { Text } from "@radix-ui/themes";

const LinkText = ({ isActive, children }) => {
  return (
    <Text
      className={`hover:text-green-500 duration-300 transition-all ${
        isActive ? "text-green-500" : "text-[#30a46c]"
      }`}
    >
      {children}
    </Text>
  );
};

export default LinkText;

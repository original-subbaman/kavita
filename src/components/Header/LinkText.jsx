import { Text } from "@radix-ui/themes";

const LinkText = ({ isActive, children }) => {
  console.log("🚀 ~ LinkText ~ isActive:", isActive);
  console.log("🚀 ~ LinkText ~ children:", children);
  return (
    <Text
      className={`hover:text-white duration-300 transition-all`}
      color={isActive ? "white" : "green"}
    >
      {children}
    </Text>
  );
};

export default LinkText;

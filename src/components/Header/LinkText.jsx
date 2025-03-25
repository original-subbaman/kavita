import { Text } from "@radix-ui/themes";

const LinkText = ({ isActive, children }) => {
  return (
    <div>
      <Text
        className={`hover:text-green-500 duration-300 transition-all ${
          isActive ? "text-green-500 font-bold" : "text-[#30a46c]"
        }`}
      >
        {children}
      </Text>
      {isActive && (
        <div className="animate-width-grow h-1 bg-radix-grass rounded-sm"></div>
      )}
    </div>
  );
};

export default LinkText;

import { Button } from "@radix-ui/themes";
import { SunIcon, MoonIcon } from "@radix-ui/react-icons";

const ToggleThemeButton = ({ mode, toggleTheme }) => {
  return (
    <Button variant="soft" className="h-8" onClick={toggleTheme}>
      {mode === "dark" ? <SunIcon /> : <MoonIcon />}
    </Button>
  );
};

export default ToggleThemeButton;

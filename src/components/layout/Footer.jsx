import { useAppTheme } from "../../hooks/useAppTheme";

const Footer = () => {
  const { mode } = useAppTheme();

  return (
    <footer
      className={`w-full ${
        mode === "dark" ? "bg-dark-light text-white" : "bg-white text-black"
      } font-primary text-center py-4`}
    >
      <p>From Sikkim with ❤️</p>
    </footer>
  );
};

export default Footer;

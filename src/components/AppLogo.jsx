import logo from "../assets/logo.png";

const AppLogo = () => {
  return (
    <div
      className="
        flex flex-col
        cursor-pointer hover:bg-transparent 
        hover:shadow-none font-primary"
    >
      <span className="font-display text-2xl font-semibold text-primary mb-0">
        कविता
      </span>
      {/* <img src={logo} className="w-10" /> */}
    </div>
  );
};

export default AppLogo;

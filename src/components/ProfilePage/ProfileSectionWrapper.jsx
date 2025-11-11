import { useAppTheme } from "../../hooks/useAppTheme";

function ProfileSectionWrapper({ height, children }) {
  const { mode } = useAppTheme();
  return (
    <div
      className={`w-[100%] ${
        mode === "dark" ? "bg-[#212327] text-white" : "bg-white text-black"
      }  rounded-lg  p-6 drop-shadow-md`}
    >
      {children}
    </div>
  );
}

export default ProfileSectionWrapper;

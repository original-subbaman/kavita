import { useAppTheme } from "../hooks/useAppTheme";
import Loading from "./Loading";
function FullScreenLoading(props) {
  const { mode } = useAppTheme();
  return (
    <div
      className={`w-screen h-screen flex items-center justify-center ${
        mode === "dark" ? "bg-dark-light" : "bg-gray-100"
      }`}
    >
      <Loading />
    </div>
  );
}

export default FullScreenLoading;

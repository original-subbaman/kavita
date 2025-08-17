import { Text } from "@radix-ui/themes";
import Lottie from "react-lottie";
import animationData from "../lottie/loading.json";

function Loading({ message }) {
  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <div className="flex flex-col items-center justify-center">
      <Lottie options={defaultOptions} width={100} height={100} />
      {message && (
        <Text size={"4"} className="text-center text-white">
          {message}
        </Text>
      )}
    </div>
  );
}

export default Loading;

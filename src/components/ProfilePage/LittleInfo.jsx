import React from "react";
import { Text } from "@radix-ui/themes";
function LittleInfo({ title, info }) {
  return (
    <div className="flex flex-col">
      <Text size={"2"} className="text-gray-400" weight={"light"}>
        {title}
      </Text>
      <Text size={"3"}>{info}</Text>
    </div>
  );
}

export default LittleInfo;

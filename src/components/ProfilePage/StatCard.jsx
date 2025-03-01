import { Text } from "@radix-ui/themes";
import React from "react";

function StatCard({ title, value }) {
  return (
    <div className="flex flex-col min-w-[10rem] p-4  bg-[#37393d] rounded-lg drop-shadow-md">
      <Text size={"3"}>{value}</Text>
      <Text size={"2"} weight={"thin"} className="text-gray-400">
        {title}
      </Text>
    </div>
  );
}

export default StatCard;

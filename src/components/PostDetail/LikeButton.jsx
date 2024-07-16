import React from "react";
import { Button } from "@radix-ui/themes";
import { HeartFilledIcon, HeartIcon } from "@radix-ui/react-icons";

export default function LikeButton({ like }) {
  return (
    <Button variant={"ghost"} size={"4"} className="bg-red ">
      {like ? (
        <HeartFilledIcon color="red" className="w-16 h-16" />
      ) : (
        <HeartIcon className="w-8 h-8" />
      )}
    </Button>
  );
}

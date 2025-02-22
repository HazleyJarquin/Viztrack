import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

interface Props {
  name?: string;
  fallback: string;
  src: string;
}

export const CustomAvatar = ({ name, fallback, src }: Props) => {
  const getInitials = () => {
    if (name) {
      return name
        .split(" ")
        .map((word) => word[0])
        .join("")
        .toUpperCase();
    }
    if (fallback) {
      return fallback.substring(0, 2).toUpperCase();
    }
    return "??";
  };

  return (
    <Avatar>
      <AvatarImage src={src} />
      <AvatarFallback>{getInitials()}</AvatarFallback>
    </Avatar>
  );
};

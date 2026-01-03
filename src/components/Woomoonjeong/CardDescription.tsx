import React from "react";

interface CardDescriptionProps {
  children: React.ReactNode;
  clamp?: boolean;
}

export const CardDescription: React.FC<CardDescriptionProps> = ({
  children,
  clamp = false,
}) => {
  return (
    <p className={`mb-4 text-sm text-gray-600 ${clamp ? "line-clamp-2" : ""}`}>
      {children}
    </p>
  );
};

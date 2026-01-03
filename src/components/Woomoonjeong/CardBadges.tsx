import React from "react";

interface CardBadgesProps {
  children: React.ReactNode;
}

export const CardBadges: React.FC<CardBadgesProps> = ({ children }) => {
  return <div className="flex items-center gap-2 mb-4">{children}</div>;
};

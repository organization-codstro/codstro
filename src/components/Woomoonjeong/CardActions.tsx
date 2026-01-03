import React from "react";

interface CardActionsProps {
  primary?: React.ReactNode;
  secondary?: React.ReactNode;
}

export const CardActions: React.FC<CardActionsProps> = ({
  primary,
  secondary,
}) => {
  return (
    <div className="flex items-center justify-between">
      {primary}
      {secondary}
    </div>
  );
};

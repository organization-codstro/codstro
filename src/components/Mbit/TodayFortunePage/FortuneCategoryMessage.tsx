import React from "react";
import { FortuneCategoryMessageProps } from "../../../types/pages/Mbit/TodayFortunePage/FortuneCategoryMessage";

const FortuneCategoryMessage: React.FC<FortuneCategoryMessageProps> = ({
  message,
}) => {
  return (
    <div className="space-y-3 text-base">
      {message.split("\n").map((line, index) => {
        const parts = line.split(":");
        if (parts.length === 2) {
          return (
            <div key={index}>
              <span className="font-bold">{parts[0]}:</span>
              <span>{parts[1]}</span>
            </div>
          );
        }
        return null;
      })}
    </div>
  );
};

export default FortuneCategoryMessage;

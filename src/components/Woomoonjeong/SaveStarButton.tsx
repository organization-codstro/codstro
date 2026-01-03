import React from "react";
import { Star } from "lucide-react";

interface SaveStarButtonProps {
  isSaved: boolean;
  onToggle: () => void;
  savedTitle?: string;
  unsavedTitle?: string;
}

export const SaveStarButton: React.FC<SaveStarButtonProps> = ({
  isSaved,
  onToggle,
  savedTitle = "Remove from saved",
  unsavedTitle = "Save",
}) => {
  return (
    <button
      onClick={onToggle}
      title={isSaved ? savedTitle : unsavedTitle}
      className={`p-2 rounded-lg transition-colors ${
        isSaved
          ? "text-yellow-500 bg-yellow-50 hover:bg-yellow-100"
          : "text-gray-400 hover:text-yellow-500 hover:bg-yellow-50"
      }`}
    >
      <Star className={`w-4 h-4 ${isSaved ? "fill-current" : ""}`} />
    </button>
  );
};

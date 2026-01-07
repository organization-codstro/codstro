import React from "react";
import { ArrowLeft, Bookmark, BookmarkCheck } from "lucide-react";

interface ProjectDetailHeaderProps {
  title: string;
  description: string;
  isBookmarked: boolean;
  onBack: () => void;
  onToggleBookmark: () => void;
}

const ProjectDetailHeader: React.FC<ProjectDetailHeaderProps> = ({
  title,
  description,
  isBookmarked,
  onBack,
  onToggleBookmark,
}) => {
  return (
    <div className="flex items-center gap-4 mb-6">
      <button
        onClick={onBack}
        className="p-2 transition-colors rounded-lg hover:bg-gray-100"
      >
        <ArrowLeft className="w-5 h-5 text-gray-600" />
      </button>
      <div className="flex-1">
        <h1 className="text-2xl font-bold text-gray-800">{title}</h1>
        <p className="text-gray-600">{description}</p>
      </div>
      <button
        onClick={onToggleBookmark}
        className="p-2 transition-all rounded-lg hover:bg-gray-100 hover:scale-110"
      >
        {isBookmarked ? (
          <BookmarkCheck className="w-6 h-6 text-yellow-500" />
        ) : (
          <Bookmark className="w-6 h-6 text-gray-400 hover:text-gray-600" />
        )}
      </button>
    </div>
  );
};

export default ProjectDetailHeader;

import React from "react";
import {
  Calendar,
  Target,
  Bookmark,
  BookmarkCheck,
  Download,
} from "lucide-react";
import StatusBadge from "../StatusBadge";

interface PlanHeaderProps {
  name: string;
  description: string;
  imageUrl?: string;
  startDate: string;
  endDate: string;
  nodeCount: number;
  state: "waiting" | "in progress" | "done";
  isBookmarked: boolean;
}

const PlanHeader: React.FC<PlanHeaderProps> = ({
  name,
  description,
  imageUrl,
  startDate,
  endDate,
  nodeCount,
  state,
  isBookmarked,
}) => {
  return (
    <div className="overflow-hidden bg-white border border-purple-100 shadow-sm rounded-xl">
      {imageUrl && (
        <div className="h-48 overflow-hidden bg-gray-200">
          <img
            src={imageUrl}
            alt={name}
            className="object-cover w-full h-full"
          />
        </div>
      )}

      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <h1 className="mb-2 text-2xl font-bold text-gray-800">{name}</h1>
            <p className="mb-4 text-gray-600">{description}</p>

            <div className="flex items-center gap-4 text-sm text-gray-500">
              <div className="flex items-center gap-1">
                <Calendar className="w-4 h-4" />
                <span>
                  {new Date(startDate).toLocaleDateString()} -{" "}
                  {new Date(endDate).toLocaleDateString()}
                </span>
              </div>
              <div className="flex items-center gap-1">
                <Target className="w-4 h-4" />
                <span>{nodeCount} learning nodes</span>
              </div>
            </div>
          </div>
          <StatusBadge state={state} />
        </div>

        <div className="flex items-center gap-3">
          <button
            className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-colors ${
              isBookmarked
                ? "bg-yellow-100 text-yellow-700 border-yellow-200"
                : "bg-gray-100 text-gray-700 border-gray-200 hover:bg-gray-200"
            }`}
          >
            {isBookmarked ? (
              <BookmarkCheck className="w-4 h-4" />
            ) : (
              <Bookmark className="w-4 h-4" />
            )}
            {isBookmarked ? "Bookmarked" : "Bookmark"}
          </button>

          <button className="flex items-center gap-2 px-4 py-2 bg-[#587CF0] text-white rounded-lg hover:bg-[#4a6de8] transition-colors">
            <Download className="w-4 h-4" />
            Add to My Plans
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlanHeader;

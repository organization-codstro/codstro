import { TrendingUp } from "lucide-react";
import { TrendingSectionProps } from "../../../types/ProjectPlanning/ProjectMainPage/TrendingSection";

export const TrendingSection = ({ news }: TrendingSectionProps) => (
  <div className="mt-8">
    <h2 className="flex items-center mb-4 space-x-2 text-xl font-semibold text-gray-900">
      <TrendingUp className="w-5 h-5 text-[#587CF0]" />
      <span>Trending Topics</span>
    </h2>
    <div className="overflow-hidden bg-white border border-gray-200 rounded-lg">
      {news.map((item) => (
        <div
          key={item.id}
          className="p-4 transition-colors border-b border-gray-100 cursor-pointer last:border-b-0 hover:bg-gray-50"
        >
          <h4 className="mb-1 text-sm font-medium text-gray-900">
            {item.title}
          </h4>
          <p className="text-xs text-gray-500">{item.date}</p>
        </div>
      ))}
    </div>
  </div>
);

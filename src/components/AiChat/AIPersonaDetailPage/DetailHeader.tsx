import { ArrowLeft } from "lucide-react";
import { DetailHeaderProps } from "../../../types/AiChat/AIPersonaDetailPage/DetailHeader";

export function DetailHeader({ title = "Profile", onBack }: DetailHeaderProps) {
  return (
    <div className="p-4 bg-white border-b border-gray-200">
      <div className="flex items-center gap-3">
        <button
          onClick={onBack}
          className="p-2 transition-colors rounded-full hover:bg-gray-100"
          aria-label="Go back"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-xl font-bold text-gray-800">{title}</h1>
      </div>
    </div>
  );
}

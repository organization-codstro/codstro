import { MessageCircle } from "lucide-react";
import { MaterialActionButtonsProps } from "../../../types/pages/Concepts/PackageDetailPage/MaterialActionButtons";

export default function MaterialActionButtons({
  onShowAIChat,
  onAddTodo,
}: MaterialActionButtonsProps) {
  return (
    <div className="flex gap-3 mb-8">
      <button
        onClick={onShowAIChat}
        className="flex items-center gap-2 px-4 py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
      >
        <MessageCircle className="w-4 h-4" />
        Chat with AI
      </button>
      <button
        onClick={() => onAddTodo("documentation")}
        className="flex items-center gap-2 px-4 py-2 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50"
      >
        <MessageCircle className="w-4 h-4" />
        Add Todo: Explore Documentation
      </button>
      <button
        onClick={() => onAddTodo("clone_project")}
        className="flex items-center gap-2 px-4 py-2 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50"
      >
        <MessageCircle className="w-4 h-4" />
        Add Todo: Build Clone Project
      </button>
    </div>
  );
}

import { MessageCircle, Plus } from "lucide-react";

interface ThirdPartyActionButtonsProps {
  onShowAIChat: () => void;
  onAddTodo: (type: "documentation" | "clone_project") => void;
}

export default function ThirdPartyActionButtons({
  onShowAIChat,
  onAddTodo,
}: ThirdPartyActionButtonsProps) {
  return (
    <div className="flex flex-wrap gap-3 mb-8">
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
        <Plus className="w-4 h-4" />
        Add Todo: Explore Documentation
      </button>

      <button
        onClick={() => onAddTodo("clone_project")}
        className="flex items-center gap-2 px-4 py-2 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50"
      >
        <Plus className="w-4 h-4" />
        Add Todo: Build Clone Project
      </button>
    </div>
  );
}

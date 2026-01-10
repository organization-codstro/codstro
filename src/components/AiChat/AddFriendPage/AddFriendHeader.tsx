import { ArrowLeft } from "lucide-react";
import {
  HeaderProps,
  ViewType,
} from "../../../types/pages/AiChat/AddFriendPage/AddFriendHeader";

export function AddFriendHeader({ view, setView, onBack }: HeaderProps) {
  const tabs: { id: ViewType; label: string }[] = [
    { id: "my-friends", label: "My Friends" },
    { id: "browse", label: "Browse All" },
    { id: "search", label: "Search" },
  ];

  return (
    <div className="p-4 bg-white border-b border-gray-200">
      <div className="flex items-center gap-3 mb-4">
        <button
          onClick={onBack}
          className="p-2 transition-colors rounded-full hover:bg-gray-100"
        >
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold text-gray-800">Add Friend</h1>
      </div>

      <div className="flex gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setView(tab.id)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
              view === tab.id
                ? "text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"
            }`}
            style={view === tab.id ? { backgroundColor: "#587CF0" } : {}}
          >
            {tab.label}
          </button>
        ))}
      </div>
    </div>
  );
}

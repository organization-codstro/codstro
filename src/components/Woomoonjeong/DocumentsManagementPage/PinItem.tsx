import React from "react";
import {
  FileText,
  Tag,
  Edit3,
  Trash2,
  ExternalLink,
  Check,
} from "lucide-react";
import { Pin } from "../../../types/Woomoonjeong/woomoonjeong";


interface PinItemProps {
  pin: Pin;
  isDeletePending: boolean;
  onEdit: (e: React.MouseEvent) => void;
  onDelete: (e: React.MouseEvent) => void;
}

const PinItem: React.FC<PinItemProps> = ({
  pin,
  isDeletePending,
  onEdit,
  onDelete,
}) => (
  <a
    href={pin.url}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center justify-between p-3 transition-shadow bg-white border border-gray-100 rounded-lg hover:shadow-sm"
  >
    <div className="flex-1">
      <div className="flex items-center gap-2 mb-1">
        <FileText className="w-4 h-4 text-gray-400" />
        <h5 className="font-medium text-gray-800">{pin.title}</h5>
      </div>
      <p className="mb-2 text-sm text-gray-600 line-clamp-1">
        {pin.description}
      </p>
      <div className="flex items-center gap-2">
        {pin.tags.map((tag) => (
          <span
            key={tag}
            className="flex items-center gap-1 px-2 py-0.5 text-[11px] text-gray-600 bg-gray-100 rounded"
          >
            <Tag className="w-2 h-2" />
            {tag}
          </span>
        ))}
      </div>
    </div>
    <div className="flex items-center gap-2 ml-4">
      <button
        onClick={onEdit}
        className="p-1 text-gray-400 hover:text-blue-500"
      >
        <Edit3 className="w-3 h-3" />
      </button>
      <button
        onClick={onDelete}
        className={`p-1 transition-all ${
          isDeletePending
            ? "text-red-600 scale-125"
            : "text-gray-400 hover:text-red-500"
        }`}
      >
        {isDeletePending ? (
          <Check className="w-3 h-3" />
        ) : (
          <Trash2 className="w-3 h-3" />
        )}
      </button>
      <ExternalLink className="w-3 h-3 text-gray-400" />
    </div>
  </a>
);

export default PinItem;

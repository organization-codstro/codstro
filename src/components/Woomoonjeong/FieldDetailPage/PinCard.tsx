import React from "react";
import { FileText, Tag, ExternalLink } from "lucide-react";
import { Pin } from "../../../types/Woomoonjeong/woomoonjeong";

interface PinCardProps {
  pin: Pin;
}

const PinCard: React.FC<PinCardProps> = ({ pin }) => (
  <a
    href={pin.url}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center justify-between p-3 transition-shadow border border-gray-100 rounded-lg hover:shadow-sm"
  >
    <div className="flex-1">
      <div className="flex items-center gap-2 mb-1">
        <FileText className="w-4 h-4 text-gray-400" />
        <h5 className="font-medium text-gray-800">{pin.title}</h5>
      </div>
      {pin.description && (
        <p className="mb-2 text-sm text-gray-600">{pin.description}</p>
      )}
      {pin.tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {pin.tags.map((tag) => (
            <span
              key={tag}
              className="flex items-center gap-1 px-2 py-1 text-xs text-gray-600 bg-gray-100 rounded"
            >
              <Tag className="w-2 h-2" />
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
    <ExternalLink className="w-3 h-3 ml-4 text-gray-400" />
  </a>
);

export default PinCard;

import React from "react";
import { FileText, Tag, ExternalLink } from "lucide-react";
import { PinCardProps } from "../../../types/pages/TodoManagement/FieldDetailPage/PinCard";

export const PinCard: React.FC<PinCardProps> = ({ pin }) => (
  <a
    href={pin.pin_url}
    target="_blank"
    rel="noopener noreferrer"
    className="flex items-center justify-between p-3 transition-shadow border border-gray-100 rounded-lg hover:shadow-sm"
  >
    <div className="flex-1">
      <div className="flex items-center gap-2 mb-1">
        <FileText className="w-4 h-4 text-gray-400" />
        <h5 className="font-medium text-gray-800">{pin.pin_title}</h5>
      </div>
      {pin.pin_description && (
        <p className="mb-2 text-sm text-gray-600">{pin.pin_description}</p>
      )}
      {pin.pin_label.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {pin.pin_label.map((label) => (
            <span
              key={label}
              className="flex items-center gap-1 px-2 py-1 text-xs text-gray-600 bg-gray-100 rounded"
            >
              <Tag className="w-2 h-2" />
              {label}
            </span>
          ))}
        </div>
      )}
    </div>
    <ExternalLink className="w-3 h-3 ml-4 text-gray-400" />
  </a>
);

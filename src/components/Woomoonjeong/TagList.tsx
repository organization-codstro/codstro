import React from "react";
import { Tag } from "lucide-react";

interface TagListProps {
  tags: string[];
  max?: number;
}

export const TagList: React.FC<TagListProps> = ({ tags, max = 3 }) => {
  const visible = tags.slice(0, max);
  const rest = tags.length - visible.length;

  return (
    <div className="flex flex-wrap gap-1 mb-4">
      {visible.map((tag) => (
        <span
          key={tag}
          className="flex items-center gap-1 px-2 py-1 text-xs text-gray-600 bg-gray-100 rounded"
        >
          <Tag className="w-2 h-2" />
          {tag}
        </span>
      ))}
      {rest > 0 && (
        <span className="px-2 py-1 text-xs text-gray-500 bg-gray-100 rounded">
          +{rest}
        </span>
      )}
    </div>
  );
};

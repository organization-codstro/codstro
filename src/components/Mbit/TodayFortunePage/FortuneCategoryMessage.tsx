import React from "react";
import { FortuneCategoryMessageProps } from "../../../types/pages/Mbit/TodayFortunePage/FortuneCategoryMessage";

export const FortuneCategoryMessage: React.FC<FortuneCategoryMessageProps> = ({
  message,
}) => {
  if (!message) return null;

  const items = [
    { icon: "☀️", label: "오늘의 하루", content: message.daily },
    { icon: "💬", label: "회의 운세", content: message.meeting },
    { icon: "💻", label: "개발 운세", content: message.development },
  ];

  return (
    <div className="space-y-3">
      {items.map(({ icon, label, content }) =>
        content ? (
          <div
            key={label}
            className="flex items-start gap-3 p-3 bg-white border border-gray-100 rounded-lg"
          >
            <span className="text-base mt-0.5">{icon}</span>
            <div>
              <p className="text-xs font-semibold text-gray-400 mb-0.5">
                {label}
              </p>
              <p className="text-sm leading-relaxed text-gray-600">{content}</p>
            </div>
          </div>
        ) : null,
      )}
    </div>
  );
};

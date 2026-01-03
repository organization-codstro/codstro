import React from "react";

interface CardHeaderProps {
  icon: React.ReactNode;
  title: string;
  badge?: React.ReactNode;
  action?: React.ReactNode;
}

export const CardHeader: React.FC<CardHeaderProps> = ({
  icon,
  title,
  badge,
  action,
}) => {
  return (
    <div className="flex items-start justify-between mb-3">
      <div className="flex items-center gap-3">
        {icon}
        <div className="flex-1">
          <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
          {badge && <div className="mt-1">{badge}</div>}
        </div>
      </div>
      {action}
    </div>
  );
};

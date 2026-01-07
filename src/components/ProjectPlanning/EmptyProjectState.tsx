import { EmptyProjectStateProps } from "../../types/ProjectPlanning/EmptyProjectState";

export const EmptyProjectState = ({
  Icon,
  title,
  description,
  actionLabel,
  onAction,
  colorClass,
  bgColorClass,
}: EmptyProjectStateProps) => (
  <div className="p-12 text-center bg-white border-2 border-gray-300 border-dashed rounded-lg">
    <div
      className={`flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full ${bgColorClass}`}
    >
      <Icon className={`w-8 h-8 ${colorClass}`} />
    </div>
    <h3 className="mb-2 text-lg font-medium text-gray-900">{title}</h3>
    <p className="mb-4 text-gray-600">{description}</p>
    {actionLabel && onAction && (
      <button
        onClick={onAction}
        className="px-6 py-2 font-medium text-white rounded-lg bg-[#587CF0]"
      >
        {actionLabel}
      </button>
    )}
  </div>
);

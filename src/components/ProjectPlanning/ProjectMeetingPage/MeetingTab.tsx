import { MeetingTabProps } from "../../../types/ProjectPlanning/ProjectMeetingPage/MeetingTab";

export const MeetingTab = ({
  label,
  count,
  type,
  selectedType,
  onClick,
}: MeetingTabProps) => {
  const isSelected = selectedType === type;

  return (
    <button
      onClick={() => onClick(type)}
      className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
        isSelected
          ? "text-white"
          : "text-gray-700 bg-gray-100 hover:bg-gray-200"
      }`}
      style={isSelected ? { backgroundColor: "#587CF0" } : {}}
    >
      {label} ({count})
    </button>
  );
};

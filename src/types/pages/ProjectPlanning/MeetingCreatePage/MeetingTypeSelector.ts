export interface MeetingTypeSelectorProps {
  selectedType: "Feature" | "Free" | null;
  onSelect: (type: "Feature" | "Free") => void;
}

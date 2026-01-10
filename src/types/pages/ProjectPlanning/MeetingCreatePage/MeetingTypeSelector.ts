export interface MeetingTypeSelectorProps {
  selectedType: "feature" | "free" | null;
  onSelect: (type: "feature" | "free") => void;
}

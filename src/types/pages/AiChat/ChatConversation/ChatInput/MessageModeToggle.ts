export interface MessageModeToggleProps {
  mode: "CASUAL" | "ACTION_REQUEST";
  onChange: (mode: "CASUAL" | "ACTION_REQUEST") => void;
}

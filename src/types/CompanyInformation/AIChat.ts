export interface AIChatProps {
  isOpen: boolean;
  onClose: () => void;
  conceptName: string;
}

export interface Message {
  id: string;
  sender: "user" | "ai";
  text: string;
  timestamp: Date;
}

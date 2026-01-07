export interface ChatInputProps {
  value: string;
  onChange: (val: string) => void;
  onSend: () => void;
}
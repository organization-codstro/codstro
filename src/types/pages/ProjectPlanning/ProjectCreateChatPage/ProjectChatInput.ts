export interface ProjectChatInputProps {
  input: string;
  setInput: (val: string) => void;
  onSend: () => void;
  onNext: () => void;
  onBack: () => void;
}

export interface EditorPanelProps {
  markdown: string;
  onChange: (value: string) => void;
  chatOpen: boolean;
  isLoading: boolean;
}

export interface NoteCardProps {
  id: string;
  title: string;
  preview: string;
  concepts: string[];
  lastUpdated?: string;
  onClick: (id: string) => void;
}

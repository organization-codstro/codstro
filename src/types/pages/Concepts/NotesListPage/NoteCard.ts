export interface NoteCardProps {
  id: string;
  title: string;
  description: string;
  concepts: string[];
  lastUpdated?: string;
  onClick: (id: string) => void;
}

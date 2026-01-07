export interface LibraryCardProps {
  id: string;
  name: string;
  language: string;
  description: string;
  category: string;
  tags: string[];
  onClick: (id: string) => void;
}

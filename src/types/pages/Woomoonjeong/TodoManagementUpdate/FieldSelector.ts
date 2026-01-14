export interface FieldSelectorProps {
  fields: string[];
  selectedId: string;
  onSelect: (id: string) => void;
}

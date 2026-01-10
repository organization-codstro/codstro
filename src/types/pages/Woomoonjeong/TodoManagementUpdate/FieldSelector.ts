export interface FieldSelectorProps {
  fields: string[];
  selectedId: number;
  onSelect: (id: number) => void;
}



export interface GroupSelectorProps {
  groups: { group_id: string; group_name: string }[]; // string[]에서 객체 배열로 변경
  selectedId: string;
  onSelect: (id: string) => void;
}

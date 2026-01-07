import { Field, Group } from "../woomoonjeong";

export interface FieldItemProps {
  field: Field;
  group: Group;
  isExpanded: boolean;
  onToggle: () => void;
  onSaveName: (groupId: number, fieldId: number, newName: string) => void;
  onDeleteAction: (
    e: React.MouseEvent,
    type: "field" | "pin",
    id: number
  ) => void;
  deletePending: { type: string; id: number } | null;
  onEditPin: (pinId: number) => void;
}

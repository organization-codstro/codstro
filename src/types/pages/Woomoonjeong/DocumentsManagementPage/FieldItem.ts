import { Field, Group } from "../woomoonjeong";

export interface FieldItemProps {
  field: Field;
  group: Group;
  isExpanded: boolean;
  onToggle: () => void;
  onSaveName: (groupId: string, fieldId: string, newName: string) => void;
  onDeleteAction: (
    e: React.MouseEvent,
    type: "field" | "pin",
    id: string
  ) => void;
  deletePending: { type: string; id: string } | null;
  onEditPin: (pinId: string) => void;
}

export interface TodoManagementCreateProps {
  isOpen: boolean;
  onClose: () => void;
  onAdd: () => void;
  availableGroups: { group_id: string; group_name: string }[];
}

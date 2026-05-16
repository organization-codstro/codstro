import { Pin } from "../../../common/TodoManagement";

export interface PinItemProps {
  pin: Pin;
  isDeletePending: boolean;
  onEdit: (e: React.MouseEvent) => void;
  onDelete: (e: React.MouseEvent) => void;
}

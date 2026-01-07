import { Pin } from "../woomoonjeong";

export interface PinItemProps {
  pin: Pin;
  isDeletePending: boolean;
  onEdit: (e: React.MouseEvent) => void;
  onDelete: (e: React.MouseEvent) => void;
}

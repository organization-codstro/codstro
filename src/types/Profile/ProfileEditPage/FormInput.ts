import { LucideIcon } from "lucide-react";

export interface FormInputProps {
  label: string;
  value: string;
  type?: string;
  icon: LucideIcon;
  disabled?: boolean;
  helperText?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

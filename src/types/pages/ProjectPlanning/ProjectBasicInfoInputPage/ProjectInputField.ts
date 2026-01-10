export interface ProjectInputFieldProps {
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  description?: string;
  required?: boolean;
  error?: boolean;
  errorMessage?: string;
  type?: "text" | "textarea";
  rows?: number;
}

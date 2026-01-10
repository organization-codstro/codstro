export interface TodoInputFieldProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<any>) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
}
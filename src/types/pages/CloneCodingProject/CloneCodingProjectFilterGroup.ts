export interface FilterGroupProps<T extends string = string> {
  label: string;
  current: T;
  options: T[];
  onChange: (val: T) => void;
}

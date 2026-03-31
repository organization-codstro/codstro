export type DiffType = "added" | "removed" | "equal";

export interface DiffLine {
  type: DiffType;
  content: string;
  lineNumber?: number;
}
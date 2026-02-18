import { Major } from "../Mbit";

export interface MajorCardProps {
  major: Major;
  onClick: (majorId: string) => void;
}

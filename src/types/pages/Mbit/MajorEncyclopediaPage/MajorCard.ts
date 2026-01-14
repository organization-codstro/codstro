import { Major } from "../Mbit";

export interface MajorCardProps {
  major: Major;
  onClick: (major: Major) => void;
}

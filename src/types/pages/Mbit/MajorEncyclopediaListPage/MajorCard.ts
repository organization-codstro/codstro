import { Major } from "../../../common/Mbit";

export interface MajorCardProps {
  major: Major;
  onClick: (majorId: string) => void;
}

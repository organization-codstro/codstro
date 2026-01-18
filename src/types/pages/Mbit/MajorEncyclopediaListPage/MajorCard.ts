import { Majors } from "../Mbit";

export interface MajorCardProps {
  major: Majors;
  onClick: (majorId: string) => void;
}

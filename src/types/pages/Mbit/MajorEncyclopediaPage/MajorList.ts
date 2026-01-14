import { Major } from "../Mbit";

export interface MajorListProps {
  majors: Major[];
  onSelectMajor: (major: Major) => void;
}

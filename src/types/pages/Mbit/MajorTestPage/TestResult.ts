import { Major } from "../../../common/Mbit";

export interface TestResultProps {
  result: Major;
  onReset: () => void;
}

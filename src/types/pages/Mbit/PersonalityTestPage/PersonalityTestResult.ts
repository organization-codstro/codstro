import { MbitAxisResult, Personality } from "../../../common/Mbit";

export interface PersonalityTestResultProps {
  result: Personality;
  axisResults: MbitAxisResult[];
  onReset: () => void;
}

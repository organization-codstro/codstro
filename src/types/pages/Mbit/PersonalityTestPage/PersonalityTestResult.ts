import { Personality } from "../Mbit";

export interface PersonalityTestResultProps {
  result: Personality;
  onReset: () => void;
}

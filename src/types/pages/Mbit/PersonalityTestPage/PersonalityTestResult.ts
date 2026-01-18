import { PersonalityDetail } from "../Mbit";

export interface PersonalityTestResultProps {
  result: PersonalityDetail;
  onReset: () => void;
}

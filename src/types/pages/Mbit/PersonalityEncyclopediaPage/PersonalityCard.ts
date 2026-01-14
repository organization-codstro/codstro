import { Personality } from "../Mbit";

export interface PersonalityCardProps {
  personality: Personality;
  onClick: (p: Personality) => void;
}

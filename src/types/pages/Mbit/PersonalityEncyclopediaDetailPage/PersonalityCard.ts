import { Personality } from "../Mbit";

export interface PersonalityCardProps {
  personality: Personality;
  onClick: (personalityId: string) => void;
}

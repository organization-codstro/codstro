import { Personality } from "../../../common/Mbit";

export interface PersonalityCardProps {
  personality: Personality;
  onClick: (personalityId: string) => void;
}

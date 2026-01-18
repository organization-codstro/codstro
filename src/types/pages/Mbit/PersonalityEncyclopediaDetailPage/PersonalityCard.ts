import { PersonalityDetail } from "../Mbit";

export interface PersonalityCardProps {
  personality: PersonalityDetail;
  onClick: (personalityId: string) => void;
}

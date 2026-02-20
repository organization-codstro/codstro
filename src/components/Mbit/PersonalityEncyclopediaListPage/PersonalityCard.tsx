import React from "react";
import { PersonalityCardProps } from "../../../types/pages/Mbit/PersonalityEncyclopediaDetailPage/PersonalityCard";

const PersonalityCard: React.FC<PersonalityCardProps> = ({
  personality,
  onClick,
}) => {
  return (
    <div
      onClick={() => onClick(personality.id)}
      className="p-6 pb-3 transition-all transform bg-white shadow-md cursor-pointer rounded-xl hover:shadow-lg hover:-translate-y-1"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="pr-2 text-xl">{personality.code}</div>
        <div>
          <p className="text-sm text-[#587CF0] font-medium">
            {personality.name}
          </p>
        </div>
      </div>
    </div>
  );
};

export default PersonalityCard;

import React from "react";
import { Users } from "lucide-react";
import { PersonalityCardProps } from "../../../types/pages/Mbit/PersonalityEncyclopediaPage/PersonalityCard";

const PersonalityCard: React.FC<PersonalityCardProps> = ({
  personality,
  onClick,
}) => {
  return (
    <div
      onClick={() => onClick(personality)}
      className="p-6 transition-all transform bg-white shadow-md cursor-pointer rounded-xl hover:shadow-lg hover:-translate-y-1"
    >
      <div className="flex items-center gap-3 mb-4">
        <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gradient-to-br from-blue-500 to-purple-500">
          <Users className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-800">
            {personality.type}
          </h3>
          <p className="text-sm text-[#587CF0] font-medium">
            {personality.name}
          </p>
        </div>
      </div>
      <p className="text-gray-600 line-clamp-2">{personality.description}</p>
    </div>
  );
};

export default PersonalityCard;

import React from "react";
import { Users } from "lucide-react";
import { PersonalityDetailHeaderProps } from "../../../types/pages/Mbit/PersonalityEncyclopediaPage/PersonalityDetailHeader";

const PersonalityDetailHeader: React.FC<PersonalityDetailHeaderProps> = ({
  personality,
}) => {
  return (
    <div className="p-8 text-white bg-gradient-to-r from-blue-500 to-purple-500">
      <div className="flex items-center gap-4 mb-4">
        <div className="flex items-center justify-center w-16 h-16 bg-white rounded-full bg-opacity-20">
          <Users className="w-8 h-8" />
        </div>
        <div>
          <h1 className="text-4xl font-bold">{personality.type}</h1>
          <p className="text-xl text-white text-opacity-90">
            {personality.name}
          </p>
        </div>
      </div>
      <p className="text-lg text-white text-opacity-90">
        {personality.description}
      </p>
    </div>
  );
};

export default PersonalityDetailHeader;

import React, { useState } from "react";
import { personalities } from "../../data/Mbit/personalityData";
import PersonalityDetail from "../../components/Mbit/PersonalityEncyclopediaPage/PersonalityDetail";
import PersonalityCard from "../../components/Mbit/PersonalityEncyclopediaPage/PersonalityCard";
import { Personality } from "../../types/Mbit/Mbit";

const PersonalityEncyclopedia: React.FC = () => {
  const [selectedPersonality, setSelectedPersonality] =
    useState<Personality | null>(null);

  return (
    <div className="flex-1 min-h-screen p-8 bg-gray-50">
      {selectedPersonality ? (
        /* 1. 상세 정보 화면 */
        <PersonalityDetail
          personality={selectedPersonality}
          onBack={() => setSelectedPersonality(null)}
        />
      ) : (
        /* 2. 전체 목록 화면 */
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="mb-2 text-3xl font-bold text-gray-800">
              Personality Encyclopedia
            </h1>
            <p className="text-gray-600">Explore all MBIT personality types</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {personalities.map((personality) => (
              <PersonalityCard
                key={personality.id}
                personality={personality}
                onClick={(p) => setSelectedPersonality(p)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default PersonalityEncyclopedia;

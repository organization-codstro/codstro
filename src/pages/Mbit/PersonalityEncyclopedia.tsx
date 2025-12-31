import React, { useState } from "react";
import {
  Users,
  ArrowLeft,
  TrendingUp,
  AlertCircle,
  Briefcase,
  Target,
} from "lucide-react";
import { personalities, Personality } from "../../data/Mbit/personalityData";

const PersonalityEncyclopedia: React.FC = () => {
  const [selectedPersonality, setSelectedPersonality] =
    useState<Personality | null>(null);

  if (selectedPersonality) {
    return (
      <div className="flex-1 p-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => setSelectedPersonality(null)}
            className="flex items-center gap-2 text-[#587CF0] hover:text-[#4A6EE8] mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Encyclopedia</span>
          </button>

          <div className="overflow-hidden bg-white shadow-xl rounded-2xl">
            <div className="p-8 text-white bg-gradient-to-r from-blue-500 to-purple-500">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center justify-center w-16 h-16 bg-white rounded-full bg-opacity-20">
                  <Users className="w-8 h-8" />
                </div>
                <div>
                  <h1 className="text-4xl font-bold">
                    {selectedPersonality.type}
                  </h1>
                  <p className="text-xl text-white text-opacity-90">
                    {selectedPersonality.name}
                  </p>
                </div>
              </div>
              <p className="text-lg text-white text-opacity-90">
                {selectedPersonality.description}
              </p>
            </div>

            <div className="p-8 space-y-8">
              <div>
                <h2 className="mb-4 text-2xl font-bold text-gray-800">
                  About This Type
                </h2>
                <p className="leading-relaxed text-gray-700">
                  {selectedPersonality.detailedDescription}
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="p-6 bg-green-50 rounded-xl">
                  <h3 className="flex items-center gap-2 mb-4 text-xl font-bold text-gray-800">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    Strengths
                  </h3>
                  <ul className="space-y-2">
                    {selectedPersonality.strengths.map((strength, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-gray-700"
                      >
                        <span className="mt-1 text-green-600">•</span>
                        <span>{strength}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="p-6 bg-orange-50 rounded-xl">
                  <h3 className="flex items-center gap-2 mb-4 text-xl font-bold text-gray-800">
                    <AlertCircle className="w-5 h-5 text-orange-600" />
                    Areas to Improve
                  </h3>
                  <ul className="space-y-2">
                    {selectedPersonality.weaknesses.map((weakness, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-2 text-gray-700"
                      >
                        <span className="mt-1 text-orange-600">•</span>
                        <span>{weakness}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="p-6 bg-blue-50 rounded-xl">
                <h3 className="flex items-center gap-2 mb-4 text-xl font-bold text-gray-800">
                  <Briefcase className="w-5 h-5 text-blue-600" />
                  Work Style
                </h3>
                <p className="text-gray-700">{selectedPersonality.workStyle}</p>
              </div>

              <div>
                <h3 className="flex items-center gap-2 mb-4 text-xl font-bold text-gray-800">
                  <Target className="h-5 w-5 text-[#587CF0]" />
                  Ideal Projects
                </h3>
                <div className="grid gap-3 md:grid-cols-2">
                  {selectedPersonality.idealProjects.map((project, index) => (
                    <div
                      key={index}
                      className="p-4 text-gray-700 rounded-lg bg-purple-50"
                    >
                      {project}
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl">
                <h3 className="mb-4 text-xl font-bold text-gray-800">
                  Famous Developers
                </h3>
                <div className="flex flex-wrap gap-3">
                  {selectedPersonality.famousDevelopers.map((dev, index) => (
                    <div
                      key={index}
                      className="px-4 py-2 font-medium text-gray-700 bg-white rounded-lg shadow-sm"
                    >
                      {dev}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="flex-1 p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-gray-800">
            Personality Encyclopedia
          </h1>
          <p className="text-gray-600">Explore all MBIT personality types</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {personalities.map((personality) => (
            <div
              key={personality.id}
              onClick={() => setSelectedPersonality(personality)}
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
              <p className="text-gray-600">{personality.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PersonalityEncyclopedia;

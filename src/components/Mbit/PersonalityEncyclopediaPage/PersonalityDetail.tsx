import React from "react";
import {
  ArrowLeft,
  TrendingUp,
  AlertCircle,
  Briefcase,
  Target,
} from "lucide-react";
import PersonalityDetailHeader from "./PersonalityDetailHeader";
import TraitList from "./TraitList";
import { Personality } from "../../../data/Mbit/personalityData";

interface PersonalityDetailProps {
  personality: Personality;
  onBack: () => void;
}

const PersonalityDetail: React.FC<PersonalityDetailProps> = ({
  personality,
  onBack,
}) => {
  return (
    <div className="max-w-4xl mx-auto">
      <button
        onClick={onBack}
        className="flex items-center gap-2 text-[#587CF0] hover:text-[#4A6EE8] mb-6 transition-colors"
      >
        <ArrowLeft className="w-5 h-5" />
        <span className="font-medium">Back to Encyclopedia</span>
      </button>

      <div className="overflow-hidden bg-white shadow-xl rounded-2xl">
        <PersonalityDetailHeader personality={personality} />

        <div className="p-8 space-y-8">
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-800">
              About This Type
            </h2>
            <p className="leading-relaxed text-gray-700">
              {personality.detailedDescription}
            </p>
          </section>

          <div className="grid gap-6 md:grid-cols-2">
            <TraitList
              title="Strengths"
              items={personality.strengths}
              icon={<TrendingUp className="w-5 h-5 text-green-600" />}
              bgColor="bg-green-50"
              bulletColor="text-green-600"
            />
            <TraitList
              title="Areas to Improve"
              items={personality.weaknesses}
              icon={<AlertCircle className="w-5 h-5 text-orange-600" />}
              bgColor="bg-orange-50"
              bulletColor="text-orange-600"
            />
          </div>

          <section className="p-6 bg-blue-50 rounded-xl">
            <h3 className="flex items-center gap-2 mb-4 text-xl font-bold text-gray-800">
              <Briefcase className="w-5 h-5 text-blue-600" />
              Work Style
            </h3>
            <p className="text-gray-700">{personality.workStyle}</p>
          </section>

          <section>
            <h3 className="flex items-center gap-2 mb-4 text-xl font-bold text-gray-800">
              <Target className="h-5 w-5 text-[#587CF0]" />
              Ideal Projects
            </h3>
            <div className="grid gap-3 md:grid-cols-2">
              {personality.idealProjects.map((project, index) => (
                <div
                  key={index}
                  className="p-4 text-gray-700 rounded-lg bg-purple-50"
                >
                  {project}
                </div>
              ))}
            </div>
          </section>

          <section className="p-6 bg-gradient-to-r from-purple-50 to-blue-50 rounded-xl">
            <h3 className="mb-4 text-xl font-bold text-gray-800">
              Famous Developers
            </h3>
            <div className="flex flex-wrap gap-3">
              {personality.famousDevelopers.map((dev, index) => (
                <div
                  key={index}
                  className="px-4 py-2 font-medium text-gray-700 bg-white rounded-lg shadow-sm"
                >
                  {dev}
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default PersonalityDetail;

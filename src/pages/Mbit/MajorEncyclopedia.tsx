import React, { useState } from "react";
import {
  ArrowLeft,
  BookOpen,
  TrendingUp,
  DollarSign,
  Building2,
  MapPin,
} from "lucide-react";
import { majors, Major } from "../../data/Mbit/majorData";

const MajorEncyclopedia: React.FC = () => {
  const [selectedMajor, setSelectedMajor] = useState<Major | null>(null);

  if (selectedMajor) {
    const IconComponent = selectedMajor.icon;
    return (
      <div className="flex-1 p-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <button
            onClick={() => setSelectedMajor(null)}
            className="flex items-center gap-2 text-[#587CF0] hover:text-[#4A6EE8] mb-6 transition-colors"
          >
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Encyclopedia</span>
          </button>

          <div className="overflow-hidden bg-white shadow-xl rounded-2xl">
            <div
              className={`bg-gradient-to-r ${selectedMajor.color} p-8 text-white`}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center justify-center w-16 h-16 bg-white rounded-full bg-opacity-20">
                  <IconComponent className="w-8 h-8" />
                </div>
                <h1 className="text-4xl font-bold">{selectedMajor.name}</h1>
              </div>
              <p className="text-lg text-white text-opacity-90">
                {selectedMajor.description}
              </p>
            </div>

            <div className="p-8 space-y-8">
              <div>
                <h2 className="mb-4 text-2xl font-bold text-gray-800">
                  About This Field
                </h2>
                <p className="leading-relaxed text-gray-700">
                  {selectedMajor.detailedDescription}
                </p>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="p-6 bg-blue-50 rounded-xl">
                  <h3 className="flex items-center gap-2 mb-4 text-xl font-bold text-gray-800">
                    <DollarSign className="w-5 h-5 text-blue-600" />
                    Salary Range
                  </h3>
                  <p className="text-2xl font-bold text-[#587CF0]">
                    {selectedMajor.salaryRange}
                  </p>
                  <p className="mt-2 text-sm text-gray-600">
                    Annual salary in USD
                  </p>
                </div>

                <div className="p-6 bg-green-50 rounded-xl">
                  <h3 className="flex items-center gap-2 mb-4 text-xl font-bold text-gray-800">
                    <TrendingUp className="w-5 h-5 text-green-600" />
                    Job Outlook
                  </h3>
                  <p className="text-lg font-semibold text-gray-700">
                    {selectedMajor.jobOutlook}
                  </p>
                </div>
              </div>

              <div>
                <h3 className="flex items-center gap-2 mb-4 text-xl font-bold text-gray-800">
                  <BookOpen className="h-5 w-5 text-[#587CF0]" />
                  Key Skills Required
                </h3>
                <div className="grid gap-3 md:grid-cols-2">
                  {selectedMajor.keySkills.map((skill, index) => (
                    <div
                      key={index}
                      className="p-3 text-gray-700 rounded-lg bg-purple-50"
                    >
                      <span className="text-[#587CF0] font-bold mr-2">•</span>
                      {skill}
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
                <h3 className="flex items-center gap-2 mb-4 text-xl font-bold text-gray-800">
                  <MapPin className="h-5 w-5 text-[#587CF0]" />
                  Learning Path
                </h3>
                <ol className="space-y-3">
                  {selectedMajor.learningPath.map((step, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <span className="flex-shrink-0 w-8 h-8 bg-[#587CF0] text-white rounded-full flex items-center justify-center font-bold text-sm">
                        {index + 1}
                      </span>
                      <span className="pt-1 text-gray-700">{step}</span>
                    </li>
                  ))}
                </ol>
              </div>

              <div>
                <h3 className="flex items-center gap-2 mb-4 text-xl font-bold text-gray-800">
                  <Building2 className="h-5 w-5 text-[#587CF0]" />
                  Famous Companies Hiring
                </h3>
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
                  {selectedMajor.famousCompanies.map((company, index) => (
                    <div
                      key={index}
                      className="bg-white border-2 border-gray-200 rounded-lg p-4 text-center font-semibold text-gray-700 hover:border-[#587CF0] transition-colors"
                    >
                      {company}
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-6 bg-yellow-50 rounded-xl">
                <h3 className="mb-4 text-xl font-bold text-gray-800">
                  A Day in the Life
                </h3>
                <ul className="space-y-2">
                  {selectedMajor.dayInLife.map((activity, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-3 text-gray-700"
                    >
                      <span className="mt-1 text-yellow-600">•</span>
                      <span>{activity}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
                <h3 className="mb-3 text-xl font-bold text-gray-800">
                  Core Technologies
                </h3>
                <p className="mb-3 text-gray-700">{selectedMajor.focus}</p>
                <h3 className="mt-4 mb-3 text-xl font-bold text-gray-800">
                  Career Opportunities
                </h3>
                <p className="text-gray-700">{selectedMajor.careers}</p>
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
            Major Encyclopedia
          </h1>
          <p className="text-gray-600">Explore different tech career paths</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {majors.map((major) => {
            const IconComponent = major.icon;
            return (
              <div
                key={major.id}
                onClick={() => setSelectedMajor(major)}
                className="overflow-hidden transition-all transform bg-white shadow-md cursor-pointer rounded-xl hover:shadow-lg hover:-translate-y-1"
              >
                <div className={`bg-gradient-to-r ${major.color} p-6`}>
                  <div className="flex items-center gap-4 mb-3">
                    <div className="flex items-center justify-center bg-white rounded-lg w-14 h-14 bg-opacity-20">
                      <IconComponent className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-white">
                      {major.name}
                    </h3>
                  </div>
                  <p className="text-white text-opacity-90">
                    {major.description}
                  </p>
                </div>

                <div className="p-6 space-y-4">
                  <div>
                    <h4 className="mb-2 font-semibold text-gray-800">
                      Key Technologies:
                    </h4>
                    <p className="text-sm text-gray-600">{major.focus}</p>
                  </div>
                  <div>
                    <h4 className="mb-2 font-semibold text-gray-800">
                      Career Paths:
                    </h4>
                    <p className="text-sm text-gray-600">{major.careers}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MajorEncyclopedia;

import React from "react";
import { ArrowLeft, BookOpen, Building2, MapPin } from "lucide-react";
import MajorDetailHeader from "./MajorDetailHeader";
import MajorStats from "./MajorStats";
import { MajorDetailProps } from "../../../types/pages/Mbit/MajorEncyclopediaPage/MajorDetail";

const MajorDetail: React.FC<MajorDetailProps> = ({ major, onBack }) => {
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
        <MajorDetailHeader major={major} />

        <div className="p-8 space-y-8">
          {/* About Section */}
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-800">
              About This Field
            </h2>
            <p className="leading-relaxed text-gray-700">
              {major.detailedDescription}
            </p>
          </section>

          {/* Stats Section */}
          <MajorStats
            salaryRange={major.salaryRange}
            jobOutlook={major.jobOutlook}
          />

          {/* Skills Section */}
          <section>
            <h3 className="flex items-center gap-2 mb-4 text-xl font-bold text-gray-800">
              <BookOpen className="h-5 w-5 text-[#587CF0]" />
              Key Skills Required
            </h3>
            <div className="grid gap-3 md:grid-cols-2">
              {major.keySkills.map((skill, index) => (
                <div
                  key={index}
                  className="p-3 text-gray-700 rounded-lg bg-purple-50"
                >
                  <span className="text-[#587CF0] font-bold mr-2">•</span>
                  {skill}
                </div>
              ))}
            </div>
          </section>

          {/* Learning Path Section */}
          <section className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl">
            <h3 className="flex items-center gap-2 mb-4 text-xl font-bold text-gray-800">
              <MapPin className="h-5 w-5 text-[#587CF0]" />
              Learning Path
            </h3>
            <ol className="space-y-3">
              {major.learningPath.map((step, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="flex-shrink-0 w-8 h-8 bg-[#587CF0] text-white rounded-full flex items-center justify-center font-bold text-sm">
                    {index + 1}
                  </span>
                  <span className="pt-1 text-gray-700">{step}</span>
                </li>
              ))}
            </ol>
          </section>

          {/* Companies Section */}
          <section>
            <h3 className="flex items-center gap-2 mb-4 text-xl font-bold text-gray-800">
              <Building2 className="h-5 w-5 text-[#587CF0]" />
              Famous Companies Hiring
            </h3>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-3">
              {major.famousCompanies.map((company, index) => (
                <div
                  key={index}
                  className="bg-white border-2 border-gray-200 rounded-lg p-4 text-center font-semibold text-gray-700 hover:border-[#587CF0] transition-colors"
                >
                  {company}
                </div>
              ))}
            </div>
          </section>

          {/* Day in the Life Section */}
          <section className="p-6 bg-yellow-50 rounded-xl">
            <h3 className="mb-4 text-xl font-bold text-gray-800">
              A Day in the Life
            </h3>
            <ul className="space-y-2">
              {major.dayInLife.map((activity, index) => (
                <li
                  key={index}
                  className="flex items-start gap-3 text-gray-700"
                >
                  <span className="mt-1 text-yellow-600">•</span>
                  <span>{activity}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Footer Info Section */}
          <section className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl">
            <h3 className="mb-3 text-xl font-bold text-gray-800">
              Core Technologies
            </h3>
            <p className="mb-3 text-gray-700">{major.focus}</p>
            <h3 className="mt-4 mb-3 text-xl font-bold text-gray-800">
              Career Opportunities
            </h3>
            <p className="text-gray-700">{major.careers}</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default MajorDetail;

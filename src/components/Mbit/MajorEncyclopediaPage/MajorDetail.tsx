import React from "react";
import { ArrowLeft } from "lucide-react";
import MajorDetailHeader from "./MajorDetailHeader";
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
            <p className="leading-relaxed text-gray-700">{major.description}</p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default MajorDetail;

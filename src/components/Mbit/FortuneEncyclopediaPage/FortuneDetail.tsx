import React from "react";
import { ArrowLeft } from "lucide-react";
import DetailHeader from "./DetailHeader";
import { Fortune } from "../../../data/Mbit/fortuneData";

interface FortuneDetailProps {
  fortune: Fortune;
  onBack: () => void;
}

const FortuneDetail: React.FC<FortuneDetailProps> = ({ fortune, onBack }) => {
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
        <DetailHeader fortune={fortune} />

        <div className="p-8 space-y-8">
          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-800">Summary</h2>
            <p className="leading-relaxed text-gray-700">{fortune.summary}</p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-800">
              Description
            </h2>
            <p className="leading-relaxed text-gray-700">
              {fortune.description}
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-bold text-gray-800">
              Category Message
            </h2>
            <pre className="font-sans leading-relaxed text-gray-700 whitespace-pre-wrap">
              {fortune.categoryMessage}
            </pre>
          </section>
        </div>
      </div>
    </div>
  );
};

export default FortuneDetail;

import React from "react";
import MajorCard from "./MajorCard";
import { Major } from "../../../data/Mbit/majorData";

interface MajorListProps {
  majors: Major[];
  onSelectMajor: (major: Major) => void;
}

const MajorList: React.FC<MajorListProps> = ({ majors, onSelectMajor }) => {
  return (
    <div className="max-w-6xl mx-auto">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-gray-800">Major Encyclopedia</h1>
        <p className="text-gray-600">Explore different tech career paths</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        {majors.map((major) => (
          <MajorCard 
            key={major.id} 
            major={major} 
            onClick={onSelectMajor} 
          />
        ))}
      </div>
    </div>
  );
};

export default MajorList;
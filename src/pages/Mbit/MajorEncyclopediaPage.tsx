import React, { useState } from "react";
import { majors } from "../../data/Mbit/majorData";
import MajorDetail from "../../components/Mbit/MajorEncyclopediaPage/MajorDetail";
import MajorList from "../../components/Mbit/MajorEncyclopediaPage/MajorList";
import { Major } from "../../types/Mbit/Mbit";


const MajorEncyclopedia: React.FC = () => {
  const [selectedMajor, setSelectedMajor] = useState<Major | null>(null);

  return (
    <div className="flex-1 p-8 bg-gray-50">
      {selectedMajor ? (
        /* 상세 정보 모드 */
        <MajorDetail
          major={selectedMajor}
          onBack={() => setSelectedMajor(null)}
        />
      ) : (
        /* 목록 모드 */
        <MajorList
          majors={majors}
          onSelectMajor={(major) => setSelectedMajor(major)}
        />
      )}
    </div>
  );
};

export default MajorEncyclopedia;

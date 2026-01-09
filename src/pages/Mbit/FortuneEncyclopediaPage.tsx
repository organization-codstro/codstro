import React, { useState } from "react";
import { fortunes } from "../../data/Mbit/fortuneData";
import FortuneDetail from "../../components/Mbit/FortuneEncyclopediaPage/FortuneDetail";
import FortuneList from "../../components/Mbit/FortuneEncyclopediaPage/FortuneList";
import { Fortune } from "../../types/Mbit/Mbit";


const FortuneEncyclopedia: React.FC = () => {
  const [selectedFortune, setSelectedFortune] = useState<Fortune | null>(null);

  return (
    <div className="flex-1 p-8 bg-gray-50">
      {selectedFortune ? (
        /* 상세 페이지 모드 */
        <FortuneDetail
          fortune={selectedFortune} 
          onBack={() => setSelectedFortune(null)} 
        />
      ) : (
        /* 리스트 페이지 모드 */
        <FortuneList
          fortunes={fortunes} 
          onSelectFortune={(fortune) => setSelectedFortune(fortune)} 
        />
      )}
    </div>
  );
};

export default FortuneEncyclopedia;
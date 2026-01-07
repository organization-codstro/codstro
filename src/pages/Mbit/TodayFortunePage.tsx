import React, { useState } from "react";
import { fortunes } from "../../data/Mbit/fortuneData";
import FortuneDrawIntro from "../../components/Mbit/TodayFortunePage/FortuneDrawIntro";
import FortuneResultCard from "../../components/Mbit/TodayFortunePage/FortuneResultCard";
import FortuneActionButtons from "../../components/Mbit/TodayFortunePage/FortuneActionButtons";


const TodayFortune: React.FC = () => {
  const [currentFortune, setCurrentFortune] = useState<
    (typeof fortunes)[0] | null
  >(null);
  const [isDrawing, setIsDrawing] = useState(false);

  // 운세를 뽑는 핵심 로직 (1초의 딜레이 부여)
  const drawFortune = () => {
    setIsDrawing(true);
    setTimeout(() => {
      const randomFortune =
        fortunes[Math.floor(Math.random() * fortunes.length)];
      setCurrentFortune(randomFortune);
      setIsDrawing(false);
    }, 1000);
  };

  return (
    <div className="flex-1 min-h-screen p-8 bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <div className="max-w-3xl mx-auto">
        {!currentFortune ? (
          /* 1. 운세 뽑기 전 화면 */
          <FortuneDrawIntro onDraw={drawFortune} isDrawing={isDrawing} />
        ) : (
          /* 2. 운세 결과 화면 */
          <div className="space-y-6">
            <FortuneResultCard fortune={currentFortune} />
            <FortuneActionButtons onDraw={drawFortune} isDrawing={isDrawing} />
          </div>
        )}
      </div>
    </div>
  );
};

export default TodayFortune;

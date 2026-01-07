import React, { useState } from "react";
import { majorTestQuestions } from "../../data/Mbit/majorTestQuestionData";
import TestIntro from "../../components/Mbit/MajorTestPage/TestIntro";
import TestResult from "../../components/Mbit/MajorTestPage/TestResult";
import TestProgress from "../../components/Mbit/MajorTestPage/TestProgress";
import TestQuestion from "../../components/Mbit/MajorTestPage/TestQuestion";

const MajorTest: React.FC = () => {
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [majorScores, setMajorScores] = useState<Record<string, number>>({});
  const [result, setResult] = useState<string | null>(null);

  // 답변 클릭 시 점수 계산 및 다음 단계 이동 로직
  const handleAnswer = (major: string) => {
    const newScores = { ...majorScores };
    newScores[major] = (newScores[major] || 0) + 1;
    setMajorScores(newScores);

    if (currentQuestion < majorTestQuestions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // 최고 점수를 받은 전공 계산
      const topMajor = Object.entries(newScores).reduce((a, b) =>
        a[1] > b[1] ? a : b
      )[0];
      setResult(topMajor);
    }
  };

  // 테스트 초기화 로직
  const resetTest = () => {
    setStarted(false);
    setCurrentQuestion(0);
    setMajorScores({});
    setResult(null);
  };

  return (
    <div className="flex-1 min-h-screen p-8 bg-gradient-to-br from-green-50 via-teal-50 to-blue-50">
      {!started ? (
        /* 1. 시작 화면 */
        <TestIntro onStart={() => setStarted(true)} />
      ) : result ? (
        /* 2. 결과 화면 */
        <TestResult result={result} onReset={resetTest} />
      ) : (
        /* 3. 테스트 진행 화면 */
        <>
          <TestProgress
            current={currentQuestion}
            total={majorTestQuestions.length}
          />
          <TestQuestion
            question={majorTestQuestions[currentQuestion].question}
            options={majorTestQuestions[currentQuestion].options}
            onAnswer={handleAnswer}
          />
        </>
      )}
    </div>
  );
};

export default MajorTest;

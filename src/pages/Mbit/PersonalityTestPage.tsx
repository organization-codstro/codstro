import React, { useState } from "react";
import { personalityTestQuestionData } from "../../data/Mbit/personalityTestQuestionData";
import PersonalityTestIntro from "../../components/Mbit/PersonalityTestPage/PersonalityTestIntro";
import PersonalityTestResult from "../../components/Mbit/PersonalityTestPage/PersonalityTestResult";
import PersonalityTestQuestion from "../../components/Mbit/PersonalityTestPage/PersonalityTestQuestion";
import PersonalityTestProgress from "../../components/Mbit/PersonalityTestPage/PersonalityTestProgress";


const PersonalityTest: React.FC = () => {
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [result, setResult] = useState<string | null>(null);

  // 답변을 선택했을 때 실행되는 로직
  const handleAnswer = (type: string) => {
    const newAnswers = [...answers, type];
    setAnswers(newAnswers);

    if (currentQuestion < personalityTestQuestionData.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // MBIT 타입 결정 (선택된 문자열들을 합침)
      const personalityType = newAnswers.join("");
      setResult(personalityType);
    }
  };

  // 테스트 초기화
  const resetTest = () => {
    setStarted(false);
    setCurrentQuestion(0);
    setAnswers([]);
    setResult(null);
  };

  return (
    <div className="flex-1 min-h-screen p-8 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {!started ? (
        /* 1. 시작 화면 */
        <PersonalityTestIntro onStart={() => setStarted(true)} />
      ) : result ? (
        /* 2. 결과 화면 */
        <PersonalityTestResult result={result} onReset={resetTest} />
      ) : (
        /* 3. 질문 진행 화면 */
        <>
          <PersonalityTestProgress
            current={currentQuestion}
            total={personalityTestQuestionData.length}
          />
          <PersonalityTestQuestion
            question={personalityTestQuestionData[currentQuestion].question}
            options={personalityTestQuestionData[currentQuestion].options}
            onAnswer={handleAnswer}
          />
        </>
      )}
    </div>
  );
};

export default PersonalityTest;

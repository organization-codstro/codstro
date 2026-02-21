import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { MbitAxisCode } from "../../data/Mbit/personalityTestQuestionData";
import PersonalityTestIntro from "../../components/Mbit/PersonalityTestPage/PersonalityTestIntro";
import PersonalityTestResult from "../../components/Mbit/PersonalityTestPage/PersonalityTestResult";
import PersonalityTestProgress from "../../components/Mbit/PersonalityTestPage/PersonalityTestProgress";
import TestQuestion from "../../components/Mbit/MajorTestPage/TestQuestion";
import { PersonalityTestService } from "../../api/Mbit/PersonalityTestPage";
import { Personality } from "../../types/common/Mbit";

export default function PersonalityTestPage() {
  const [questions, setQuestions] = useState<any[]>([]);
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [traitScores, setTraitScores] = useState<Record<MbitAxisCode, number>>(
    {} as Record<MbitAxisCode, number>,
  );
  const [resultData, setResultData] = useState<Personality | null>(null);
  const [loading, setLoading] = useState(true);

  // 1. 질문지 로드
  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const data = await PersonalityTestService.getMbitQuestions();
        setQuestions(data);
      } catch (error) {
        toast.error("질문지를 불러오는 데 실패했습니다.");
      } finally {
        setLoading(false);
      }
    };
    loadQuestions();
  }, []);

  // 2. 답변 처리 및 결과 산출
  const handleAnswer = async (selectedValue: number) => {
    const currentQ = questions[currentQuestion];
    const trait = currentQ.mbit_questions_trait as MbitAxisCode;

    const newScores = { ...traitScores };
    newScores[trait] = (newScores[trait] || 0) + selectedValue;
    setTraitScores(newScores);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // 결과 코드 생성 로직
      const pick = (a: MbitAxisCode, b: MbitAxisCode) =>
        (newScores[a] || 0) >= (newScores[b] || 0) ? a : b;

      const finalCode = [
        pick("E", "P"),
        pick("C", "R"),
        pick("L", "V"),
        pick("B", "A"),
      ].join("");

      // Toastify 로딩과 함께 결과 데이터 가져오기
      await toast.promise(
        async () => {
          const detail =
            await PersonalityTestService.getPersonalityByCode(finalCode);
          if (!detail) throw new Error("결과를 찾을 수 없습니다.");
          setResultData(detail);
        },
        {
          pending: "당신의 개발 성격을 분석 중입니다...",
          success: "분석이 완료되었습니다!",
          error: "분석 중 오류가 발생했습니다.",
        },
      );
    }
  };

  const resetTest = () => {
    setStarted(false);
    setCurrentQuestion(0);
    setTraitScores({} as Record<MbitAxisCode, number>);
    setResultData(null);
  };

  if (loading)
    return (
      <div className="flex items-center justify-center flex-1">로드 중...</div>
    );

  return (
    <div className="flex-1 min-h-screen p-8 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {!started ? (
        <PersonalityTestIntro onStart={() => setStarted(true)} />
      ) : resultData ? (
        <PersonalityTestResult result={resultData} onReset={resetTest} />
      ) : (
        <>
          <PersonalityTestProgress
            current={currentQuestion}
            total={questions.length}
          />
          <TestQuestion
            content={questions[currentQuestion].mbit_questions_content}
            scale={questions[currentQuestion].mbit_questions_score_value}
            onAnswer={handleAnswer}
          />
        </>
      )}
    </div>
  );
}

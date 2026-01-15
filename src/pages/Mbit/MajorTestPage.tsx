import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Major } from "../../types/api/Mbit/MajorTestPage";
import TestIntro from "../../components/Mbit/MajorTestPage/TestIntro";
import TestResult from "../../components/Mbit/MajorTestPage/TestResult";
import TestProgress from "../../components/Mbit/MajorTestPage/TestProgress";
import TestQuestion from "../../components/Mbit/MajorTestPage/TestQuestion";
import { MajorTestService } from "../../api/Mbit/MajorTestPage";

export default function MajorTestPage() {
  const [questions, setQuestions] = useState<any[]>([]);
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [majorScores, setMajorScores] = useState<Record<string, number>>({});
  const [resultData, setResultData] = useState<Major | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const data = await MajorTestService.getMajorTestQuestions();
        setQuestions(data);
      } catch (error) {
        toast.error("질문지를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };
    loadQuestions();
  }, []);

  const handleAnswer = async (selectedValue: number) => {
    const trait = questions[currentQuestion].major_question_trait;
    const newScores = {
      ...majorScores,
      [trait]: (majorScores[trait] || 0) + selectedValue,
    };
    setMajorScores(newScores);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // 1. 최고 점수 전공 계산
      const entries = Object.entries(majorScores) as [string, number][];

      if (entries.length === 0) return; // 안전장치

      const topMajorTrait = entries.reduce((a, b) => (a[1] > b[1] ? a : b))[0];

      // 2. Toastify 로딩 및 결과 조회 동시 처리
      await toast.promise(
        async () => {
          const detail = await MajorTestService.getMajorDetailByTrait(
            topMajorTrait
          );
          if (!detail) throw new Error("데이터를 찾을 수 없습니다.");
          setResultData(detail);
        },
        {
          pending: "결과를 분석하고 저장 중입니다...",
          success: "분석 완료! 결과를 확인하세요.",
          error: "결과를 가져오는 중 오류가 발생했습니다.",
        }
      );
    }
  };

  const resetTest = () => {
    setStarted(false);
    setCurrentQuestion(0);
    setMajorScores({});
    setResultData(null);
  };

  if (loading)
    return (
      <div className="flex-1 flex items-center justify-center">Loading...</div>
    );

  return (
    <div className="flex-1 min-h-screen p-8 bg-gradient-to-br from-green-50 via-teal-50 to-blue-50">
      {!started ? (
        <TestIntro onStart={() => setStarted(true)} />
      ) : resultData ? (
        <TestResult result={resultData} onReset={resetTest} />
      ) : (
        <>
          <TestProgress current={currentQuestion} total={questions.length} />
          <TestQuestion
            content={questions[currentQuestion].major_question_content}
            scale={questions[currentQuestion].major_question_score_value}
            onAnswer={handleAnswer}
          />
        </>
      )}
    </div>
  );
}

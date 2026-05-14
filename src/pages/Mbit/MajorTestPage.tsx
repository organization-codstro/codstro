import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { TestIntro } from "../../components/Mbit/MajorTestPage/TestIntro";
import { TestResult } from "../../components/Mbit/MajorTestPage/TestResult";
import { TestProgress } from "../../components/Mbit/MajorTestPage/TestProgress";
import { MajorTestQuestion } from "../../components/Mbit/TestQuestion";
import { MajorTestService } from "../../api/Mbit/MajorTestPage";
import { Major, MajorTestQuestionRow } from "../../types/common/Mbit";

export default function MajorTestPage() {
  const [questions, setQuestions] = useState<MajorTestQuestionRow[]>([]);
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]);
  const [resultData, setResultData] = useState<Major | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const data = await MajorTestService.getMajorTestQuestions();
        setQuestions(data);
        setAnswers(new Array(data.length).fill(null));
      } catch (error) {
        toast.error("질문지를 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };
    loadQuestions();
  }, []);

  const allAnswered = answers.every((a) => a !== null);

  const handleAnswer = (selectedValue: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = selectedValue;
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleSubmit = async () => {
    if (!allAnswered) return;

    // 전공별 점수 합산
    const newScores: Record<string, number> = {};
    questions.forEach((q, idx) => {
      const trait = q.major_question_trait;
      newScores[trait] = (newScores[trait] || 0) + (answers[idx] ?? 0);
    });

    // 최고 점수 전공 계산
    const entries = Object.entries(newScores) as [string, number][];
    if (entries.length === 0) return;

    const topMajorTrait = entries.reduce((a, b) => (a[1] > b[1] ? a : b))[0];

    await toast.promise(
      async () => {
        const detail =
          await MajorTestService.getMajorDetailByTrait(topMajorTrait);
        if (!detail) throw new Error("데이터를 찾을 수 없습니다.");
        setResultData(detail);
      },
      {
        pending: "결과를 분석하고 저장 중입니다...",
        success: "분석 완료! 결과를 확인하세요.",
        error: "결과를 가져오는 중 오류가 발생했습니다.",
      },
    );
  };

  const resetTest = () => {
    setStarted(false);
    setCurrentQuestion(0);
    setAnswers(new Array(questions.length).fill(null));
    setResultData(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center flex-1 min-h-screen p-8 bg-gradient-to-br from-green-50 via-teal-50 to-blue-50" />
    );
  }

  return (
    <div className="flex items-center justify-center flex-1 min-h-screen p-8 bg-gradient-to-br from-green-50 via-teal-50 to-blue-50">
      <div className="w-full max-w-5xl">
        {!started ? (
          <TestIntro onStart={() => setStarted(true)} />
        ) : resultData ? (
          <TestResult result={resultData} onReset={resetTest} />
        ) : (
          <>
            <TestProgress current={currentQuestion} total={questions.length} />
            <MajorTestQuestion
              content={questions[currentQuestion].major_question_content}
              scale={questions[currentQuestion].major_question_score_value}
              onAnswer={handleAnswer}
              currentIndex={currentQuestion}
              total={questions.length}
              answeredCount={answers.filter((a) => a !== null).length}
              selectedValue={answers[currentQuestion]}
              allAnswered={allAnswered}
              onPrev={() => setCurrentQuestion((prev) => Math.max(0, prev - 1))}
              onNext={() =>
                setCurrentQuestion((prev) =>
                  Math.min(questions.length - 1, prev + 1),
                )
              }
              onSubmit={handleSubmit}
            />
          </>
        )}
      </div>
    </div>
  );
}

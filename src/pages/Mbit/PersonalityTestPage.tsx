import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { PersonalityTestIntro } from "../../components/Mbit/PersonalityTestPage/PersonalityTestIntro";
import { MajorTestQuestion } from "../../components/Mbit/TestQuestion";
import { PersonalityTestService } from "../../api/Mbit/PersonalityTestPage";
import {
  MbitAxisCode,
  MbitAxisResult,
  MbitQuestionRow,
  Personality,
  PersonalityTestResultData,
} from "../../types/common/Mbit";
import { PersonalityTestResult } from "../../components/Mbit/PersonalityTestPage/PersonalityTestResult";

export default function PersonalityTestPage() {
  const [questions, setQuestions] = useState<MbitQuestionRow[]>([]);
  const [started, setStarted] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<(number | null)[]>([]); // 각 문항 선택값
  const [resultData, setResultData] = useState<Personality | null>(null);
  const [testResult, setTestResult] =
    useState<PersonalityTestResultData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadQuestions = async () => {
      try {
        const data = await PersonalityTestService.getMbitQuestions();
        setQuestions(data);
        setAnswers(new Array(data.length).fill(null)); // 문항 수만큼 null로 초기화
      } catch (error) {
        toast.error("질문지를 불러오는 데 실패했습니다.");
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

    // 마지막 문항이 아니면 자동으로 다음으로
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleSubmit = async () => {
    if (!allAnswered) return;

    const newScores: Record<MbitAxisCode, number> = {} as Record<
      MbitAxisCode,
      number
    >;
    questions.forEach((q, idx) => {
      const trait = q.mbit_questions_trait as MbitAxisCode;
      newScores[trait] = (newScores[trait] || 0) + (answers[idx] ?? 0);
    });

    const axes: [MbitAxisCode, MbitAxisCode][] = [
      ["E", "P"],
      ["C", "S"],
      ["L", "N"],
      ["B", "A"],
      ["T", "I"],
    ];

    const axisResults: MbitAxisResult[] = axes.map(([a, b]) => {
      const aScore = newScores[a] || 0;
      const bScore = newScores[b] || 0;
      const total = aScore + bScore;
      const winner = aScore >= bScore ? a : b;
      const loser = aScore >= bScore ? b : a;
      const winnerScore = aScore >= bScore ? aScore : bScore;
      const loserScore = aScore >= bScore ? bScore : aScore;

      return {
        axis: `${a}/${b}`,
        winner,
        loser,
        winnerScore,
        loserScore,
        winnerRatio: total > 0 ? Math.round((winnerScore / total) * 100) : 50,
        loserRatio: total > 0 ? Math.round((loserScore / total) * 100) : 50,
      };
    });

    const finalCode = axisResults.map((r) => r.winner).join("");

    await toast.promise(
      async () => {
        const personality =
          await PersonalityTestService.getPersonalityByCode(finalCode);
        if (!personality) throw new Error("결과를 찾을 수 없습니다.");
        setTestResult({ personality, axisResults, finalCode });
        setResultData(personality);
      },
      {
        pending: "당신의 개발 성격을 분석 중입니다...",
        success: "분석이 완료되었습니다!",
        error: "분석 중 오류가 발생했습니다.",
      },
    );
  };

  const resetTest = () => {
    setStarted(false);
    setCurrentQuestion(0);
    setAnswers(new Array(questions.length).fill(null));
    setResultData(null);
    setTestResult(null);
  };

  if (loading)
    return (
      <div className="flex items-center justify-center flex-1 min-h-screen p-8 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50" />
    );

  return (
    <div className="flex items-center justify-center flex-1 min-h-screen p-8 bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      <div className="w-full max-w-5xl">
        {!started ? (
          <PersonalityTestIntro onStart={() => setStarted(true)} />
        ) : resultData ? (
          <PersonalityTestResult
            result={resultData}
            axisResults={testResult?.axisResults ?? []}
            onReset={resetTest}
          />
        ) : (
          <>
            <MajorTestQuestion
              content={questions[currentQuestion].mbit_questions_content}
              scale={questions[currentQuestion].mbit_questions_score_value}
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

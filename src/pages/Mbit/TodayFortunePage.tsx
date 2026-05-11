import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import FortuneDrawIntro from "../../components/Mbit/TodayFortunePage/FortuneDrawIntro";
import FortuneResultCard from "../../components/Mbit/TodayFortunePage/FortuneResultCard";
import { LoginService } from "../../api/Auth/LoginPage";
import { TodayFortuneService } from "../../api/Mbit/TodayFortunePage";
import { Fortune } from "../../types/common/Mbit";

export default function TodayFortunePage() {
  const [currentFortune, setCurrentFortune] = useState<Fortune | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [loading, setLoading] = useState(true);

  // 페이지 진입 시 오늘 뽑은 운세 조회만 (뽑기 X)
  useEffect(() => {
    checkTodayFortune();
  }, []);

  const checkTodayFortune = async () => {
    try {
      setLoading(true);
      const userId = await LoginService.getCurrentUserId();
      if (!userId) return;

      const fortune = await TodayFortuneService.getTodayFortune(userId);
      setCurrentFortune(fortune); // 없으면 null → 뽑기 화면 표시
    } catch (error) {
      console.error("운세 확인 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  // 유저가 버튼 눌렀을 때만 뽑기
  const drawFortune = async () => {
    setIsDrawing(true);
    try {
      const userId = await LoginService.getCurrentUserId();
      if (!userId) {
        toast.warn("로그인이 필요한 서비스입니다.");
        return;
      }

      await toast.promise(
        async () => {
          const fortune = await TodayFortuneService.drawFortune(userId);
          setCurrentFortune(fortune);
        },
        {
          pending: "오늘의 개발 운세를 불러오는 중입니다...",
          success: "오늘의 운세가 도착했습니다!",
          error: "운세를 불러오지 못했습니다. 잠시 후 다시 시도해주세요.",
        },
      );
    } catch (error) {
      console.error("뽑기 실패:", error);
    } finally {
      setIsDrawing(false);
    }
  };

  if (loading)
    return (
      <div className="flex-1 min-h-screen flex items-center justify-center"></div>
    );

  return (
    <div className="flex-1 min-h-screen flex items-center justify-center p-8">
      <div className="w-full max-w-6xl mx-auto">
        {" "}
        {/* max-w-3xl → max-w-6xl */}
        {!currentFortune ? (
          <FortuneDrawIntro onDraw={drawFortune} isDrawing={isDrawing} />
        ) : (
          <div className="space-y-8 min-h-[80vh]">
            {/* space-y-6→8, min-h 2배 */}
            <FortuneResultCard fortune={currentFortune} />
          </div>
        )}
      </div>
    </div>
  );
}

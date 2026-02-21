import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import FortuneDrawIntro from "../../components/Mbit/TodayFortunePage/FortuneDrawIntro";
import FortuneResultCard from "../../components/Mbit/TodayFortunePage/FortuneResultCard";
import FortuneActionButtons from "../../components/Mbit/TodayFortunePage/FortuneActionButtons";
import { LoginService } from "../../api/Auth/LoginPage";
import { TodayFortuneService } from "../../api/Mbit/TodayFortunePage";
import { Fortune } from "../../types/common/Mbit";

export default function TodayFortunePage() {
  const [currentFortune, setCurrentFortune] = useState<Fortune | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [loading, setLoading] = useState(true);

  // 1. 페이지 진입 시 오늘 이미 뽑은 운세가 있는지 확인
  useEffect(() => {
    checkTodayFortune();
  }, []);

  const checkTodayFortune = async () => {
    try {
      setLoading(true);
      const userId = await LoginService.getCurrentUserId();
      
      if (!userId) {
        // 비로그인 시 일단 뽑기 화면 유지 (또는 로그인 안내)
        setLoading(false);
        return;
      }

      // 유저의 오늘 운세 기록 조회 (있으면 가져오고 없으면 null 반환)
      // 서비스의 getOrDrawTodayFortune을 상황에 맞게 쪼개거나, 
      // 여기서 바로 호출하여 이미 뽑았다면 데이터를 받아옵니다.
      const fortune = await TodayFortuneService.getOrDrawTodayFortune({ userId });
      setCurrentFortune(fortune);
    } catch (error) {
      console.error("운세 확인 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  // 2. 운세를 뽑는 로직 (DB 연동)
  const drawFortune = async () => {
    setIsDrawing(true);
    try {
      const userId = await LoginService.getCurrentUserId();
      
      if (!userId) {
        toast.warn("로그인이 필요한 서비스입니다.");
        setIsDrawing(false);
        return;
      }

      // 토스트 메시지와 함께 DB 연동
      await toast.promise(
        async () => {
          const fortune = await TodayFortuneService.getOrDrawTodayFortune({ userId });
          setCurrentFortune(fortune);
        },
        {
          pending: "오늘의 개발 운세를 불러오는 중입니다...",
          success: "오늘의 운세가 도착했습니다!",
          error: "운세를 불러오지 못했습니다. 잠시 후 다시 시도해주세요."
        }
      );
    } catch (error) {
      console.error("뽑기 실패:", error);
    } finally {
      setIsDrawing(false);
    }
  };

  if (loading) return <div className="flex items-center justify-center flex-1">로딩 중...</div>;

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
            {/* 한 번 뽑으면 재추첨을 막거나 안내하는 로직을 추가할 수 있습니다. */}
            <FortuneActionButtons onDraw={() => toast.info("오늘의 운세는 하루에 한 번만 뽑을 수 있습니다.")} isDrawing={isDrawing} />
          </div>
        )}
      </div>
    </div>
  );
}
import { useState, useEffect } from "react";
// 1. 서비스 및 타입 임포트
import { FortuneEncyclopediaService } from "../../api/Mbit/FortuneEncyclopediaPage";
import FortuneDetail from "../../components/Mbit/FortuneEncyclopediaPage/FortuneDetail";
import FortuneList from "../../components/Mbit/FortuneEncyclopediaPage/FortuneList";
import { Fortune } from "../../types/pages/Mbit/Mbit";

export default function FortuneEncyclopediaPage() {
  const [fortunes, setFortunes] = useState<Fortune[]>([]); // API로 받아올 운세 목록
  const [selectedFortune, setSelectedFortune] = useState<Fortune | null>(null);
  const [loading, setLoading] = useState<boolean>(true); // 로딩 상태

  useEffect(() => {
    // 페이지 진입 시 데이터 페칭
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      const data = await FortuneEncyclopediaService.getAllFortunes();
      setFortunes(data);
    } catch (error) {
      console.error("데이터 로드 실패:", error);
      alert("운세 목록을 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex-1 p-8 bg-gray-50 flex items-center justify-center">
        로딩 중...
      </div>
    );
  }

  return (
    <div className="flex-1 p-8 bg-gray-50">
      {selectedFortune ? (
        /* 상세 페이지 모드 */
        <FortuneDetail
          fortune={selectedFortune}
          onBack={() => setSelectedFortune(null)}
        />
      ) : (
        /* 리스트 페이지 모드 (로컬 데이터가 아닌 API에서 가져온 fortunes 사용) */
        <FortuneList
          fortunes={fortunes}
          onSelectFortune={(fortune) => setSelectedFortune(fortune)}
        />
      )}
    </div>
  );
}

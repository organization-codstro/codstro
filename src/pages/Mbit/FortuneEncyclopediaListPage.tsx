import { useState, useEffect } from "react";
// 1. 서비스 및 타입 임포트
import { FortuneEncyclopediaListService } from "../../api/Mbit/FortuneEncyclopediaListPage";
import { Fortune } from "../../types/pages/Mbit/Mbit";
import FortuneItemCard from "../../components/Mbit/FortuneEncyclopediaListPage/FortuneItemCard";
import { useNavigate } from "react-router-dom";

export default function FortuneEncyclopediaListPage() {
  const [fortunes, setFortunes] = useState<Fortune[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();

  const onSelectFortune = (fortuneId: string) => {
    navigate(`/fortune-encyclopedia/${fortuneId}`);
  };

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);

      const data = await FortuneEncyclopediaListService.getAllFortunes();
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
      <div className="flex items-center justify-center flex-1 p-8 bg-gray-50">
        로딩 중...
      </div>
    );
  }

  return (
    <div className="flex-1 p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-gray-800">
            Fortune Encyclopedia
          </h1>
          <p className="text-gray-600">
            Learn about all possible fortune levels
          </p>
        </div>

        <div className="grid gap-6">
          {fortunes.map((fortune) => (
            <FortuneItemCard
              key={fortune.id}
              fortune={fortune}
              onClick={onSelectFortune}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
import { FortuneEncyclopediaListService } from "../../api/Mbit/FortuneEncyclopediaListPage";
import { FortuneList } from "../../types/pages/Mbit/FortuneEncyclopediaListPage/FortuneEncyclopediaListPage";
import FortuneItemCard from "../../components/Mbit/FortuneEncyclopediaListPage/FortuneItemCard";
import { useNavigate } from "react-router-dom";

export default function FortuneEncyclopediaListPage() {
  const [fortunes, setFortunes] = useState<FortuneList[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  //기본 코드값 100
  const [selectedCode, setSelectedCode] = useState<number>(100);
  const [fortuneCache, setFortuneCache] = useState<
    Record<number, FortuneList[]>
  >({});

  const navigate = useNavigate();

  const onSelectFortune = (fortuneId: string) => {
    navigate(`/mbit/fortune-encyclopedias/${fortuneId}`);
  };

  useEffect(() => {
    fetchData(selectedCode);
  }, [selectedCode]);

  /**
   * [운세 데이터 조회]
   * 선택된 코드 대역(예: 100, 200, 300 등)에 따라
   * 해당 범위의 운세 목록을 불러옵니다.
   */
  const fetchData = async (code: number) => {
    try {
      setLoading(true);

      //이미 캐시에 있으면 API 호출하지 않음
      if (fortuneCache[code]) {
        setFortunes(fortuneCache[code]);
        setLoading(false);
        return;
      }

      const data =
        await FortuneEncyclopediaListService.getFortunesByCodeRange(code);

      //화면에 세팅
      setFortunes(data);

      //캐시에 저장
      setFortuneCache((prev) => ({
        ...prev,
        [code]: data,
      }));
    } catch (error) {
      console.error("데이터 로드 실패:", error);
      alert("운세 목록을 불러오는데 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  /**
   * [코드 대역 선택 핸들러]
   * 버튼 클릭 시 해당 코드 대역으로 상태 변경
   */
  const handleCodeChange = (code: number) => {
    setSelectedCode(code);
  };

  /**
   * [로딩 상태 표시]
   * 데이터 로딩 중일 때 스켈레톤 UI를 표시함
   * api 속도가 빨라서 지금은 사용하지 않음
   */
  // if (loading) {
  //   return (
  //     <div className="flex-1 p-8 bg-gray-50">
  //       <div className="max-w-4xl mx-auto">
  //         <div className="mb-8">
  //           <h1 className="mb-2 text-3xl font-bold text-gray-800">
  //             Fortune Encyclopedia
  //           </h1>
  //           <p className="text-gray-600">
  //             Learn about all possible fortune levels
  //           </p>
  //         </div>

  //         {/* 코드 대역 선택 버튼 */}
  //         <div className="flex gap-3 mb-8">
  //           {[100, 200, 300, 400, 500].map((code) => (
  //             <button
  //               key={code}
  //               disabled
  //               className="px-4 py-2 font-medium text-gray-400 bg-gray-200 rounded-lg cursor-not-allowed"
  //             >
  //               {code} 번대
  //             </button>
  //           ))}
  //         </div>

  //         {/* 스켈레톤 카드 */}
  //         <div className="grid gap-6">
  //           {[1, 2, 3, 4, 5].map((item) => (
  //             <div
  //               key={item}
  //               className="p-6 bg-white shadow-md rounded-xl animate-pulse"
  //             >
  //               <div className="flex items-start gap-4">
  //                 <div className="flex-1 space-y-3">
  //                   {/* 제목 */}
  //                   <div className="w-2/3 h-5 bg-gray-300 rounded" />

  //                   {/* 요약 */}
  //                   <div className="w-full h-4 bg-gray-200 rounded" />
  //                   <div className="w-5/6 h-4 bg-gray-200 rounded" />
  //                 </div>
  //               </div>
  //             </div>
  //           ))}
  //         </div>
  //       </div>
  //     </div>
  //   );
  // }

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

        {/* 코드 대역 선택 버튼 */}
        <div className="flex gap-3 mb-8">
          {[100, 200, 300, 400, 500].map((code) => (
            <button
              key={code}
              onClick={() => handleCodeChange(code)}
              className={`px-4 py-2 rounded-lg font-medium transition 
                ${
                  selectedCode === code
                    ? "bg-blue-600 text-white"
                    : "bg-white border border-gray-300 text-gray-700 hover:bg-gray-100"
                }`}
            >
              {code} 번대
            </button>
          ))}
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

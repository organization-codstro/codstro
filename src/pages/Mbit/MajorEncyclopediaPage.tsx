import { useEffect, useState } from "react";
import MajorDetail from "../../components/Mbit/MajorEncyclopediaPage/MajorDetail";
import MajorList from "../../components/Mbit/MajorEncyclopediaPage/MajorList";
import { Major } from "../../types/pages/Mbit/Mbit";
import { MajorEncyclopediaService } from "../../api/Mbit/MajorEncyclopediaPage";
import { ICON_MAP } from "../../constants/Mbit/MajorEncyclopediaPage/MajorEncyclopediaPage";
import { Settings } from "lucide-react";

export default function MajorEncyclopediaPage() {
  const [majors, setMajors] = useState<Major[]>([]);
  const [selectedMajor, setSelectedMajor] = useState<Major | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  // 데이터 로드 함수
  const fetchMajors = async () => {
    try {
      setLoading(true);
      const data = await MajorEncyclopediaService.getAllMajors();

      // 2. 서비스에서 받아온 데이터에 아이콘 주입
      const mappedData = data.map((major) => ({
        ...major,
        icon: ICON_MAP[major.name] || <Settings />, // 매칭되는게 없으면 기본 아이콘
      }));
      console.log(mappedData);

      setMajors(mappedData);
    } catch (error) {
      console.error("전공 도감 로드 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMajors();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center flex-1 p-8 bg-gray-50">
        <p className="text-gray-500 animate-pulse">
          전공 정보를 불러오는 중입니다...
        </p>
      </div>
    );
  }

  return (
    <div className="flex-1 p-8 bg-gray-50">
      {selectedMajor ? (
        /* 상세 정보 모드 */
        <MajorDetail
          major={selectedMajor}
          onBack={() => setSelectedMajor(null)}
        />
      ) : (
        /* 목록 모드 */
        <MajorList
          majors={majors}
          onSelectMajor={(major) => setSelectedMajor(major)}
        />
      )}
    </div>
  );
}

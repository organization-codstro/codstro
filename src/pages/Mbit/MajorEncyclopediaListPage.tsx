import { useEffect, useState } from "react";
import { Major } from "../../types/common/Mbit";
import { MajorEncyclopediaListService } from "../../api/Mbit/MajorEncyclopediaListPage";
import { ICON_MAP } from "../../constants/Mbit/mbit";
import { Settings } from "lucide-react";
import MajorCard from "../../components/Mbit/MajorEncyclopediaListPage/MajorCard";
import { useNavigate } from "react-router-dom";

export default function MajorEncyclopediaListPage() {
  const navigate = useNavigate();
  const [majors, setMajors] = useState<Major[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  // 데이터 로드 함수
  const fetchMajors = async () => {
    try {
      setLoading(true);
      const data = await MajorEncyclopediaListService.getAllMajors();

      // 2. 서비스에서 받아온 데이터에 아이콘 주입
      const mappedData = data.map((major) => ({
        ...major,
        icon: ICON_MAP[major.major_name] || <Settings />, // 매칭되는게 없으면 기본 아이콘
      }));

      setMajors(mappedData);
    } catch (error) {
      console.error("전공 도감 로드 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  const onSelectMajor = (majorId: string) => {
    navigate(`/mbit/major-encyclopedias/${majorId}`);
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
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="mb-2 text-3xl font-bold text-gray-800">
            Major Encyclopedia
          </h1>
          <p className="text-gray-600">Explore different tech career paths</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          {majors.map((major) => (
            <MajorCard
              key={major.major_id}
              major={major}
              onClick={onSelectMajor}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

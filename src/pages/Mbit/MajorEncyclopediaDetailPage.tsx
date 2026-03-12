import { useEffect, useState } from "react";
import { Major } from "../../types/common/Mbit";
import { MajorEncyclopediaDetailService } from "../../api/Mbit/MajorEncyclopediaDetailPage";
import { useNavigate, useParams } from "react-router-dom";
import {
  ArrowLeft,
  Briefcase,
  ThumbsUp,
  ThumbsDown,
  BookOpen,
  DollarSign,
} from "lucide-react";
import MajorDetailHeader from "../../components/Mbit/MajorEncyclopediaDetailPage/MajorDetailHeader";
import NotFoundPage from "../NotFound/NotFoundPage";

export default function MajorEncyclopediaDetailPage() {
  const { majorId } = useParams<{ majorId: string }>();
  const [major, setMajor] = useState<Major | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  const fetchMajors = async () => {
    if (!majorId) {
      return;
    }
    try {
      setLoading(true);
      const data = await MajorEncyclopediaDetailService.getMajorById(majorId);

      setMajor(data);
    } catch (error) {
      console.error("전공 도감 로드 실패:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMajors();
  }, []);

  const onBack = () => {
    navigate("/mbit/major-encyclopedias");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center flex-1 p-8 bg-gray-50">
        <p className="text-gray-500 animate-pulse">
          전공 정보를 불러오는 중입니다...
        </p>
      </div>
    );
  }

  if (!major) {
    return <NotFoundPage />;
  }

  return (
    <div className="flex-1 p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[#587CF0] hover:text-[#4A6EE8] mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Encyclopedia</span>
        </button>

        <div className="overflow-hidden bg-white shadow-xl rounded-2xl">
          <MajorDetailHeader major={major} />

          <div className="p-8 space-y-8">
            {/* Strengths & Weaknesses */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <section className="p-6 rounded-xl bg-green-50">
                <div className="flex items-center gap-2 mb-4">
                  <ThumbsUp className="w-5 h-5 text-green-600" />
                  <h2 className="text-xl font-bold text-green-800">강점</h2>
                </div>
                <p className="leading-relaxed text-green-700">
                  {major.major_strengths}
                </p>
              </section>

              <section className="p-6 rounded-xl bg-red-50">
                <div className="flex items-center gap-2 mb-4">
                  <ThumbsDown className="w-5 h-5 text-red-600" />
                  <h2 className="text-xl font-bold text-red-800">약점</h2>
                </div>
                <p className="leading-relaxed text-red-700">
                  {major.major_weaknesses}
                </p>
              </section>
            </div>

            {/* Stress Management */}
            <section className="p-6 rounded-xl bg-purple-50">
              <div className="flex items-center gap-2 mb-4">
                <BookOpen className="w-5 h-5 text-purple-600" />
                <h2 className="text-xl font-bold text-purple-800">
                  스트레스 관리 전략
                </h2>
              </div>
              <p className="leading-relaxed text-purple-700">
                {major.major_stress_management}
              </p>
            </section>

            {/* Recommended Occupation */}
            <section className="p-6 rounded-xl bg-blue-50">
              <div className="flex items-center gap-2 mb-4">
                <Briefcase className="w-5 h-5 text-blue-600" />
                <h2 className="text-xl font-bold text-blue-800">추천 직업</h2>
              </div>
              <p className="leading-relaxed text-blue-700">
                {major.major_recommended_occupation}
              </p>
            </section>

            {/* Recommended Occupation */}
            <section className="p-6 rounded-xl bg-blue-50">
              <div className="flex items-center gap-2 mb-4">
                <DollarSign className="w-5 h-5 text-blue-600" />
                <h2 className="text-xl font-bold text-blue-800">
                  연간소득 (집계 방식 수정 필요)
                </h2>
              </div>
              <p className="text-2xl font-bold text-[#587CF0]">
                {major.major_annual_income}
              </p>
              <p className="mt-2 text-sm text-gray-600">Annual salary in USD</p>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

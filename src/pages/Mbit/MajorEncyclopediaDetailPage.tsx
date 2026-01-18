import { useEffect, useState } from "react";
import {  MajorDetail } from "../../types/pages/Mbit/Mbit";
import { MajorEncyclopediaDetailService } from "../../api/Mbit/MajorEncyclopediaDetailPage";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import MajorDetailHeader from "../../components/Mbit/MajorEncyclopediaDetailPage/MajorDetailHeader";
import MajorStats from "../../components/Mbit/MajorEncyclopediaDetailPage/MajorStats";

export default function MajorEncyclopediaDetailPage() {
  const { majorId } = useParams<{ majorId: string }>();
  const [major, setMajor] = useState<MajorDetail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  if (!majorId) {
    navigate("/major-encyclopedias");
    return;
  }

  // 데이터 로드 함수
  const fetchMajors = async () => {
    try {
      setLoading(true);
      const data = await MajorEncyclopediaDetailService.getMajorById(majorId);

      if (!data) {
        navigate("/major-encyclopedias");
        return;
      }

      setMajor(data);
    } catch (error) {
      console.error("전공 도감 로드 실패:", error);
    }
  };

  useEffect(() => {
    fetchMajors();
    setLoading(false);
  }, []);

  const onBack = () => {
    navigate("/major-encyclopedias");
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
    return (
      <div className="flex items-center justify-center flex-1 p-8 bg-gray-50">
        로딩 중...
      </div>
    );
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
            {/* About Section */}
            <section>
              <h2 className="mb-4 text-2xl font-bold text-gray-800">
                About This Field
              </h2>
              <p className="leading-relaxed text-gray-700">
                {major.description}
              </p>
            </section>
          </div>

          <MajorStats
            salaryRange={major.annualIncome}
            jobOutlook={major.jobOutlook}
          />
        </div>
      </div>
    </div>
  );
}

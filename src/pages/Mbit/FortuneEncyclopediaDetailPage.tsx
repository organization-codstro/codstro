import { useState, useEffect } from "react";
// 1. 서비스 및 타입 임포트
import { FortuneEncyclopediaDetailService } from "../../api/Mbit/FortuneEncyclopediaDetailPage";
import { Fortune } from "../../types/pages/Mbit/Mbit";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { DetailHeader } from "../../components/AiChat/AIPersonaDetailPage/DetailHeader";

export default function FortuneEncyclopediaDetailPage() {
  const { fortuneId } = useParams<{ fortuneId: string }>();
  const [selectedFortune, setSelectedFortune] = useState<Fortune | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const navigate = useNavigate();
  if (!fortuneId) {
    navigate("/fortune-encyclopedias");
    return;
  }

  const fetchData = async () => {
    setLoading(true);
    const fortune =
      await FortuneEncyclopediaDetailService.getFortuneById(fortuneId);
    setSelectedFortune(fortune);
  };

  useEffect(() => {
    fetchData();
    setLoading(false);
  }, []);

  const onBack = () => {
    navigate("/fortune-encyclopedias");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center flex-1 p-8 bg-gray-50">
        로딩 중...
      </div>
    );
  }

  if (!selectedFortune) {
    return (
      <div className="flex items-center justify-center flex-1 p-8 bg-gray-50">
        존재하지 않는 개발 운세 입니다
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
          <DetailHeader title={selectedFortune?.name || ""} onBack={onBack} />

          <div className="p-8 space-y-8">
            <section>
              <h2 className="mb-4 text-2xl font-bold text-gray-800">Summary</h2>
              <p className="leading-relaxed text-gray-700">
                {selectedFortune?.summary}
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-gray-800">
                Description
              </h2>
              <p className="leading-relaxed text-gray-700">
                {selectedFortune?.description}
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-gray-800">
                Category Message
              </h2>
              <pre className="font-sans leading-relaxed text-gray-700 whitespace-pre-wrap">
                {selectedFortune?.categoryMessage}
              </pre>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
// 1. 서비스 및 타입 임포트
import { FortuneEncyclopediaDetailService } from "../../api/Mbit/FortuneEncyclopediaDetailPage";
import { Fortune } from "../../types/common/Mbit";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import DetailHeader from "../../components/Mbit/FortuneEncyclopediaDetailPage/DetailHeader";

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
    navigate("/mbit/fortune-encyclopedias");
  };

  if (loading || !selectedFortune) {
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

        <div className="pb-12 overflow-hidden bg-white shadow-xl rounded-2xl">
          <DetailHeader fortune={selectedFortune} />

          <div className="p-8 pb-4 space-y-8">
            <section>
              <h2 className="mb-4 text-2xl font-bold text-gray-800">Name</h2>
              <p className="leading-relaxed text-gray-700">
                {selectedFortune?.name}
              </p>
            </section>

            <section>
              <h2 className="mb-4 text-2xl font-bold text-gray-800">Summary</h2>
              <p className="leading-relaxed text-gray-700">
                {selectedFortune?.summary}
              </p>
            </section>

            <section>
              <h2 className="mb-6 text-2xl font-bold text-gray-800">
                Category Message
              </h2>

              {selectedFortune?.categoryMessage && (
                <div className="space-y-6">
                  {/* Daily */}
                  <div className="p-5 bg-blue-50 rounded-xl">
                    <h3 className="mb-2 text-lg font-semibold text-blue-700">
                      ☀ Daily
                    </h3>
                    <p className="leading-relaxed text-gray-700">
                      {selectedFortune.categoryMessage.daily}
                    </p>
                  </div>

                  {/* Meeting */}
                  <div className="p-5 bg-green-50 rounded-xl">
                    <h3 className="mb-2 text-lg font-semibold text-green-700">
                      🤝 Meeting
                    </h3>
                    <p className="leading-relaxed text-gray-700">
                      {selectedFortune.categoryMessage.meeting}
                    </p>
                  </div>

                  {/* Development */}
                  <div className="p-5 bg-purple-50 rounded-xl">
                    <h3 className="mb-2 text-lg font-semibold text-purple-700">
                      💻 Development
                    </h3>
                    <p className="leading-relaxed text-gray-700">
                      {selectedFortune.categoryMessage.development}
                    </p>
                  </div>
                </div>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

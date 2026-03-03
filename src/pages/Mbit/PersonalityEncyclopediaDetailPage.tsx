import { useState, useEffect } from "react";
import { toast } from "react-toastify";

// 서비스 및 타입
import { PersonalityEncyclopediaDetailService } from "../../api/Mbit/PersonalityEncyclopediaDetailPage";
import { useNavigate, useParams } from "react-router-dom";
import { AlertCircle, ArrowLeft, TrendingUp } from "lucide-react";

import { Personality } from "../../types/common/Mbit";
import PersonalityDetailHeader from "../../components/Mbit/PersonalityEncyclopediaDetailPage/PersonalityDetailHeader";
import TraitList from "../../components/Mbit/MajorEncyclopediaDetailPage/TraitList";
import PersonalityInformationSection from "../../components/Mbit/PersonalityEncyclopediaDetailPage/PersonalityInformationSection";

export default function PersonalityEncyclopediaDetailPage() {
  const { personalityId } = useParams();
  const [personality, setPersonality] = useState<Personality | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const navigate = useNavigate();

  const onBack = () => {
    navigate("/mbit/personality-encyclopedias");
  };

  if (!personalityId) {
    //추후 404 패이지 연결
    console.log(
      "personalityId 관련 테스트 : personalityId가 없습니다",
      personalityId,
    );
    //navigate("/mbit/personality-encyclopedias");
    return;
  }

  const fetchPersonalities = async () => {
    try {
      setLoading(true);
      const data =
        await PersonalityEncyclopediaDetailService.getPersonalityById(
          personalityId,
        );

      setPersonality(data);
    } catch (error) {
      toast.error("성격 유형 목록을 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPersonalities();
  }, [personalityId]);

  if (loading)
    return (
      <div className="flex items-center justify-center flex-1 p-8">
        데이터 로딩 중...
      </div>
    );

  if (!personality) {
    //추후 404 패이지 연결
    console.log(
      "personality 관련 테스트 : personalityId가 없습니다",
      personality,
    );
    //navigate("/mbit/personality-encyclopedias");
    return;
  }

  return (
    <div className="flex-1 min-h-screen p-8 bg-gray-50">
      <div className="max-w-4xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-[#587CF0] hover:text-[#4A6EE8] mb-6 transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Encyclopedia</span>
        </button>

        <div className="overflow-hidden bg-white shadow-xl rounded-2xl">
          <PersonalityDetailHeader personality={personality} />

          <div className="p-8 space-y-8">
            <section>
              <h2 className="mb-4 text-2xl font-bold text-gray-800">
                About This Type
              </h2>
              <p className="leading-relaxed text-gray-700">
                {personality.collaborativeStyle}
              </p>
            </section>

            <div className="grid gap-6 md:grid-cols-2">
              <TraitList
                title="Strengths"
                item={personality.strengths}
                icon={<TrendingUp className="w-5 h-5 text-green-600" />}
                bgColor="bg-green-50"
                bulletColor="text-green-600"
              />
              <TraitList
                title="Areas to Improve"
                item={personality.weaknesses}
                icon={<AlertCircle className="w-5 h-5 text-orange-600" />}
                bgColor="bg-orange-50"
                bulletColor="text-orange-600"
              />
            </div>

            {/* 부가 정보 */}

            <div className="flex flex-col gap-2">
              {/*일 스타일 */}
              <PersonalityInformationSection
                title="Work Style"
                info={personality.weaknesses}
              />

              {/*권장 직무 */}
              <PersonalityInformationSection
                title="권장직무"
                info={personality.recommendedJob}
              />

              {/*협업 스타일 */}
              <PersonalityInformationSection
                title="협업 스타일"
                info={personality.collaborativeStyle}
              />

              {/*스트래스 관리법 */}
              <PersonalityInformationSection
                title="스트래스 관리법"
                info={personality.stressManagement}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

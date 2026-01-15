import { useState, useEffect } from "react";
import { toast } from "react-toastify";

// 서비스 및 타입
import PersonalityDetail from "../../components/Mbit/PersonalityEncyclopediaPage/PersonalityDetail";
import PersonalityCard from "../../components/Mbit/PersonalityEncyclopediaPage/PersonalityCard";
import { PersonalityEncyclopediaService } from "../../api/Mbit/PersonalityEncyclopediaPage";
import { MBTI_THEME } from "../../constants/Mbit/PersonalityEncyclopediaPage/PersonalityEncyclopediaPage";

export default function PersonalityEncyclopediaPage() {
  const [personalities, setPersonalities] = useState<any[]>([]);
  const [selectedPersonality, setSelectedPersonality] = useState<any | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchPersonalities = async () => {
      try {
        setLoading(true);
        const data = await PersonalityEncyclopediaService.getAllPersonalities();

        // 서비스 데이터에 테마(아이콘/컬러) 매핑 주입
        const mappedData = data.map((item) => ({
          ...item,
          // DB의 mbit_type_code(type)를 기준으로 테마 데이터 결합
          theme: MBTI_THEME[item.type] || MBTI_THEME.DEFAULT,
        }));

        setPersonalities(mappedData);
      } catch (error) {
        toast.error("성격 유형 목록을 불러오지 못했습니다.");
      } finally {
        setLoading(false);
      }
    };
    fetchPersonalities();
  }, []);

  if (loading)
    return (
      <div className="flex-1 p-8 flex items-center justify-center">
        데이터 로딩 중...
      </div>
    );

  return (
    <div className="flex-1 min-h-screen p-8 bg-gray-50">
      {selectedPersonality ? (
        <PersonalityDetail
          personality={selectedPersonality}
          onBack={() => setSelectedPersonality(null)}
        />
      ) : (
        <div className="max-w-6xl mx-auto">
          <div className="mb-8">
            <h1 className="mb-2 text-3xl font-bold text-gray-800">
              Personality Encyclopedia
            </h1>
            <p className="text-gray-600">Explore all MBIT personality types</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {personalities.map((personality) => (
              <PersonalityCard
                key={personality.id}
                personality={personality}
                onClick={(p) => setSelectedPersonality(p)}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

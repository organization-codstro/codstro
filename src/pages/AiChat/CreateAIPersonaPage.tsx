import { ChangeEvent, KeyboardEvent, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import {
  ArrowLeft,
  Bot,
  Camera,
  Check,
  ImagePlus,
  Plus,
  Sparkles,
  Trash2,
  User,
  Zap,
} from "lucide-react";
import { CreateAIPersonaService } from "../../api/AiChat/CreateAIPersonaPage";
import { LoginService } from "../../api/Auth/LoginPage";
import { uploadFileToStoragePath } from "../../db/firebase/firebase";
import { Toggle } from "../../components/AiChat/AIPersonaDetailPage/PersonaHero/Addfriendmodal/Toggle";

interface TagInputProps {
  label: string;
  placeholder: string;
  tags: string[];
  onChange: (tags: string[]) => void;
  required?: boolean;
  helper?: string;
}

const TagInput = ({
  label,
  placeholder,
  tags,
  onChange,
  required = false,
  helper,
}: TagInputProps) => {
  const [inputValue, setInputValue] = useState("");

  const addTag = () => {
    const nextTag = inputValue.trim();
    if (!nextTag || tags.includes(nextTag)) return;
    onChange([...tags, nextTag]);
    setInputValue("");
  };

  const removeTag = (tag: string) => {
    onChange(tags.filter((item) => item !== tag));
  };

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter" && event.key !== ",") return;
    event.preventDefault();
    addTag();
  };

  return (
    <div>
      <label className="block mb-2 text-sm font-semibold text-gray-700">
        {label}
        {required && <span className="ml-1 text-red-500">*</span>}
      </label>
      <div className="flex gap-2">
        <input
          type="text"
          value={inputValue}
          onChange={(event) => setInputValue(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="flex-1 px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg outline-none focus:border-blue-500"
        />
        <button
          type="button"
          onClick={addTag}
          className="flex items-center justify-center w-10 h-10 text-blue-600 transition-colors rounded-lg bg-blue-50 hover:bg-blue-100"
          aria-label={`${label} 추가`}
        >
          <Plus size={18} />
        </button>
      </div>
      {helper && <p className="mt-1 text-xs text-gray-400">{helper}</p>}
      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mt-3">
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 px-3 py-1 text-sm text-blue-700 rounded-full bg-blue-50"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                className="text-blue-400 hover:text-blue-700"
                aria-label={`${tag} 삭제`}
              >
                <Trash2 size={12} />
              </button>
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

export default function CreateAIPersonaPage() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [categories, setCategories] = useState<string[]>([]);
  const [gender, setGender] = useState("");
  const [age, setAge] = useState("");
  const [oneLineIntroduction, setOneLineIntroduction] = useState("");
  const [personality, setPersonality] = useState("");
  const [speechStyle, setSpeechStyle] = useState("");
  const [preferredTopics, setPreferredTopics] = useState("");
  const [preferredFeatures, setPreferredFeatures] = useState<string[]>([]);
  const [callMeName, setCallMeName] = useState("");
  const [emotion, setEmotion] = useState("편안한");
  const [aiSelfAwareness, setAiSelfAwareness] = useState(true);
  const [serviceIntegration, setServiceIntegration] = useState(false);
  const [profileImage, setProfileImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const ageNumber = useMemo(() => Number(age), [age]);

  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setProfileImage(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const validate = () => {
    if (!name.trim()) return "이름을 입력해주세요.";
    if (categories.length === 0) return "카테고리를 1개 이상 추가해주세요.";
    if (!gender) return "성별을 선택해주세요.";
    if (!age.trim() || Number.isNaN(ageNumber) || ageNumber <= 0) {
      return "나이를 올바르게 입력해주세요.";
    }
    if (!personality.trim()) return "성격을 입력해주세요.";
    if (!speechStyle.trim()) return "말투를 입력해주세요.";
    if (!preferredTopics.trim()) return "선호 주제를 입력해주세요.";
    return null;
  };

  const handleSubmit = async () => {
    const validationMessage = validate();
    if (validationMessage) {
      toast.error(validationMessage);
      return;
    }

    setIsSubmitting(true);
    try {
      const userId = await LoginService.getCurrentUserId();
      if (!userId) {
        navigate("/login");
        return;
      }

      const personaId = crypto.randomUUID();
      let profileImagePath: string | null = null;
      if (profileImage) {
        profileImagePath = `aichat-persona_profile/${userId}/${personaId}_profile_image.png`;
        await uploadFileToStoragePath(
          profileImage,
          profileImagePath,
        );
      }

      await CreateAIPersonaService.createPersonaWithFriend({
        persona: {
          ai_persona_id: personaId,
          ai_persona_name: name.trim(),
          ai_persona_category: categories,
          ai_persona_gender: gender,
          ai_persona_personality: personality.trim(),
          ai_persona_speech_style: speechStyle.trim(),
          ai_persona_age: ageNumber,
          ai_persona_preferred_topics: preferredTopics.trim(),
          ai_persona_preferred_features:
            preferredFeatures.length > 0 ? preferredFeatures : ["CASUAL"],
          ai_persona_one_line_introduction: oneLineIntroduction.trim() || null,
          ai_persona_profile_image_path: profileImagePath,
          user_id: userId,
        },
        settings: {
          user_id: userId,
          user_ai_setting_call_me_name: callMeName.trim() || "사용자",
          user_ai_setting_ai_self_awareness: aiSelfAwareness,
          user_ai_setting_service_integration: serviceIntegration,
          user_ai_setting_emotion: emotion,
        },
      });

      toast.success("AI 페르소나를 만들고 친구로 추가했습니다.");
      navigate("/ai-chat/friends");
    } catch (error) {
      console.error(error);
      toast.error(
        error instanceof Error
          ? error.message
          : "AI 페르소나 생성에 실패했습니다.",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="sticky top-0 z-10 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between px-4 py-4">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate("/ai-chat/friends")}
              className="p-2 transition-colors rounded-full hover:bg-gray-100"
              aria-label="뒤로 가기"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-xl font-bold text-gray-900">
                AI 페르소나 만들기
              </h1>
              <p className="text-sm text-gray-500">
                나만 볼 수 있는 AI 친구를 생성합니다.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 px-4 py-2 text-sm font-semibold text-white transition-opacity bg-blue-600 rounded-lg disabled:opacity-50 hover:opacity-90"
          >
            <Check size={16} />
            {isSubmitting ? "저장 중..." : "저장"}
          </button>
        </div>
      </header>

      <main className="max-w-5xl px-4 py-6 mx-auto space-y-5">
        <section className="p-5 bg-white border border-gray-100 rounded-lg">
          <div className="flex items-center gap-2 mb-5">
            <Camera size={18} className="text-blue-600" />
            <h2 className="text-lg font-bold text-gray-900">프로필</h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
            <div className="flex flex-col items-center">
              <div className="flex items-center justify-center overflow-hidden rounded-full w-36 h-36 bg-blue-50">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="프로필 미리보기"
                    className="object-cover w-full h-full"
                  />
                ) : (
                  <Bot size={54} className="text-blue-300" />
                )}
              </div>
              <label className="inline-flex items-center gap-2 px-4 py-2 mt-4 text-sm font-semibold text-blue-600 transition-colors rounded-lg cursor-pointer bg-blue-50 hover:bg-blue-100">
                <ImagePlus size={16} />
                이미지 선택
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </label>
              <p className="mt-2 text-xs text-center text-gray-400">
                선택 사항입니다.
              </p>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  이름 <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  placeholder="예: 로하"
                  className="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  한 줄 소개
                </label>
                <input
                  type="text"
                  value={oneLineIntroduction}
                  onChange={(event) =>
                    setOneLineIntroduction(event.target.value)
                  }
                  placeholder="예: 아이디어를 같이 키워주는 친구"
                  className="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg outline-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  성별 <span className="text-red-500">*</span>
                </label>
                <select
                  value={gender}
                  onChange={(event) => setGender(event.target.value)}
                  className="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg outline-none focus:border-blue-500"
                >
                  <option value="">선택</option>
                  <option value="MALE">남</option>
                  <option value="FEMALE">여</option>
                  <option value="OTHER">기타</option>
                </select>
              </div>
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  나이 <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  min={1}
                  value={age}
                  onChange={(event) => setAge(event.target.value)}
                  placeholder="예: 24"
                  className="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg outline-none focus:border-blue-500"
                />
              </div>
            </div>
          </div>
        </section>

        <section className="p-5 bg-white border border-gray-100 rounded-lg">
          <div className="flex items-center gap-2 mb-5">
            <Sparkles size={18} className="text-blue-600" />
            <h2 className="text-lg font-bold text-gray-900">페르소나 설정</h2>
          </div>

          <div className="grid gap-5">
            <TagInput
              label="카테고리"
              placeholder="입력 후 Enter"
              tags={categories}
              onChange={setCategories}
              required
              helper="예: 공부, 프로젝트, 일상"
            />

            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  성격 <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={personality}
                  onChange={(event) => setPersonality(event.target.value)}
                  placeholder="예: 장난기 있지만 중요한 순간엔 차분하게 정리해준다."
                  rows={5}
                  className="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg outline-none resize-none focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  말투 <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={speechStyle}
                  onChange={(event) => setSpeechStyle(event.target.value)}
                  placeholder="예: 반말을 사용하고 짧게 반응한다. 가끔 ㅁㅇㅁ 같은 텍스트 이모티콘을 쓴다."
                  rows={5}
                  className="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg outline-none resize-none focus:border-blue-500"
                />
              </div>
            </div>

            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                선호 주제 <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                value={preferredTopics}
                onChange={(event) => setPreferredTopics(event.target.value)}
                placeholder="예: 개발, 공부 계획, 프로젝트 기획"
                className="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg outline-none focus:border-blue-500"
              />
            </div>

            <TagInput
              label="선호 기능"
              placeholder="입력 후 Enter"
              tags={preferredFeatures}
              onChange={setPreferredFeatures}
              helper="비워두면 CASUAL로 저장됩니다."
            />
          </div>
        </section>

        <section className="p-5 bg-white border border-gray-100 rounded-lg">
          <div className="flex items-center gap-2 mb-5">
            <User size={18} className="text-blue-600" />
            <h2 className="text-lg font-bold text-gray-900">AI 설정</h2>
          </div>

          <div className="border border-gray-100 divide-y divide-gray-100 rounded-lg">
            <div className="p-4">
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                나를 부르는 이름
              </label>
              <input
                type="text"
                value={callMeName}
                onChange={(event) => setCallMeName(event.target.value)}
                placeholder="비워두면 사용자로 저장됩니다."
                maxLength={20}
                className="w-full px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex items-center justify-between p-4">
              <div>
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Bot size={15} className="text-blue-600" />
                  AI 자기 인식
                </div>
                <p className="mt-1 text-xs text-gray-400">
                  AI임을 인식하고 말할 수 있는지 설정합니다.
                </p>
              </div>
              <Toggle checked={aiSelfAwareness} onChange={setAiSelfAwareness} />
            </div>

            <div className="flex items-center justify-between p-4">
              <div>
                <div className="flex items-center gap-2 text-sm font-semibold text-gray-700">
                  <Zap size={15} className="text-blue-600" />
                  서비스 연동
                </div>
                <p className="mt-1 text-xs text-gray-400">
                  할 일 추가 같은 앱 기능 접근을 허용합니다.
                </p>
              </div>
              <Toggle
                checked={serviceIntegration}
                onChange={setServiceIntegration}
              />
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

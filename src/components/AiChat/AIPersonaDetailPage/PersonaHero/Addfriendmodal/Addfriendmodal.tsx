import { useEffect, useRef, useState } from "react";
import { AddFriendModalProps } from "../../../../../types/pages/AiChat/AIPersonaDetailPage/PersonaHero/Addfriendmodal/Addfriendmodal";
import { Bot, MessageCircle, User, UserPlus, X, Zap } from "lucide-react";
import Tooltip from "./Tooltip";
import Toggle from "./Toggle";

export function AddFriendModal({
  isOpen,
  onClose,
  onConfirm,
  personaName,
  profileImageUrl,
}: AddFriendModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);

  // -- 설정 상태 --
  const [callMeName, setCallMeName] = useState<string>("");
  const [aiSelfAwareness, setAiSelfAwareness] = useState<boolean>(true);
  const [serviceIntegration, setServiceIntegration] = useState<boolean>(false);

  // ESC 키로 닫기
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    if (isOpen) document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  // 스크롤 방지
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  // 오버레이 클릭 시 닫기
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) onClose();
  };

  const handleConfirm = () => {
    onConfirm({
      user_ai_setting_call_me_name: callMeName.trim(),
      user_ai_setting_ai_self_awareness: aiSelfAwareness,
      user_ai_setting_service_integration: serviceIntegration,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      ref={overlayRef}
      onClick={handleOverlayClick}
      className="fixed inset-0 z-50 flex items-center justify-center"
      style={{
        backgroundColor: "rgba(15, 23, 42, 0.45)",
        backdropFilter: "blur(4px)",
        animation: "fadeIn 0.18s ease",
      }}
    >
      {/* 모달 카드 */}
      <div
        className="relative w-full max-w-2xl mx-4 overflow-hidden bg-white shadow-2xl rounded-2xl"
        style={{ animation: "slideUp 0.22s cubic-bezier(0.34,1.56,0.64,1)" }}
      >
        {/* 상단 배너 */}
        <div
          className="relative flex items-center justify-center w-full h-36"
          style={{
            background:
              "linear-gradient(135deg, #4a6cf7 0%, #587CF0 60%, #7b9bf5 100%)",
          }}
        >
          <div className="absolute bg-white rounded-full -top-6 -right-6 w-28 h-28 opacity-20" />
          <div className="absolute w-20 h-20 bg-white rounded-full -bottom-4 -left-4 opacity-10" />

          <button
            onClick={onClose}
            className="absolute top-3 right-3 p-1.5 rounded-full text-white/70 hover:text-white hover:bg-white/20 transition-colors"
          >
            <X size={18} />
          </button>

          <div className="relative z-10">
            {profileImageUrl ? (
              <img
                src={profileImageUrl}
                alt={personaName}
                className="object-cover w-32 h-32 border-4 rounded-full shadow-lg border-white/40"
              />
            ) : (
              <div
                className="flex items-center justify-center w-32 h-32 text-4xl font-bold text-white border-4 rounded-full shadow-lg border-white/40"
                style={{ backgroundColor: "#4a6cf7" }}
              >
                {personaName.charAt(0)}
              </div>
            )}
            <span
              className="absolute w-5 h-5 border-2 border-white rounded-full bottom-1 right-1"
              style={{ backgroundColor: "#22c55e" }}
            />
          </div>
        </div>

        {/* 본문 */}
        <div className="px-6 pt-5 pb-6">
          {/* 페르소나 이름 */}
          <div className="mb-5 text-center">
            <h3 className="mb-1 text-xl font-bold text-gray-900">
              {personaName}
            </h3>
            <p className="text-sm text-gray-400">AI 페르소나</p>
          </div>

          {/* ── 설정 영역 ── */}
          <div
            className="mb-5 rounded-xl"
            style={{ border: "1.5px solid #e8edfe" }}
          >
            {/* 설정 헤더 */}
            <div
              className="px-4 py-2.5 text-xs font-semibold tracking-wide uppercase rounded-t-xl"
              style={{ backgroundColor: "#EEF2FF", color: "#587CF0" }}
            >
              AI 설정
            </div>

            {/* 1. 나를 부르는 이름 */}
            <div className="px-4 py-3.5 border-b border-gray-100">
              <div className="flex items-center mb-2">
                <User size={14} style={{ color: "#587CF0" }} />
                <span className="ml-2 text-sm font-medium text-gray-700">
                  나를 부르는 이름
                </span>
                <Tooltip text="AI가 대화 중 사용자를 부를 때 사용할 이름 또는 호칭을 설정합니다." />
              </div>
              <input
                type="text"
                value={callMeName}
                onChange={(e) => setCallMeName(e.target.value)}
                placeholder="예: 민준, 사장님, 친구..."
                maxLength={20}
                className="w-full px-3 py-2 text-sm transition-all rounded-lg outline-none"
                style={{
                  backgroundColor: "#f8faff",
                  border: "1.5px solid #e2e8f0",
                  color: "#374151",
                }}
                onFocus={(e) => (e.target.style.borderColor = "#587CF0")}
                onBlur={(e) => (e.target.style.borderColor = "#e2e8f0")}
              />
            </div>

            {/* 2. AI 자기 인식 */}
            <div className="px-4 py-3.5 border-b border-gray-100">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Bot size={14} style={{ color: "#587CF0" }} />
                  <span className="ml-2 text-sm font-medium text-gray-700">
                    AI 자기 인식
                  </span>
                  <Tooltip text="AI가 대화 중 자신을 AI라고 인식하고 말할 수 있는지 여부를 설정합니다." />
                </div>
                <Toggle
                  checked={aiSelfAwareness}
                  onChange={setAiSelfAwareness}
                />
              </div>
              <p className="mt-1.5 text-xs text-gray-400 pl-5">
                {aiSelfAwareness
                  ? "AI임을 인식하고 대화합니다"
                  : "AI임을 인식하지 않고 대화합니다"}
              </p>
            </div>

            {/* 3. 서비스 연동 */}
            <div className="px-4 py-3.5 rounded-b-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <Zap size={14} style={{ color: "#587CF0" }} />
                  <span className="ml-2 text-sm font-medium text-gray-700">
                    서비스 연동
                  </span>
                  <Tooltip text="AI가 할 일 추가 등 앱 내 서비스에 직접 접근하고 실행할 수 있는지 여부를 설정합니다." />
                </div>
                <Toggle
                  checked={serviceIntegration}
                  onChange={setServiceIntegration}
                />
              </div>
              <p className="mt-1.5 text-xs text-gray-400 pl-5">
                {serviceIntegration
                  ? "서비스 접근이 허용됩니다"
                  : "서비스 접근이 비활성화됩니다"}
              </p>
            </div>
          </div>

          {/* 버튼 그룹 */}
          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-2.5 rounded-xl text-sm font-medium text-gray-500 bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              취소
            </button>
            <button
              onClick={handleConfirm}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold text-white hover:opacity-90 transition-opacity"
              style={{
                backgroundColor: "#587CF0",
                boxShadow: "0 4px 14px rgba(88, 124, 240, 0.4)",
              }}
            >
              <UserPlus size={16} />
              친구 추가
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(24px) scale(0.96); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}

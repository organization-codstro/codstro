/**
 * NoteEditorHeader.jsx
 *
 * NoteEditor 상단 헤더 컴포넌트.
 *
 * 표시 요소:
 *  - 뒤로가기 버튼: 미저장 변경 사항이 있으면 confirm 경고 후 onBack 호출
 *  - 타이틀 / 서브타이틀
 *  - 미저장 변경 표시 (주황 dot)
 *  - Save 버튼: isDirty일 때 강조 스타일
 */
import { ArrowLeft, Save } from "lucide-react";
import { NoteEditorHeaderProps } from "../../../types/pages/Concept/NoteUpdatePage/NoteEditorHeader";
import { useEffect, useRef, useState } from "react";

export default function NoteEditorHeader({
  isDirty,
  onSave,
  onBack,
}: NoteEditorHeaderProps) {
  // 경고 상태: true이면 버튼이 빨간색, 3초 내 재클릭/ESC 시 나가기
  const [isWarning, setIsWarning] = useState(false);
  const warningTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const clearWarning = () => {
    setIsWarning(false);
    if (warningTimerRef.current) {
      clearTimeout(warningTimerRef.current);
      warningTimerRef.current = null;
    }
  };

  const triggerWarning = () => {
    setIsWarning(true);
    warningTimerRef.current = setTimeout(() => {
      setIsWarning(false);
      warningTimerRef.current = null;
    }, 3000);
  };

  const handleBack = () => {
    if (!isDirty) {
      onBack?.();
      return;
    }
    if (isWarning) {
      // 경고 상태에서 한 번 더 → 나가기
      clearWarning();
      onBack?.();
    } else {
      // 첫 클릭 → 경고 상태 진입
      triggerWarning();
    }
  };

  // ESC 키 처리
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key !== "Escape") return;

      if (!isDirty) {
        onBack?.();
        return;
      }

      if (isWarning) {
        clearWarning();
        onBack?.();
      } else {
        triggerWarning();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isDirty, isWarning, onBack]);

  // 언마운트 시 타이머 정리
  useEffect(() => {
    return () => clearWarning();
  }, []);

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
      {/* 왼쪽: 뒤로가기 + 타이틀 */}
      <div className="flex items-center gap-4">
        <button
          onClick={handleBack}
          className={`flex items-center gap-2 px-2 py-1.5 rounded-md transition-all duration-200 ${
            isWarning
              ? "bg-red-500 text-white"
              : "text-gray-400 hover:text-gray-900"
          }`}
        >
          <ArrowLeft className="w-5 h-5" />
        </button>

        <div className="flex flex-col">
          <h1 className="text-lg font-semibold text-gray-900">Note Editor</h1>
          <p className="text-sm text-gray-500">Edit Note</p>
        </div>
      </div>

      {/* 오른쪽: Save 버튼 + 미저장 Dot */}
      <div className="flex items-center gap-2.5">
        {isDirty && (
          <span
            className="w-2 h-2 rounded-full bg-amber-400"
            title="저장되지 않은 변경 사항"
          />
        )}
        <button
          onClick={onSave}
          className="flex items-center gap-2 px-4 py-2 text-white transition-colors duration-200 rounded-lg"
          style={{ backgroundColor: isDirty ? "#587CF0" : "#d1d5db" }}
        >
          <Save className="w-4 h-4" />
          Save
        </button>
      </div>
    </header>
  );
}

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
import { ConceptEditorHeaderProps } from "../../../types/pages/Concept/ConceptUpdatePage/ConceptEditorHeader";
import { useEffect, useRef, useState } from "react";

export default function ConceptEditorHeader({
  isDirty,
  onSave,
  onBack,
}: ConceptEditorHeaderProps) {
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
      clearWarning();
      onBack?.();
    } else {
      triggerWarning();
    }
  };

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

  useEffect(() => {
    return () => clearWarning();
  }, []);

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-white border-b border-gray-200">
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
          <h1 className="text-lg font-semibold text-gray-900">
            Concept Editor
          </h1>
          <p className="text-sm text-gray-500">Edit Concept</p>
        </div>
      </div>

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

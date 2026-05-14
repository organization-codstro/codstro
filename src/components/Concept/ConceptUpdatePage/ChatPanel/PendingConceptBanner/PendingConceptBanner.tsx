import { Check, FileEdit, X } from "lucide-react";
import {DiffView} from "./DiffView/DiffView";
import { PendingConceptBannerProps } from "../../../../../types/pages/Concept/ConceptUpdatePage/ChatPanel/PendingNoteBanner/PendingNoteBanner";

export const PendingConceptBanner = ({
  currentMarkdown,
  pendingConcept,
  onAccept,
  onReject,
}: PendingConceptBannerProps) => {
  return (
    <div className="flex-shrink-0 bg-white border-b border-zinc-200">
      {/* 배너 헤더 */}
      <div className="flex items-center gap-2 px-4 py-2.5 border-b border-zinc-100">
        <FileEdit size={13} className="flex-shrink-0 text-indigo-500" />
        <span className="text-[11.5px] font-semibold text-zinc-700 flex-1">
          AI가 컨셉 수정을 제안했습니다
        </span>
        <div className="flex items-center gap-1.5">
          <button
            onClick={onReject}
            className="flex items-center gap-1 px-2.5 py-1 rounded text-[11.5px] font-medium text-zinc-500 border border-zinc-200 hover:bg-zinc-50 hover:text-red-500 hover:border-red-200 transition-colors"
          >
            <X size={12} />
            거절
          </button>
          <button
            onClick={onAccept}
            className="flex items-center gap-1 px-2.5 py-1 rounded text-[11.5px] font-medium text-white bg-emerald-500 hover:bg-emerald-600 transition-colors"
          >
            <Check size={12} />
            수락
          </button>
        </div>
      </div>

      {/* Diff 뷰 */}
      <div className="px-4 py-3">
        <DiffView original={currentMarkdown} updated={pendingConcept} />
      </div>
    </div>
  );
}

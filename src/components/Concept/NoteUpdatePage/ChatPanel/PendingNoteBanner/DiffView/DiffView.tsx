import { useMemo } from "react";
import { DiffViewProps } from "../../../../../../types/pages/Concept/NoteUpdatePage/ChatPanel/PendingNoteBanner/DiffViewt/DiffView";
import {
  collapseContext,
  computeDiff,
} from "../../../../../../utils/Concepts/diffUtils";
import { DiffLine } from "../../../../../../types/utils/Concepts/diffUtils";

export const DiffView = ({ original, updated }: DiffViewProps) => {
  const diffLines = useMemo(() => {
    const all = computeDiff(original, updated);
    return collapseContext(all, 3);
  }, [original, updated]);

  if (diffLines.length === 0) {
    return (
      <p className="px-1 text-xs italic text-zinc-400">변경 사항이 없습니다.</p>
    );
  }

  const lineStyle: Record<DiffLine["type"], string> = {
    added: "bg-emerald-50 text-emerald-800 border-l-2 border-emerald-400",
    removed:
      "bg-red-50 text-red-700 border-l-2 border-red-400 line-through opacity-70",
    equal: "text-zinc-400",
  };

  const linePrefix: Record<DiffLine["type"], string> = {
    added: "+ ",
    removed: "- ",
    equal: "  ",
  };

  return (
    <div className="overflow-y-auto max-h-48 rounded-md border border-zinc-200 bg-zinc-50 text-[11px] font-mono">
      {diffLines.map((line, i) => (
        <div
          key={i}
          className={`px-3 py-[2px] whitespace-pre-wrap break-all leading-5 ${lineStyle[line.type]}`}
        >
          <span className="opacity-50 select-none">
            {linePrefix[line.type]}
          </span>
          {line.content}
        </div>
      ))}
    </div>
  );
}

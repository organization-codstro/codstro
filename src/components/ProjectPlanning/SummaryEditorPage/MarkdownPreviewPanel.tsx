// components/SummaryEditor/MarkdownPreviewPanel.tsx
import ReactMarkdown from "react-markdown";
import { MarkdownPreviewPanelProps } from "../../../types/pages/ProjectPlanning/SummaryEditorPage/MarkdownPreviewPanel";

export const MarkdownPreviewPanel = ({
  value,
  isLoading = false,
}: MarkdownPreviewPanelProps) => {
  return (
    <div className="flex flex-col w-1/2 bg-white border-l border-gray-200">
      <div className="px-4 py-2 text-xs font-medium tracking-wide text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
        Preview
      </div>

      <div className="flex-1 p-8 overflow-auto">
        {isLoading ? (
          //로딩 상태
          <div className="flex items-center justify-center h-full text-sm text-gray-400">
            Loading...
          </div>
        ) : value ? (
          //정상 데이터
          <div className="prose-sm prose text-gray-700 max-w-none">
            <ReactMarkdown>{value}</ReactMarkdown>
          </div>
        ) : (
          //진짜 "빈 상태"일 때만 표시
          <p className="text-sm text-gray-400">
            마크다운을 입력하면 미리보기가 표시됩니다.
          </p>
        )}
      </div>
    </div>
  );
}

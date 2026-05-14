/**
 * PreviewPanel.tsx
 *
 * 마크다운을 실시간으로 렌더링해서 보여주는 미리보기 패널.
 *
 * 동작:
 *  - react-markdown + remark-gfm으로 렌더링 (표, 취소선 등 GFM 지원)
 *  - 기본(에디터 모드): 오른쪽 절반 차지
 *  - 채팅 모드: 왼쪽 절반으로 유지되며 ChatPanel이 오른쪽에 나란히 배치됨
 *  - chatOpen 여부와 무관하게 항상 표시됨
 *
 * 마크다운 스타일:
 *  - @tailwindcss/typography 플러그인이 있으면 prose 클래스로 대체 가능
 */

import { PreviewPanelProps } from "../../../types/pages/Concept/NoteUpdatePage/PreviewPanel";
import { MarkdownRenderer } from "../../../components/Markdown/MarkdownRenderer";

export const PreviewPanel = ({ markdown, isLoading }: PreviewPanelProps) => {
  return (
    <div className="flex flex-col flex-1 overflow-hidden bg-white">
      {/* 패널 레이블 */}
      <div className="px-4 py-2 text-xs font-medium tracking-wide text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
        PREVIEW
      </div>

      {/* 본문 */}
      <div className="flex-1 px-8 py-6 overflow-y-auto bg-white">
        {isLoading ? (
          <div className="flex items-center justify-center h-full text-sm text-gray-400">
            Loading...
          </div>
        ) : markdown ? (
          <MarkdownRenderer content={markdown} />
        ) : (
          <p className="text-sm text-gray-400">
            마크다운을 입력하면 미리보기가 표시됩니다.
          </p>
        )}
      </div>
    </div>
  );
};

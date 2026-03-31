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

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { ComponentPropsWithoutRef } from "react";
import { PreviewPanelProps } from "../../../types/pages/Concepts/NoteUpdatePage/PreviewPanel";

// ── 마크다운 요소별 타입 헬퍼 ─────────────────────────────────────────
type MdProps<T extends keyof JSX.IntrinsicElements> =
  ComponentPropsWithoutRef<T>;

// code는 inline 여부를 react-markdown이 추가로 주입하므로 별도 처리
interface CodeProps extends MdProps<"code"> {
  inline?: boolean;
}

// ── 마크다운 각 요소별 Tailwind 스타일 매핑 ──────────────────────────
const mdComponents = {
  h1: ({ children }: MdProps<"h1">) => (
    <h1 className="mb-2 text-2xl font-bold leading-snug text-zinc-900">
      {children}
    </h1>
  ),
  h2: ({ children }: MdProps<"h2">) => (
    <h2 className="mb-3 text-lg font-bold text-zinc-900 mt-7">{children}</h2>
  ),
  h3: ({ children }: MdProps<"h3">) => (
    <h3 className="text-[15px] font-semibold text-zinc-900 mt-5 mb-2">
      {children}
    </h3>
  ),
  p: ({ children }: MdProps<"p">) => (
    <p className="mb-3 text-sm leading-7 text-zinc-600">{children}</p>
  ),
  ul: ({ children }: MdProps<"ul">) => (
    <ul className="list-disc pl-5 mb-3 space-y-0.5">{children}</ul>
  ),
  ol: ({ children }: MdProps<"ol">) => (
    <ol className="list-decimal pl-5 mb-3 space-y-0.5">{children}</ol>
  ),
  li: ({ children }: MdProps<"li">) => (
    <li className="text-sm leading-7 text-zinc-600">{children}</li>
  ),
  strong: ({ children }: MdProps<"strong">) => (
    <strong className="font-semibold text-zinc-900">{children}</strong>
  ),
  em: ({ children }: MdProps<"em">) => (
    <em className="italic text-zinc-700">{children}</em>
  ),
  code: ({ inline, children }: CodeProps) =>
    inline ? (
      <code className="font-mono text-xs bg-zinc-100 border border-zinc-200 px-1 py-0.5 rounded">
        {children}
      </code>
    ) : (
      <code className="font-mono text-xs text-zinc-200">{children}</code>
    ),
  pre: ({ children }: MdProps<"pre">) => (
    <pre className="p-4 mb-4 overflow-x-auto text-sm rounded-md bg-zinc-900">
      {children}
    </pre>
  ),
  table: ({ children }: MdProps<"table">) => (
    <div className="mb-4 overflow-x-auto">
      <table className="w-full text-sm border-collapse">{children}</table>
    </div>
  ),
  th: ({ children }: MdProps<"th">) => (
    <th className="px-3 py-2 font-semibold text-left border bg-zinc-50 border-zinc-200 text-zinc-900">
      {children}
    </th>
  ),
  td: ({ children }: MdProps<"td">) => (
    <td className="px-3 py-2 border border-zinc-200 text-zinc-600">
      {children}
    </td>
  ),
  hr: () => <hr className="my-6 border-t border-zinc-200" />,
  blockquote: ({ children }: MdProps<"blockquote">) => (
    <blockquote className="border-l-[3px] border-indigo-500 pl-4 text-zinc-500 my-3">
      {children}
    </blockquote>
  ),
  a: ({ href, children }: MdProps<"a">) => (
    <a
      href={href}
      className="text-indigo-600 underline underline-offset-2 hover:text-indigo-800"
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ),
};

export default function PreviewPanel({
  markdown,
  isLoading,
}: PreviewPanelProps) {
  return (
    <div className="flex flex-col flex-1 overflow-hidden bg-white">
      {/* 패널 레이블 */}
      <div className="px-4 py-2 text-xs font-medium tracking-wide text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
        PREVIEW
      </div>

      {/* 본문 */}
      <div className="flex-1 px-8 py-6 overflow-y-auto bg-white">
        {isLoading ? (
          //로딩 상태
          <div className="flex items-center justify-center h-full text-gray-400 text-sm">
            Loading...
          </div>
        ) : markdown ? (
          //정상 렌더링
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            components={mdComponents}
          >
            {markdown}
          </ReactMarkdown>
        ) : (
          //진짜 빈 상태
          <p className="text-sm text-gray-400">
            마크다운을 입력하면 미리보기가 표시됩니다.
          </p>
        )}
      </div>
    </div>
  );
}
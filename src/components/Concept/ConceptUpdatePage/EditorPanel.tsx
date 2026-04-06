/**
 * EditorPanel.jsx
 *
 * 마크다운을 직접 편집하는 Monaco Editor 패널.
 *
 * 동작:
 *  - chatOpen이 true이면 왼쪽으로 슬라이드아웃 (Tailwind transition + transform)
 *  - isLoading이 true이면 Monaco Editor readOnly 처리
 *  - 마크다운 변경 시 onChange 호출
 */

import Editor from "@monaco-editor/react";
import { EditorPanelProps } from "../../../types/pages/Concept/ConceptUpdatePage/EditorPanel";

export default function EditorPanel({
  markdown,
  onChange,
  chatOpen,
  isLoading,
}: EditorPanelProps) {
  return (
    <div
      className={`flex flex-col bg-white overflow-hidden transition-all duration-[380ms] ease-[cubic-bezier(.4,0,.2,1)] ${
        chatOpen
          ? "flex-[0] max-w-0 opacity-0 -translate-x-10 pointer-events-none"
          : "flex-1 max-w-[50%] opacity-100 translate-x-0"
      }`}
    >
      <div className="px-4 py-2 text-xs font-medium tracking-wide text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
        Markdown
      </div>

      <div className="flex-1 overflow-hidden">
        {isLoading ? (
          <div className="flex items-center justify-center h-full text-sm text-gray-400">
            Loading...
          </div>
        ) : (
          <Editor
            height="100%"
            defaultLanguage="markdown"
            value={markdown.replace(/\\n/g, "\n")}
            onChange={(val) => onChange(val ?? "")}
            options={{
              minimap: { enabled: false },
              fontSize: 13,
              lineHeight: 22,
              fontFamily: "'JetBrains Mono', 'Fira Code', monospace",
              wordWrap: "on",
              scrollBeyondLastLine: false,
              renderLineHighlight: "none",
              overviewRulerLanes: 0,
              padding: { top: 16, bottom: 16 },
            }}
          />
        )}
      </div>
    </div>
  );
}

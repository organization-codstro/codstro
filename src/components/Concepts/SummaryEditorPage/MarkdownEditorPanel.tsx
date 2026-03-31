// components/SummaryEditor/MarkdownEditorPanel.tsx
import { Editor } from "@monaco-editor/react";
import { MarkdownEditorPanelProps } from "../../../types/pages/ProjectPlanning/SummaryEditorPage/MarkdownEditorPanel";

export default function MarkdownEditorPanel({
  value,
  onChange,
  isLoading = false,
}: MarkdownEditorPanelProps) {
  return (
    <div className="flex flex-col w-1/2 overflow-hidden bg-white border-r border-gray-200">
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
            value={value}
            onChange={(v) => onChange(v || "")}
            theme="vs"
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

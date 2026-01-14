import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownRendererProps {
  content: string;
}

export default function MarkdownRenderer({ content }: MarkdownRendererProps) {
  const normalizedContent = content.replace(/\\n/g, "\n");
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      components={{
        h1: ({ children }) => (
          <h1 className="mt-8 mb-4 text-2xl font-bold text-gray-900">
            {children}
          </h1>
        ),
        h2: ({ children }) => (
          <h2 className="mt-6 mb-3 text-xl font-bold text-gray-900">
            {children}
          </h2>
        ),
        h3: ({ children }) => (
          <h3 className="mt-5 mb-2 text-lg font-semibold text-gray-900">
            {children}
          </h3>
        ),
        p: ({ children }) => (
          <p className="mb-3 leading-relaxed text-gray-700">{children}</p>
        ),
        li: ({ children }) => (
          <li className="ml-5 text-gray-700 list-disc">{children}</li>
        ),
        code({ className, children }) {
          const isBlock = className?.startsWith("language-");

          // inline code
          if (!isBlock) {
            return (
              <code className="px-1 py-0.5 bg-gray-100 rounded text-sm text-pink-600">
                {children}
              </code>
            );
          }

          // code block
          return (
            <pre className="p-4 my-4 overflow-x-auto bg-gray-900 rounded-lg">
              <code className="text-sm text-gray-100">{children}</code>
            </pre>
          );
        },
      }}
    >
      {normalizedContent}
    </ReactMarkdown>
  );
}

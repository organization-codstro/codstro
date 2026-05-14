import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

interface MarkdownRendererProps {
  content: string;
}

export const MarkdownRenderer = ({ content }: MarkdownRendererProps) => {
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

        // list
        ul: ({ children }) => (
          <ul className="mb-3 ml-5 text-gray-700 list-disc">{children}</ul>
        ),
        ol: ({ children }) => (
          <ol className="mb-3 ml-5 text-gray-700 list-decimal">{children}</ol>
        ),
        li: ({ children }) => <li className="mb-1">{children}</li>,

        // table support
        table: ({ children }) => (
          <div className="my-4 overflow-x-auto">
            <table className="min-w-full text-sm border border-gray-300">
              {children}
            </table>
          </div>
        ),
        thead: ({ children }) => (
          <thead className="bg-gray-100">{children}</thead>
        ),
        tbody: ({ children }) => (
          <tbody className="divide-y divide-gray-200">{children}</tbody>
        ),
        tr: ({ children }) => (
          <tr className="border-t border-gray-200">{children}</tr>
        ),
        th: ({ children }) => (
          <th className="px-3 py-2 font-semibold text-left text-gray-700 border-r border-gray-200 last:border-r-0">
            {children}
          </th>
        ),
        td: ({ children }) => (
          <td className="px-3 py-2 text-gray-700 border-r border-gray-200 last:border-r-0">
            {children}
          </td>
        ),

        // code
        code({ className, children }) {
          const isBlock = className?.startsWith("language-");

          if (!isBlock) {
            return (
              <code className="px-1 py-0.5 bg-gray-100 rounded text-sm text-pink-600">
                {children}
              </code>
            );
          }

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
};

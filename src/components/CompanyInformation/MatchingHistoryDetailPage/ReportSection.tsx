import MarkdownRenderer from "../../Markdown/MarkdownRenderer";

interface ReportSectionProps {
  title: string;
  content: string;
  isLast?: boolean;
}

export const ReportSection = ({
  title,
  content,
  isLast = false,
}: ReportSectionProps) => {
  return (
    <div className={`${isLast ? "pt-8 border-t border-gray-200" : "mb-8"}`}>
      <h2 className="mb-4 text-2xl font-bold text-gray-900">{title}</h2>
      <div className="prose-sm prose max-w-none">
        <MarkdownRenderer content={content} />
      </div>
    </div>
  );
};

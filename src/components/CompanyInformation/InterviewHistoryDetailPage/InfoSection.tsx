interface InfoSectionProps {
  title: string;
  content: string;
  variant?: "default" | "gray" | "blue";
}

export const InfoSection = ({
  title,
  content,
  variant = "default",
}: InfoSectionProps) => {
  // 스타일 매핑
  const styles = {
    default: "text-lg leading-relaxed text-gray-700",
    gray: "p-6 border border-gray-200 rounded-lg bg-gray-50 leading-relaxed text-gray-700",
    blue: "p-6 border border-blue-200 rounded-lg bg-blue-50 leading-relaxed text-gray-700 whitespace-pre-wrap",
  };

  const isDefault = variant === "default";

  return (
    <div className={isDefault ? "" : "pt-6 border-t border-gray-200"}>
      <h3 className="mb-4 text-lg font-semibold text-gray-900">{title}</h3>
      <div className={styles[variant]}>
        <p>{content}</p>
      </div>
    </div>
  );
};

interface HistoryHeaderProps {
  title: string;
  description: string;
}

export const HistoryHeader = ({ title, description }: HistoryHeaderProps) => {
  return (
    <div className="mb-8">
      <h1 className="mb-2 text-3xl font-bold text-gray-900">{title}</h1>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

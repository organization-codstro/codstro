import { Users } from "lucide-react";

interface CollectionEmptyStateProps {
  message?: string;
}

export function CollectionEmptyState({
  message = "No AI friends available yet",
}: CollectionEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center h-full min-h-[300px] text-gray-400">
      <Users size={64} className="mb-4" />
      <p className="text-lg font-medium">{message}</p>
    </div>
  );
}

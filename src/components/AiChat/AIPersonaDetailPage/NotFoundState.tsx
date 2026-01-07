import { NotFoundStateProps } from "../../../types/AiChat/AIPersonaDetailPage/NotFoundState";

export function NotFoundState({
  message = "Persona not found",
}: NotFoundStateProps) {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <p className="font-medium text-gray-500">{message}</p>
    </div>
  );
}

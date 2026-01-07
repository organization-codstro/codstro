import { PersonaInfoCardProps } from "../../../types/AiChat/AIPersonaDetailPage/PersonaInfoCard";

export function PersonaInfoCard({ title, content }: PersonaInfoCardProps) {
  return (
    <div className="p-6 bg-white border border-gray-100 rounded-xl">
      <h3 className="flex items-center gap-2 mb-3 font-bold text-gray-900">
        <span
          className="w-1 h-5 rounded-full"
          style={{ backgroundColor: "#587CF0" }}
        ></span>
        {title}
      </h3>
      <p className="leading-relaxed text-gray-700">{content}</p>
    </div>
  );
}

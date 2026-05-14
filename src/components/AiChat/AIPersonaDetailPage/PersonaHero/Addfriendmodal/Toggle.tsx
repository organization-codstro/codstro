import { ToggleProps } from "../../../../../types/pages/AiChat/AIPersonaDetailPage/PersonaHero/Addfriendmodal/Toggle";

// -- 토글 스위치 컴포넌트 --
export const Toggle = ({ checked, onChange }: ToggleProps) => {
  return (
    <button
      type="button"
      onClick={() => onChange(!checked)}
      className="relative inline-flex flex-shrink-0 h-5 transition-colors duration-200 rounded-full w-9 focus:outline-none"
      style={{ backgroundColor: checked ? "#587CF0" : "#d1d5db" }}
    >
      <span
        className="inline-block h-4 w-4 rounded-full bg-white shadow transform transition-transform duration-200 mt-0.5"
        style={{ marginLeft: checked ? "18px" : "2px" }}
      />
    </button>
  );
};

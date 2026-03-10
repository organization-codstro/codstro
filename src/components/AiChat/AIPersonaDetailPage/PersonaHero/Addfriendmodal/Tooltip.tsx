import { Info } from "lucide-react";
import { useState } from "react";
import { TooltipProps } from "../../../../../types/pages/AiChat/AIPersonaDetailPage/PersonaHero/Addfriendmodal/Tooltip";

// -- 툴팁 컴포넌트 --
export default function Tooltip({ text }: TooltipProps) {
  const [visible, setVisible] = useState(false);

  return (
    <div className="relative inline-flex items-center">
      <button
        type="button"
        onMouseEnter={() => setVisible(true)}
        onMouseLeave={() => setVisible(false)}
        onFocus={() => setVisible(true)} 
        onBlur={() => setVisible(false)}
        className="ml-1.5 transition-colors"
        style={{ color: "#9ca3af" }}
      >
        <Info size={14} />
      </button>

      {visible && (
        <div
          className="absolute px-3 py-2 text-xs text-white whitespace-pre-line -translate-y-1/2 rounded-lg shadow-lg pointer-events-none left-6 top-1/2 w-72"
          style={{
            backgroundColor: "#1e293b",
            lineHeight: "1.5",
            zIndex: 10,
          }}
        >
          {text}
          {/* 말풍선 꼬리 */}
          <span
            className="absolute top-1/2 -translate-y-1/2 -left-1.5"
            style={{
              borderTop: "5px solid transparent",
              borderBottom: "5px solid transparent",
              borderRight: "6px solid #1e293b",
            }}
          />
        </div>
      )}
    </div>
  );
}

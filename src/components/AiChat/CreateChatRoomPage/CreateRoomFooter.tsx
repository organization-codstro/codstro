import { ArrowRight } from "lucide-react";
import { CreateRoomFooterProps } from "../../../types/pages/AiChat/CreateChatRoomPage/CreateRoomFooter";

export function CreateRoomFooter({
  step,
  isValid,
  onNext,
}: CreateRoomFooterProps) {
  return (
    <div className="p-4 bg-white border-t border-gray-200">
      <button
        onClick={onNext}
        disabled={!isValid}
        className="flex items-center justify-center w-full gap-2 px-6 py-3 font-medium text-white transition-opacity rounded-lg disabled:opacity-50 hover:opacity-90"
        style={{ backgroundColor: "#587CF0" }}
      >
        {step === 1 ? "Next" : "Create Room"}
        <ArrowRight size={20} />
      </button>
    </div>
  );
}

import { Trash2 } from "lucide-react";

interface DeleteButtonProps {
  isPending: boolean;
  onClick: (e: React.MouseEvent) => void;
}

export const DeleteButton = ({ isPending, onClick }: DeleteButtonProps) => {
  return (
    <button
      onClick={onClick}
      className={`p-2 transition-all duration-200 rounded-full border ${
        isPending
          ? "bg-red-500 text-white border-red-500 scale-110 shadow-md"
          : "text-gray-400 border-transparent hover:bg-red-50 hover:text-red-500"
      }`}
      title={isPending ? "확인을 위해 한 번 더 클릭" : "삭제하기"}
    >
      <Trash2 size={20} />
    </button>
  );
};

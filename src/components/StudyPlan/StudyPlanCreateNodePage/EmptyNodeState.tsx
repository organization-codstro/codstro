import { Plus } from "lucide-react";

export const EmptyNodeState = () => (
  <div className="py-16 text-center">
    <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full">
      <Plus className="w-8 h-8 text-[#587CF0]" />
    </div>
    <h3 className="mb-2 text-lg font-medium text-gray-800">
      아직 추가된 노드가 없습니다
    </h3>
    <p className="text-gray-600">
      우측 Tech Stacks에서 선택하여 학습 노드를 추가하세요
    </p>
  </div>
);

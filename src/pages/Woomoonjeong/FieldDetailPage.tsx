import React, { useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  woomoonjeongData,
  fieldTypeColors,
} from "../../data/woomoonjeong/woomoonjeongData";
import AssignRecommendedFieldModal from "../../components/Woomoonjeong/RecommendedCreateFieldModal";
import FieldDetailHeader from "../../components/Woomoonjeong/FieldDetailPage/FieldDetailHeader";
import PinList from "../../components/Woomoonjeong/FieldDetailPage/PinList";

const FieldDetail: React.FC = () => {
  const { fieldId } = useParams<{ fieldId: string }>();
  const navigate = useNavigate();
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  // 데이터 검색 로직
  const result = useMemo(() => {
    for (const group of woomoonjeongData) {
      const field = group.fields.find((f) => f.id === Number(fieldId));
      if (field) return { group, field };
    }
    return null;
  }, [fieldId]);

  if (!result) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900">Field not found</h2>
          <button
            onClick={() => navigate("/woomoonjeong/documents/recommended")}
            className="px-6 py-2 mt-4 font-medium text-white rounded-lg bg-[#587CF0]"
          >
            Back
          </button>
        </div>
      </div>
    );
  }

  const { group, field } = result;

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      <FieldDetailHeader
        fieldName={field.name}
        groupName={group.name}
        groupColorClass={fieldTypeColors[group.name]}
        description={field.description}
        onBack={() => navigate("/woomoonjeong/documents/recommended")}
        onAddField={() => setIsAddModalOpen(true)}
      />

      <div className="p-8 mx-auto max-w-7xl">
        <PinList pins={field.pins} />
      </div>

      <AssignRecommendedFieldModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        field={{
          id: field.id,
          name: field.name,
          description: field.description,
          created_at: field.created_at,
        }}
        onAdd={() => {}}
      />
    </div>
  );
};

export default FieldDetail;

import { useParams } from "react-router-dom";
import { useState } from "react";
import { packageManagerMaterials } from "../../data/Concepts/PackageListPage/PackageManagerMaterials";
import BackButton from "../../components/Concepts/BackButton";
import MaterialHeader from "../../components/Concepts/PackageDetailPage/MaterialHeader";
import MaterialActionButtons from "../../components/Concepts/PackageDetailPage/MaterialActionButtons";
import MarkdownRenderer from "../../components/Markdown/MarkdownRenderer";
import RelatedMaterialGrid from "../../components/Concepts/PackageDetailPage/RelatedMaterialGrid";
import AIChat from "../../components/CompanyInformation/AIChat";
import AddTodoModal from "../../components/CompanyInformation/AddTodoModal";
import { MaterialNotFound } from "../../components/Concepts/PackageDetailPage/MaterialNotFound";

export default function PackageDetailPage() {
  const { materialId } = useParams<{ materialId: string }>();
  const [showAIChat, setShowAIChat] = useState(false);
  const [showTodoModal, setShowTodoModal] = useState<
    false | "documentation" | "clone_project"
  >(false);

  const material = packageManagerMaterials.find((m) => m.id === materialId);

  // 데이터 예외 처리
  if (!material) {
    return <MaterialNotFound />;
  }

  return (
    <div className="max-w-5xl p-8 mx-auto">
      {/* 1. 뒤로가기 버튼 */}
      <BackButton to="/package-managers" label="Back to Package Managers" />

      <div className="p-8 mb-6 bg-white border border-gray-200 rounded-lg">
        {/* 2. 자료 헤더 (제목, 설명, 태그, 문서 링크) */}
        <MaterialHeader
          name={material.name}
          category={material.category[0] || ""}
          description={material.description}
          tags={material.category}
          documentUrl={material.documentUrl}
        />

        {/* 3. 액션 버튼 그룹 (AI 채팅, Todo 추가) */}
        <MaterialActionButtons
          onShowAIChat={() => setShowAIChat(true)}
          onAddTodo={(type) => setShowTodoModal(type)}
        />

        {/* 4. 마크다운 본문 영역 */}
        <div className="prose max-w-none">
          <MarkdownRenderer content={material.content} />
        </div>
      </div>

      {/* 5. 연관 자료 그리드 */}
      <RelatedMaterialGrid relatedMaterials={material.relatedMaterials || []} />

      {/* 6. 모달 및 오버레이 컴포넌트들 */}
      <AIChat
        isOpen={showAIChat}
        onClose={() => setShowAIChat(false)}
        conceptName={material.name}
      />

      {showTodoModal && (
        <AddTodoModal
          isOpen={true}
          onClose={() => setShowTodoModal(false)}
          conceptName={material.name}
          todoType={showTodoModal}
        />
      )}
    </div>
  );
}

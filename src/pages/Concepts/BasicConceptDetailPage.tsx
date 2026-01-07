import { useParams } from "react-router-dom";
import { useState } from "react";
import { concept } from "../../data/Concepts/concepts";

// 기존 공통 컴포넌트들
import AIChat from "../../components/CompanyInformation/AIChat";
import AddTodoModal from "../../components/CompanyInformation/AddTodoModal";
import MarkdownRenderer from "../../components/Markdown/MarkdownRenderer";
import BackButton from "../../components/Concepts/BackButton";
import ConceptHeader from "../../components/Concepts/BasicConceptDetailPage/ConceptHeader";
import ConceptActionButtons from "../../components/Concepts/BasicConceptDetailPage/ConceptActionButtons";
import RelatedConceptGrid from "../../components/Concepts/BasicConceptDetailPage/RelatedConceptGrid";

export default function BasicConceptDetail() {
  const { conceptId } = useParams<{ conceptId: string }>();

  // 모달 및 채팅 상태 관리
  const [showAIChat, setShowAIChat] = useState(false);
  const [showTodoModal, setShowTodoModal] = useState<
    false | "documentation" | "clone_project"
  >(false);

  // 데이터 없을 경우 예외 처리
  if (!concept) return <p className="p-8">Concept not found.</p>;

  return (
    <div className="max-w-5xl p-8 mx-auto">
      {/* 1. 뒤로가기 버튼 */}
      <BackButton to="/basic-concepts" />

      <div className="p-8 mb-6 bg-white border border-gray-200 rounded-lg">
        {/* 2. 개념 헤더 (제목, 설명, 태그, 이해함 버튼) */}
        <ConceptHeader
          name={concept.name}
          category={concept.category}
          description={concept.description}
          tags={concept.tags}
          isUnderstood={concept.isUnderstood}
          onToggleUnderstood={() => {
            // TODO: 이해함 상태를 변경하는 API 호출 또는 로직 추가
            console.log("Toggle understood status");
          }}
        />

        {/* 3. 액션 버튼 그룹 (AI 채팅, Todo 추가) */}
        <ConceptActionButtons
          onShowAIChat={() => setShowAIChat(true)}
          onAddTodo={(type) => setShowTodoModal(type)}
        />

        {/* 4. 마크다운 본문 영역 */}
        <div className="prose max-w-none">
          <MarkdownRenderer content={concept.content} />
        </div>
      </div>

      {/* 5. 연관 개념 그리드 */}
      <RelatedConceptGrid relatedConcepts={concept.relatedConcepts} />

      {/* 6. 모달 및 오버레이 컴포넌트들 */}
      <AIChat
        isOpen={showAIChat}
        onClose={() => setShowAIChat(false)}
        conceptName={concept.name}
      />

      {showTodoModal && (
        <AddTodoModal
          isOpen={true}
          onClose={() => setShowTodoModal(false)}
          conceptName={concept.name}
          todoType={showTodoModal}
        />
      )}
    </div>
  );
}

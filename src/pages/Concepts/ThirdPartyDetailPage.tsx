import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { service } from "../../data/Concepts/thirdPartyServices";
import BackButton from "../../components/Concepts/BackButton";
import ThirdPartyHeader from "../../components/Concepts/ThirdPartyDetailPage/ThirdPartyHeader";
import ThirdPartyActionButtons from "../../components/Concepts/ThirdPartyDetailPage/ThirdPartyActionButtons";
import MarkdownRenderer from "../../components/Markdown/MarkdownRenderer";
import RelatedItemGrid from "../../components/Concepts/CodingToolDetailPage/RelatedItemGrid";
import AIChat from "../../components/CompanyInformation/AIChat";
import AddTodoModal from "../../components/CompanyInformation/AddTodoModal";


export default function ThirdPartyDetailPage() {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();

  const [showAIChat, setShowAIChat] = useState(false);
  const [showTodoModal, setShowTodoModal] = useState<false | "documentation" | "clone_project">(false);

  // 데이터 예외 처리
  if (!service) {
    return (
      <div className="p-8 text-center">
        <p className="text-gray-600">Service not found.</p>
        <button
          onClick={() => navigate("/third-partys")}
          className="px-4 py-2 mt-4 text-white bg-blue-600 rounded-lg"
        >
          Back to Services
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-5xl p-8 mx-auto">
      {/* 1. 뒤로가기 버튼 */}
      <BackButton to="/third-partys" label="Back to Services" />

      <div className="p-8 mb-6 bg-white border border-gray-200 rounded-lg">
        {/* 2. 서비스 상단 정보 섹션 */}
        <ThirdPartyHeader
          name={service.name}
          category={service.category}
          description={service.description}
          tags={service.tags}
          officialSite={service.officialSite}
        />

        <div className="my-8 border-t border-gray-100" />

        {/* 3. 액션 버튼 섹션 */}
        <ThirdPartyActionButtons
          onShowAIChat={() => setShowAIChat(true)}
          onAddTodo={(type) => setShowTodoModal(type)}
        />

        {/* 4. 마크다운 본문 콘텐츠 */}
        <div className="prose max-w-none">
          <MarkdownRenderer content={service.content} />
        </div>
      </div>

      {/* 5. 연관 서비스 그리드 (재사용) */}
      <RelatedItemGrid
        title="Related Services & Concepts"
        items={service.relatedConcepts}
        basePath="/third-partys"
      />

      {/* 모달 컴포넌트 레이어 */}
      <AIChat
        isOpen={showAIChat}
        onClose={() => setShowAIChat(false)}
        conceptName={service.name}
      />

      {showTodoModal && (
        <AddTodoModal
          isOpen
          onClose={() => setShowTodoModal(false)}
          conceptName={service.name}
          todoType={showTodoModal}
        />
      )}
    </div>
  );
}
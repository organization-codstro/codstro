import { useNavigate, useParams } from "react-router-dom";
import { library } from "../../data/Concepts/librarys";
import { useState } from "react";
import BackButton from "../../components/Concepts/BackButton";
import LibraryHeader from "../../components/Concepts/LibraryDetailPage/LibraryHeader";
import LibraryActionButtons from "../../components/Concepts/LibraryDetailPage/LibraryActionButtons";
import MarkdownRenderer from "../../components/Markdown/MarkdownRenderer";
import RelatedItemGrid from "../../components/Concepts/CodingToolDetailPage/RelatedItemGrid";
import AIChat from "../../components/CompanyInformation/AIChat";
import AddTodoModal from "../../components/CompanyInformation/AddTodoModal";


export default function LibraryDetail() {
  const { libraryId } = useParams<{ libraryId: string }>();
  const navigate = useNavigate();
  const [showAIChat, setShowAIChat] = useState(false);
  const [showTodoModal, setShowTodoModal] = useState<
    false | "documentation" | "clone_project"
  >(false);

  // 데이터 예외 처리
  if (!library) {
    
  }

  return (
    <div className="max-w-5xl p-8 mx-auto">
      {/* 1. 뒤로가기 */}
      <BackButton to="/libraries" label="Back to Libraries" />

      <div className="p-8 mb-6 bg-white border border-gray-200 rounded-lg">
        {/* 2. 라이브러리 상단 정보 */}
        <LibraryHeader
          name={library.name}
          language={library.language}
          description={library.description}
          tags={library.tags}
          officialSite={library.officialSite}
        />
        <div className="my-8 border-t border-gray-100" /> {/* 구분선 */}
        {/* 3. 액션 버튼 */}
        <LibraryActionButtons
          onShowAIChat={() => setShowAIChat(true)}
          onAddTodo={(type) => setShowTodoModal(type)}
        />
        {/* 4. 마크다운 본문 */}
        <div className="prose max-w-none">
          <MarkdownRenderer content={library.content} />
        </div>
      </div>

      {/* 5. 연관 아이템 그리드 (공용 컴포넌트 재사용) */}
      <RelatedItemGrid
        title="Related Concepts"
        items={library.relatedConcepts}
        basePath="/basic-concepts"
      />

      {/* 모달 레이어 */}
      <AIChat
        isOpen={showAIChat}
        onClose={() => setShowAIChat(false)}
        conceptName={library.name}
      />

      {showTodoModal && (
        <AddTodoModal
          isOpen
          onClose={() => setShowTodoModal(false)}
          conceptName={library.name}
          todoType={showTodoModal}
        />
      )}
    </div>
  );
}

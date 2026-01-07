import { useParams } from "react-router-dom";
import { useState } from "react";
import { tool } from "../../data/Concepts/tools";

// 공통 컴포넌트
import AIChat from "../../components/CompanyInformation/AIChat";
import AddTodoModal from "../../components/CompanyInformation/AddTodoModal";
import MarkdownRenderer from "../../components/Markdown/MarkdownRenderer";
import BackButton from "../../components/Concepts/BackButton";
import ToolHeader from "../../components/Concepts/CodingToolDetailPage/ToolHeader";
import ToolActionButtons from "../../components/Concepts/CodingToolDetailPage/ToolActionButtons";
import RelatedItemGrid from "../../components/Concepts/CodingToolDetailPage/RelatedItemGrid";

export default function CodingToolDetailPage() {
  const { toolId } = useParams<{ toolId: string }>();
  const [showAIChat, setShowAIChat] = useState(false);
  const [showTodoModal, setShowTodoModal] = useState<
    false | "documentation" | "clone_project"
  >(false);

  if (!tool) return <p className="p-8">Concept not found.</p>;

  return (
    <div className="max-w-5xl p-8 mx-auto">
      <BackButton to="/coding-tools" label="Back to Tools" />

      <div className="p-8 mb-6 bg-white border border-gray-200 rounded-lg">
        <ToolHeader
          name={tool.name}
          category={tool.category}
          description={tool.description}
          tags={tool.tags}
          isUnderstood={tool.isUnderstood}
        />

        <ToolActionButtons
          onShowAIChat={() => setShowAIChat(true)}
          onAddTodo={(type) => setShowTodoModal(type)}
        />

        <div className="prose max-w-none">
          <MarkdownRenderer content={tool.content} />
        </div>
      </div>

      {/* 연관 아이템 그리드 적용 */}
      <RelatedItemGrid
        title="Related Tools"
        items={tool.relatedConcepts}
        basePath="/coding-tools"
      />

      <AIChat
        isOpen={showAIChat}
        onClose={() => setShowAIChat(false)}
        conceptName={tool.name}
      />

      {showTodoModal && (
        <AddTodoModal
          isOpen={true}
          onClose={() => setShowTodoModal(false)}
          conceptName={tool.name}
          todoType={showTodoModal}
        />
      )}
    </div>
  );
}

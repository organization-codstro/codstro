import { ArrowLeft, MessageCircle, CheckCircle } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { tool } from "../../data/Concepts/tools";
import MarkdownRenderer from "../../components/Markdown/MarkdownRenderer";
import { useState } from "react";
import AIChat from "../../components/CompanyInformation/AIChat";
import AddTodoModal from "../../components/CompanyInformation/AddTodoModal";

export default function BasicConceptDetail() {
  const { toolId } = useParams<{ toolId: string }>();
  const navigate = useNavigate();
  const [showAIChat, setShowAIChat] = useState(false);
  const [showTodoModal, setShowTodoModal] = useState<
    false | "documentation" | "clone_project"
  >(false);

  if (!tool) return <p className="p-8">Concept not found.</p>;

  return (
    <div className="max-w-5xl p-8 mx-auto">
      <button
        onClick={() => navigate("/coding-tools")}
        className="flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Concepts
      </button>

      <div className="p-8 mb-6 bg-white border border-gray-200 rounded-lg">
        <div className="flex items-start justify-between mb-6">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-gray-900">{tool.name}</h1>
              <span className="px-3 py-1 text-sm text-gray-600 bg-gray-100 rounded">
                {tool.category}
              </span>
            </div>
            <p className="mb-4 text-gray-600">{tool.description}</p>
            <div className="flex flex-wrap gap-2 mb-4">
              {tool.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 text-sm text-green-600 rounded-full bg-green-50"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
          <button
            className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
              tool.isUnderstood
                ? "bg-green-100 text-green-700"
                : "border border-gray-300 hover:bg-gray-50"
            }`}
          >
            <CheckCircle className="w-4 h-4" />
            {tool.isUnderstood ? "Understood" : "Mark as Understood"}
          </button>
        </div>

        <div className="flex gap-3 mb-8">
          <button
            onClick={() => setShowAIChat(true)}
            className="flex items-center gap-2 px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            Chat with AI
          </button>
          <button
            onClick={() => setShowTodoModal("documentation")}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            Add Todo: Explore Documentation
          </button>
          <button
            onClick={() => setShowTodoModal("clone_project")}
            className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <MessageCircle className="w-4 h-4" />
            Add Todo: Build Clone Project
          </button>
        </div>

        <div className="prose max-w-none">
          <MarkdownRenderer content={tool.content} />
        </div>
      </div>

      <div className="p-6 bg-white border border-gray-200 rounded-lg">
        <h2 className="mb-4 text-xl font-bold text-gray-900">
          Related Concepts
        </h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {tool.relatedConcepts?.map((related) => (
            <button
              key={related.id}
              className="w-full p-4 text-left transition-all bg-white border border-gray-200 rounded-lg cursor-pointer hover:border-green-400 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-green-300"
              onClick={() => navigate(`/coding-tools/${related.id}`)}
            >
              <h3 className="mb-1 font-semibold text-gray-900">
                {related.name}
              </h3>
              <p className="text-xs text-gray-500 capitalize">{related.type}</p>
            </button>
          ))}
        </div>
      </div>

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

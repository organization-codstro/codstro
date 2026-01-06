import { ArrowLeft, MessageCircle, ExternalLink, Plus } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { service } from "../../data/Concepts/thirdPartyServices";
import MarkdownRenderer from "../../components/Markdown/MarkdownRenderer";
import AIChat from "../../components/CompanyInformation/AIChat";
import AddTodoModal from "../../components/CompanyInformation/AddTodoModal";

export default function ThirdPartyDetail() {
  const { serviceId } = useParams<{ serviceId: string }>();
  const navigate = useNavigate();

  const [showAIChat, setShowAIChat] = useState(false);
  const [showTodoModal, setShowTodoModal] = useState<
    false | "documentation" | "clone_project"
  >(false);

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
      <button
        onClick={() => navigate("/third-partys")}
        className="flex items-center gap-2 mb-6 text-gray-600 hover:text-gray-900"
      >
        <ArrowLeft className="w-5 h-5" />
        Back to Services
      </button>

      {/* Service Info */}
      <div className="p-8 mb-6 bg-white border border-gray-200 rounded-lg">
        <div className="flex items-start justify-between mb-6">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <h1 className="text-3xl font-bold text-gray-900">
                {service.name}
              </h1>
              <span className="px-3 py-1 text-sm text-gray-600 bg-gray-100 rounded">
                {service.category}
              </span>
            </div>

            <p className="mb-4 text-gray-600">{service.description}</p>

            <div className="flex flex-wrap gap-2 mb-4">
              {service.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 text-sm text-orange-600 rounded-full bg-orange-50"
                >
                  {tag}
                </span>
              ))}
            </div>

            <a
              href={service.officialSite}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-blue-600 hover:text-blue-700"
            >
              <ExternalLink className="w-4 h-4" />
              Official Website
            </a>
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-wrap gap-3 mb-8">
          <button
            onClick={() => setShowAIChat(true)}
            className="flex items-center gap-2 px-4 py-2 text-white transition-colors bg-blue-600 rounded-lg hover:bg-blue-700"
          >
            <MessageCircle className="w-4 h-4" />
            Chat with AI
          </button>

          <button
            onClick={() => setShowTodoModal("documentation")}
            className="flex items-center gap-2 px-4 py-2 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Plus className="w-4 h-4" />
            Add Todo: Explore Documentation
          </button>

          <button
            onClick={() => setShowTodoModal("clone_project")}
            className="flex items-center gap-2 px-4 py-2 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            <Plus className="w-4 h-4" />
            Add Todo: Build Clone Project
          </button>
        </div>

        {/* Content */}
        <div className="prose max-w-none">
          <MarkdownRenderer content={service.content} />
        </div>
      </div>

      {/* Related */}
      <div className="p-6 bg-white border border-gray-200 rounded-lg">
        <h2 className="mb-4 text-xl font-bold text-gray-900">
          Related Services & Concepts
        </h2>
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
          {service.relatedConcepts.map((related) => (
            <button
              key={related.id}
              onClick={() => navigate(`/third-partys/${related.id}`)}
              className="w-full p-4 text-left transition-all bg-white border border-gray-200 rounded-lg hover:border-green-400 hover:shadow-md focus:outline-none focus:ring-2 focus:ring-green-300"
            >
              <h3 className="mb-1 font-semibold text-gray-900">
                {related.name}
              </h3>
              <p className="text-xs text-gray-500 capitalize">{related.type}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Modals */}
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

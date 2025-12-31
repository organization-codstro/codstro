import { useState } from "react";
import { ArrowLeft, Save, Edit2 } from "lucide-react";
import { mockUserRecord } from "../../data/AiChat/mockData";
import { useNavigate } from "react-router-dom";

export default function UserInfo() {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [content, setContent] = useState(mockUserRecord.ai_user_record_summary);

  const handleSave = () => {
    // 실제 저장 로직은 필요시 추가
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col h-screen bg-gray-50">
      <div className="p-4 bg-white border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => navigate("/ai-chat")}
              className="p-2 transition-colors rounded-full hover:bg-gray-100"
            >
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="text-2xl font-bold text-gray-800">
                User Information
              </h1>
              <p className="text-sm text-gray-500">
                Last updated:{" "}
                {new Date(
                  mockUserRecord.ai_user_record_created_date
                ).toLocaleDateString()}
              </p>
            </div>
          </div>

          {!isEditing ? (
            <button
              onClick={() => setIsEditing(true)}
              className="flex items-center gap-2 px-4 py-2 font-medium text-white transition-opacity rounded-lg hover:opacity-90"
              style={{ backgroundColor: "#587CF0" }}
            >
              <Edit2 size={18} />
              Edit
            </button>
          ) : (
            <button
              onClick={handleSave}
              className="flex items-center gap-2 px-4 py-2 font-medium text-white transition-opacity rounded-lg hover:opacity-90"
              style={{ backgroundColor: "#587CF0" }}
            >
              <Save size={18} />
              Save
            </button>
          )}
        </div>
      </div>

      <div className="flex-1 p-6 overflow-y-auto">
        <div className="max-w-4xl mx-auto">
          <div className="p-8 bg-white border border-gray-200 rounded-xl">
            <div className="mb-6">
              <h2 className="flex items-center gap-2 mb-2 text-lg font-bold text-gray-900">
                <span
                  className="w-1 h-6 rounded-full"
                  style={{ backgroundColor: "#587CF0" }}
                ></span>
                Your Profile Summary
              </h2>
              <p className="text-sm text-gray-600">
                This information is collected from your interactions with AI and
                helps personalize your experience.
              </p>
            </div>

            {isEditing ? (
              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className="w-full min-h-[400px] p-4 border border-gray-300 rounded-lg focus:ring-2 focus:border-transparent outline-none resize-none text-gray-700 leading-relaxed"
                style={{ "--tw-ring-color": "#587CF0" } as React.CSSProperties}
                placeholder="Write about yourself..."
              />
            ) : (
              <div className="prose max-w-none">
                <p className="leading-relaxed text-gray-700 whitespace-pre-wrap">
                  {content}
                </p>
              </div>
            )}
          </div>

          <div
            className="p-4 mt-6 rounded-lg"
            style={{ backgroundColor: "#E8EFFE" }}
          >
            <p className="text-sm" style={{ color: "#587CF0" }}>
              <strong>Note:</strong> This information is automatically generated
              through your conversations and can be edited anytime to reflect
              your preferences.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

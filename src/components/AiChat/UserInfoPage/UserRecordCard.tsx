import { UserRecordCardProps } from "../../../types/pages/AiChat/UserInfoPage/UserRecordCard";

export const UserRecordCard = ({
  isEditing,
  content,
  onContentChange,
}: UserRecordCardProps) => {
  return (
    <div className="p-8 bg-white border border-gray-200 rounded-xl">
      <div className="mb-6">
        <h2 className="flex items-center gap-2 mb-2 text-lg font-bold text-gray-900">
          <div
            className="w-1 h-6 rounded-full"
            style={{ backgroundColor: "#587CF0" }}
          />
          Your Profile Summary
        </h2>
        <p className="text-sm text-gray-600">
          This information is collected from your interactions with AI and helps
          personalize your experience.
        </p>
      </div>

      {isEditing ? (
        <textarea
          value={content}
          onChange={(e) => onContentChange(e.target.value)}
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
  );
};

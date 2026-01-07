import { useNavigate } from "react-router-dom";
import { Calendar } from "lucide-react";

export const MeetingHeader = () => {
  const navigate = useNavigate();

  return (
    <div className="px-8 py-6 bg-white border-b border-gray-200">
      <div className="flex items-center max-w-4xl gap-4 mx-auto">
        <button
          onClick={() => navigate("/projects/meetings")}
          className="p-2 rounded-full hover:bg-gray-100"
        >
          <Calendar className="w-5 h-5 text-gray-600" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Create Meeting</h1>
          <p className="mt-1 text-gray-600">
            Discuss your project with AI assistance
          </p>
        </div>
      </div>
    </div>
  );
};

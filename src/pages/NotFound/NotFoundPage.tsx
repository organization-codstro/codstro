import { Home, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

export const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-br from-blue-50 to-purple-50">
      <div className="max-w-md text-center">
        <div className="mb-8">
          <div className="inline-block">
            <div
              className="flex items-center justify-center w-40 h-40 rounded-full bg-gradient-to-br from-blue-400 to-purple-400"
              style={{
                background: "linear-gradient(135deg, #587CF0 0%, #7F9FE8 100%)",
              }}
            >
              <span className="font-bold text-white text-7xl">404</span>
            </div>
          </div>
        </div>

        <h1 className="mb-3 text-4xl font-bold text-gray-900">
          페이지를 찾을 수 없습니다
        </h1>

        <p className="mb-8 text-lg text-gray-600">
          요청하신 페이지가 존재하지 않습니다. 페이지가 이동되었거나 삭제되었을
          수 있습니다.
        </p>

        <div className="space-y-3 sm:space-y-0 sm:flex sm:gap-3 sm:justify-center">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center justify-center w-full gap-2 px-6 py-3 font-medium text-gray-700 transition-colors border-2 border-gray-300 rounded-lg sm:w-auto hover:border-gray-400 hover:bg-gray-50"
          >
            <ArrowLeft className="w-5 h-5" />
            이전 페이지
          </button>

          <button
            onClick={() => navigate("/woomoonjeong")}
            className="flex items-center justify-center w-full gap-2 px-6 py-3 font-medium text-white transition-opacity rounded-lg sm:w-auto hover:opacity-90"
            style={{ backgroundColor: "#587CF0" }}
          >
            <Home className="w-5 h-5" />
            홈으로 이동
          </button>
        </div>

        <div className="pt-8 mt-12 border-t border-gray-200">
          <p className="mb-4 text-sm text-gray-500">Codstro</p>
          <p className="text-xs text-gray-400">
            문제가 있다고 생각되면 관리자에게 문의해주세요.
          </p>
        </div>
      </div>
    </div>
  );
};

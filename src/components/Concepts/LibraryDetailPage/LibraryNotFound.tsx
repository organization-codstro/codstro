import { useNavigate } from "react-router-dom";
import { NotFoundViewProps } from "../../../types/pages/CompanyInformation/NotFoundView";

export const LibraryNotFound = ({
  message = "Library not found.",
}: NotFoundViewProps) => {
  const navigate = useNavigate();
  return (
    <div className="p-8 text-center">
      <p className="text-gray-600">{message}</p>
      <button
        onClick={() => navigate("/libraries")}
        className="px-4 py-2 mt-4 text-white bg-blue-600 rounded-lg"
      >
        Back to Libraries
      </button>
    </div>
  );
};

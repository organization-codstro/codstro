import React from "react";
import { Plus } from "lucide-react";

interface ManagementHeaderProps {
  onCreateDocument: () => void;
  onCreateField: () => void;
}

const ManagementHeader: React.FC<ManagementHeaderProps> = ({
  onCreateDocument,
  onCreateField,
}) => {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Documents Management
        </h1>
        <p className="text-gray-600">
          Organize your learning documents by groups and fields
        </p>
      </div>
      <div className="flex items-center gap-4">
        <button
          onClick={onCreateDocument}
          className="px-4 py-2 bg-[#587CF0] text-white rounded-lg font-medium hover:bg-[#4a6de8] transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add document
        </button>
        <button
          onClick={onCreateField}
          className="px-4 py-2 bg-[#587CF0] text-white rounded-lg font-medium hover:bg-[#4a6de8] transition-colors flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Add Field
        </button>
      </div>
    </div>
  );
};

export default ManagementHeader;

import React from "react";
import { AlertTriangle, X } from "lucide-react";
import { SaveDraftWarningModalProps } from "../../../types/pages/ProjectPlanning/ProjectInfoGeneratePage/SaveDraftWarningModal";

export const SaveDraftWarningModal: React.FC<SaveDraftWarningModalProps> = ({
  isOpen,
  todoCount,
  onConfirm,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="w-full max-w-md p-6 mx-4 bg-white rounded-lg shadow-xl">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-yellow-500" />
            <h3 className="text-lg font-semibold text-gray-900">
              임시 저장 주의
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="mb-6 space-y-2">
          <p className="text-sm text-gray-700">
            현재{" "}
            <span className="font-semibold text-red-500">{todoCount}개</span>의
            Project Task가 있습니다.
          </p>
          <p className="text-sm text-gray-500">
            임시 저장 시 Project Tasks는 저장되지 않을 수 있습니다.
            <br />
            그래도 저장하시겠습니까?
          </p>
        </div>

        <div className="flex justify-end gap-3">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            취소
          </button>
          <button
            type="button"
            onClick={onConfirm}
            className="px-4 py-2 text-sm font-medium text-white rounded-lg"
            style={{ backgroundColor: "#587CF0" }}
          >
            저장
          </button>
        </div>
      </div>
    </div>
  );
};

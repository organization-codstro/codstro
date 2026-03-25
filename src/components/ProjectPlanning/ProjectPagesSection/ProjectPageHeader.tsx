//페이지의 제목줄 및 액션 버튼 - 페이지의 제목, 기능 설명, 그리고 편집/삭제 버튼을 담당

import React from "react";
import { ChevronDown, ChevronUp, Edit2, Save, X, Trash2 } from "lucide-react";
import { PageHeaderProps } from "../../../types/pages/ProjectPlanning/ProjectPagesSection/ProjectPageHeader";

export const ProjectPageHeader: React.FC<PageHeaderProps> = ({
  page,
  isEditing,
  isExpanded,
  isPagePending,
  onToggleExpand,
  onUpdateField,
  onSave,
  onCancel,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="flex items-center justify-between p-4 bg-gray-50">
      <button
        type="button"
        className="flex-1 text-left transition-colors rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
        onClick={onToggleExpand}
      >
        <div className="flex items-center justify-between">
          <div className="flex-1">
            {isEditing ? (
              <div className="space-y-1" onClick={(e) => e.stopPropagation()}>
                <input
                  type="text"
                  value={page.project_page_name}
                  onChange={(e) =>
                    onUpdateField("project_page_name", e.target.value)
                  }
                  className="w-full px-2 py-1 text-base font-medium text-gray-900 border border-blue-300 rounded focus:ring-2 focus:ring-blue-400"
                />
                <input
                  type="text"
                  value={page.project_page_function}
                  onChange={(e) =>
                    onUpdateField("project_page_function", e.target.value)
                  }
                  className="w-full px-2 py-1 text-sm text-gray-600 border border-blue-300 rounded focus:ring-2 focus:ring-blue-400"
                />
              </div>
            ) : (
              <>
                <h3 className="font-medium text-gray-900">
                  {page.project_page_name}
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  {page.project_page_function}
                </p>
              </>
            )}
          </div>
          {isExpanded ? (
            <ChevronUp className="w-5 h-5 text-gray-400" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-400" />
          )}
        </div>
      </button>

      <div className="flex items-center ml-2 space-x-2 shrink-0">
        {isEditing ? (
          <div className="flex items-center space-x-1">
            <button
              onClick={onSave}
              className="p-2 text-green-600 rounded-md bg-green-50 hover:bg-green-100"
              title="Save"
            >
              <Save className="w-4 h-4" />
            </button>
            <button
              onClick={onCancel}
              className="p-2 text-red-600 rounded-md bg-red-50 hover:bg-red-100"
              title="Cancel"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        ) : onEdit || onDelete ? (
          <div className="flex items-center space-x-1">
            {onEdit && (
              <button
                onClick={onEdit}
                className="p-2 text-blue-600 transition-all bg-white border border-gray-200 rounded-md shadow-sm hover:bg-blue-50"
                title="Edit Page"
              >
                <Edit2 className="w-4 h-4" />
              </button>
            )}
            {onDelete && (
              <button
                onClick={onDelete}
                className={`p-2 transition-all rounded-md border ${
                  isPagePending
                    ? "bg-red-500 text-white border-red-500 shadow-md scale-105"
                    : "text-gray-400 bg-white border-gray-200 hover:text-red-500 hover:bg-red-50"
                }`}
                title={isPagePending ? "한 번 더 눌러서 삭제" : "Delete Page"}
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
        ) : null}
      </div>
    </div>
  );
};

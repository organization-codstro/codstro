import React from "react";
import { ChevronDown, ChevronUp, Calendar } from "lucide-react";
import { ProjectPage, Todo } from "../../types/ProjectPlanning/project";

interface ProjectPagesSectionProps {
  pages: Array<ProjectPage & { todos: Todo[] }>;
  expandedPage: number | null;
  setExpandedPage: (id: number | null) => void;
  getStatusColor: (status: string) => string;
}

export const ProjectPagesSection: React.FC<ProjectPagesSectionProps> = ({
  pages,
  expandedPage,
  setExpandedPage,
  getStatusColor,
}) => {
  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg">
      <h2 className="mb-4 text-lg font-semibold text-gray-900">
        Project Pages
      </h2>

      <div className="space-y-3">
        {pages.map((page) => (
          <div
            key={page.project_page_id}
            className="overflow-hidden border border-gray-200 rounded-lg"
          >
            <button
              type="button"
              className="w-full p-4 text-left transition-colors bg-gray-50 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
              onClick={() =>
                setExpandedPage(
                  expandedPage === page.project_page_id
                    ? null
                    : page.project_page_id
                )
              }
            >
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <h3 className="font-medium text-gray-900">
                    {page.project_page_name}
                  </h3>
                  <p className="mt-1 text-sm text-gray-600">
                    {page.project_page_function}
                  </p>
                </div>
                {expandedPage === page.project_page_id ? (
                  <ChevronUp className="w-5 h-5 text-gray-400" />
                ) : (
                  <ChevronDown className="w-5 h-5 text-gray-400" />
                )}
              </div>
            </button>

            {expandedPage === page.project_page_id && (
              <div className="p-4 space-y-2 bg-white">
                {page.todos.map((todo) => (
                  <div
                    key={todo.todo_id}
                    className="p-3 border border-gray-200 rounded"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium text-gray-900">
                        {todo.todo_name}
                      </span>
                      <span
                        className={`px-2 py-1 rounded text-xs text-white ${getStatusColor(
                          todo.todo_status
                        )}`}
                      >
                        {todo.todo_status}
                      </span>
                    </div>

                    <p className="text-xs text-gray-600">
                      {todo.todo_description}
                    </p>

                    <div className="flex items-center mt-2 space-x-2 text-xs text-gray-500">
                      <Calendar className="w-3 h-3" />
                      <span>
                        {todo.todo_start_date} - {todo.todo_end_date}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

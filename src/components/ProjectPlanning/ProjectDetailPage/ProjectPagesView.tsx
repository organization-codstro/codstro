import { ProjectPagesViewProps } from "../../../types/ProjectPlanning/ProjectDetailPage/ProjectPagesView";

export const ProjectPagesView = ({ pages }: ProjectPagesViewProps) => {
  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg">
      <h2 className="mb-4 text-lg font-semibold text-gray-900">
        Pages ({pages.length})
      </h2>
      <div className="space-y-4">
        {pages.map((page) => (
          <div
            key={page.project_page_id}
            className="p-4 border border-gray-200 rounded-lg"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h3 className="font-medium text-gray-900">
                  {page.project_page_name}
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  {page.project_page_role}
                </p>
                <p className="mt-1 text-sm text-gray-500">
                  {page.project_page_function}
                </p>
              </div>
              <span
                className={`px-2 py-1 text-xs font-medium rounded ${
                  page.project_page_is_complete
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {page.project_page_is_complete ? "Complete" : "In Progress"}
              </span>
            </div>
            {page.todos && page.todos.length > 0 && (
              <div className="pl-3 mt-3 ml-4 border-l-2 border-gray-200">
                <p className="mb-2 text-xs font-medium text-gray-500">
                  Tasks ({page.todos.length})
                </p>
                {page.todos.map((todo) => (
                  <div key={todo.id} className="mb-2 text-sm text-gray-700">
                    • {todo.name}
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

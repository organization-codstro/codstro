import React, { useState } from "react";
import { ChevronDown, ChevronUp, Calendar, Edit2, Save, X } from "lucide-react";
import { ProjectPage, Todo } from "../../types/ProjectPlanning/project";

interface ProjectPagesSectionProps {
  pages: Array<ProjectPage & { todos: Todo[] }>;
  expandedPage: number | null;
  setExpandedPage: (id: number | null) => void;
  getStatusColor: (status: string) => string;
  onUpdatePage?: (
    pageId: number,
    updates: Partial<ProjectPage & { todos: Todo[] }>
  ) => void;
  onUpdateTodo?: (pageId: number, todoId: number, updates: Partial<Todo>) => void;
  onDeleteTodo?: (pageId: number, todoId: number) => void;
  onAddTodo?: (pageId: number, newTodo: Todo) => void;
}

export const ProjectPagesSection: React.FC<ProjectPagesSectionProps> = ({
  pages,
  expandedPage,
  setExpandedPage,
  getStatusColor,
  onUpdatePage,
  onUpdateTodo,
  onDeleteTodo,
  onAddTodo,
}) => {
  const [editingPageId, setEditingPageId] = useState<number | null>(null);
  const [editingTodoId, setEditingTodoId] = useState<{
    pageId: number;
    todoId: number;
  } | null>(null);
  const [editedPages, setEditedPages] = useState<
    Array<ProjectPage & { todos: Todo[] }>
  >(pages);

  React.useEffect(() => {
    setEditedPages(pages);
  }, [pages]);

  const handleStartEdit = (pageId: number) => {
    setEditingPageId(pageId);
  };

  const handleCancelEdit = (pageId: number) => {
    setEditingPageId(null);
    // 원본 데이터로 복원
    const originalPage = pages.find((p) => p.project_page_id === pageId);
    if (originalPage) {
      setEditedPages((prev) =>
        prev.map((p) =>
          p.project_page_id === pageId ? originalPage : p
        )
      );
    }
  };

  const handleSaveEdit = (pageId: number) => {
    const editedPage = editedPages.find((p) => p.project_page_id === pageId);
    if (editedPage && onUpdatePage) {
      onUpdatePage(pageId, editedPage);
    }
    setEditingPageId(null);
  };

  const updatePageField = (
    pageId: number,
    field: keyof ProjectPage,
    value: string | boolean
  ) => {
    setEditedPages((prev) =>
      prev.map((page) =>
        page.project_page_id === pageId
          ? { ...page, [field]: value }
          : page
      )
    );
  };

  const updateTodoField = (
    pageId: number,
    todoId: number,
    field: keyof Todo,
    value: string
  ) => {
    setEditedPages((prev) =>
      prev.map((page) => {
        if (page.project_page_id === pageId) {
          return {
            ...page,
            todos: page.todos.map((todo) =>
              todo.todo_id === todoId ? { ...todo, [field]: value } : todo
            ),
          };
        }
        return page;
      })
    );
  };

  const handleStartEditTodo = (pageId: number, todoId: number) => {
    setEditingTodoId({ pageId, todoId });
  };

  const handleCancelEditTodo = () => {
    setEditingTodoId(null);
    // 원본 데이터로 복원
    const originalPage = pages.find(
      (p) => p.project_page_id === editingTodoId?.pageId
    );
    if (originalPage && editingTodoId) {
      setEditedPages((prev) =>
        prev.map((page) =>
          page.project_page_id === editingTodoId.pageId ? originalPage : page
        )
      );
    }
  };

  const handleSaveEditTodo = (pageId: number, todoId: number) => {
    const page = editedPages.find((p) => p.project_page_id === pageId);
    const todo = page?.todos.find((t) => t.todo_id === todoId);
    if (todo && onUpdateTodo) {
      onUpdateTodo(pageId, todoId, todo);
    }
    setEditingTodoId(null);
  };

  const handleDeleteTodo = (pageId: number, todoId: number) => {
    if (onDeleteTodo) {
      onDeleteTodo(pageId, todoId);
      setEditedPages((prev) =>
        prev.map((page) => {
          if (page.project_page_id === pageId) {
            return {
              ...page,
              todos: page.todos.filter((t) => t.todo_id !== todoId),
            };
          }
          return page;
        })
      );
    }
  };

  return (
    <div className="p-6 bg-white border border-gray-200 rounded-lg">
      <h2 className="mb-4 text-lg font-semibold text-gray-900">
        Project Pages
      </h2>

      <div className="space-y-3">
        {editedPages.map((page) => {
          const isEditing = editingPageId === page.project_page_id;
          const isExpanded = expandedPage === page.project_page_id;

          return (
            <div
              key={page.project_page_id}
              className="overflow-hidden border border-gray-200 rounded-lg"
            >
              <div className="flex items-center justify-between p-4 bg-gray-50">
                <button
                  type="button"
                  className="flex-1 text-left transition-colors hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded"
                  onClick={() =>
                    setExpandedPage(isExpanded ? null : page.project_page_id)
                  }
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      {isEditing ? (
                        <input
                          type="text"
                          value={page.project_page_name}
                          onChange={(e) =>
                            updatePageField(
                              page.project_page_id,
                              "project_page_name",
                              e.target.value
                            )
                          }
                          className="w-full px-2 py-1 mb-1 text-base font-medium text-gray-900 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                          onClick={(e) => e.stopPropagation()}
                        />
                      ) : (
                        <h3 className="font-medium text-gray-900">
                          {page.project_page_name}
                        </h3>
                      )}
                      {isEditing ? (
                        <input
                          type="text"
                          value={page.project_page_function}
                          onChange={(e) =>
                            updatePageField(
                              page.project_page_id,
                              "project_page_function",
                              e.target.value
                            )
                          }
                          className="w-full px-2 py-1 text-sm text-gray-600 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                          onClick={(e) => e.stopPropagation()}
                        />
                      ) : (
                        <p className="mt-1 text-sm text-gray-600">
                          {page.project_page_function}
                        </p>
                      )}
                    </div>
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5 text-gray-400" />
                    ) : (
                      <ChevronDown className="w-5 h-5 text-gray-400" />
                    )}
                  </div>
                </button>
                <div className="flex items-center ml-2 space-x-2">
                  {isEditing ? (
                    <>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSaveEdit(page.project_page_id);
                        }}
                        className="p-2 text-green-600 transition-colors rounded hover:bg-green-50"
                        title="Save"
                      >
                        <Save className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleCancelEdit(page.project_page_id);
                        }}
                        className="p-2 text-gray-600 transition-colors rounded hover:bg-gray-100"
                        title="Cancel"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </>
                  ) : (
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        handleStartEdit(page.project_page_id);
                      }}
                      className="p-2 text-gray-600 transition-colors rounded hover:bg-gray-100"
                      title="Edit"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {isExpanded && (
                <div className="p-4 space-y-4 bg-white">
                  {isEditing ? (
                    <div className="space-y-3">
                      <div>
                        <label className="block mb-1 text-xs font-medium text-gray-700">
                          Role
                        </label>
                        <input
                          type="text"
                          value={page.project_page_role}
                          onChange={(e) =>
                            updatePageField(
                              page.project_page_id,
                              "project_page_role",
                              e.target.value
                            )
                          }
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                      </div>
                      <div>
                        <label className="flex items-center space-x-2">
                          <input
                            type="checkbox"
                            checked={page.project_page_is_complete}
                            onChange={(e) =>
                              updatePageField(
                                page.project_page_id,
                                "project_page_is_complete",
                                e.target.checked
                              )
                            }
                            className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                          />
                          <span className="text-xs font-medium text-gray-700">
                            Mark as complete
                          </span>
                        </label>
                      </div>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="text-xs text-gray-500">
                        <span className="font-medium">Role:</span>{" "}
                        {page.project_page_role}
                      </div>
                      <div className="text-xs text-gray-500">
                        <span className="font-medium">Status:</span>{" "}
                        <span
                          className={`px-2 py-1 rounded ${
                            page.project_page_is_complete
                              ? "bg-green-100 text-green-700"
                              : "bg-gray-100 text-gray-700"
                          }`}
                        >
                          {page.project_page_is_complete
                            ? "Complete"
                            : "In Progress"}
                        </span>
                      </div>
                    </div>
                  )}

                  {page.todos && page.todos.length > 0 && (
                    <div className="pt-3 mt-3 border-t border-gray-200">
                      <div className="flex items-center justify-between mb-2">
                        <p className="text-xs font-medium text-gray-500">
                          Tasks ({page.todos.length})
                        </p>
                        {isEditing && onAddTodo && (
                          <button
                            type="button"
                            onClick={() => {
                              const newTodo: Todo = {
                                todo_id: Date.now(),
                                todo_name: "New Task",
                                todo_content: "",
                                todo_description: "",
                                todo_start_date: new Date()
                                  .toISOString()
                                  .split("T")[0],
                                todo_end_date: new Date()
                                  .toISOString()
                                  .split("T")[0],
                                todo_status: "waiting",
                                todo_created_date: new Date()
                                  .toISOString()
                                  .split("T")[0],
                                project_page_id: page.project_page_id,
                              };
                              onAddTodo(page.project_page_id, newTodo);
                              setEditedPages((prev) =>
                                prev.map((p) =>
                                  p.project_page_id === page.project_page_id
                                    ? { ...p, todos: [...p.todos, newTodo] }
                                    : p
                                )
                              );
                            }}
                            className="px-2 py-1 text-xs font-medium text-blue-600 hover:text-blue-700"
                          >
                            + Add Task
                          </button>
                        )}
                      </div>
                      <div className="space-y-2">
                        {page.todos.map((todo) => {
                          const isEditingTodo =
                            editingTodoId?.pageId === page.project_page_id &&
                            editingTodoId?.todoId === todo.todo_id;

                          return (
                            <div
                              key={todo.todo_id}
                              className="p-3 border border-gray-200 rounded"
                            >
                              <div className="flex items-start justify-between mb-2">
                                <div className="flex-1">
                                  {isEditingTodo ? (
                                    <input
                                      type="text"
                                      value={todo.todo_name}
                                      onChange={(e) =>
                                        updateTodoField(
                                          page.project_page_id,
                                          todo.todo_id,
                                          "todo_name",
                                          e.target.value
                                        )
                                      }
                                      className="w-full px-2 py-1 mb-2 text-sm font-medium text-gray-900 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    />
                                  ) : (
                                    <span className="text-sm font-medium text-gray-900">
                                      {todo.todo_name}
                                    </span>
                                  )}
                                  {isEditingTodo ? (
                                    <textarea
                                      value={todo.todo_description}
                                      onChange={(e) =>
                                        updateTodoField(
                                          page.project_page_id,
                                          todo.todo_id,
                                          "todo_description",
                                          e.target.value
                                        )
                                      }
                                      rows={2}
                                      className="w-full px-2 py-1 mt-1 text-xs text-gray-600 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    />
                                  ) : (
                                    <p className="mt-1 text-xs text-gray-600">
                                      {todo.todo_description}
                                    </p>
                                  )}
                                </div>
                                <div className="flex items-center space-x-2 ml-2">
                                  {isEditingTodo ? (
                                    <>
                                      <select
                                        value={todo.todo_status}
                                        onChange={(e) =>
                                          updateTodoField(
                                            page.project_page_id,
                                            todo.todo_id,
                                            "todo_status",
                                            e.target.value
                                          )
                                        }
                                        className="px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                                      >
                                        <option value="waiting">Waiting</option>
                                        <option value="in progress">
                                          In Progress
                                        </option>
                                        <option value="done">Done</option>
                                      </select>
                                      <button
                                        type="button"
                                        onClick={() =>
                                          handleSaveEditTodo(
                                            page.project_page_id,
                                            todo.todo_id
                                          )
                                        }
                                        className="p-1 text-green-600 hover:bg-green-50 rounded"
                                        title="Save"
                                      >
                                        <Save className="w-3 h-3" />
                                      </button>
                                      <button
                                        type="button"
                                        onClick={handleCancelEditTodo}
                                        className="p-1 text-gray-600 hover:bg-gray-100 rounded"
                                        title="Cancel"
                                      >
                                        <X className="w-3 h-3" />
                                      </button>
                                      {onDeleteTodo && (
                                        <button
                                          type="button"
                                          onClick={() =>
                                            handleDeleteTodo(
                                              page.project_page_id,
                                              todo.todo_id
                                            )
                                          }
                                          className="p-1 text-red-600 hover:bg-red-50 rounded"
                                          title="Delete"
                                        >
                                          <X className="w-3 h-3" />
                                        </button>
                                      )}
                                    </>
                                  ) : (
                                    <>
                                      <span
                                        className={`px-2 py-1 rounded text-xs text-white ${getStatusColor(
                                          todo.todo_status
                                        )}`}
                                      >
                                        {todo.todo_status}
                                      </span>
                                      {isEditing && (
                                        <button
                                          type="button"
                                          onClick={() =>
                                            handleStartEditTodo(
                                              page.project_page_id,
                                              todo.todo_id
                                            )
                                          }
                                          className="p-1 text-gray-600 hover:bg-gray-100 rounded"
                                          title="Edit"
                                        >
                                          <Edit2 className="w-3 h-3" />
                                        </button>
                                      )}
                                    </>
                                  )}
                                </div>
                              </div>

                              {isEditingTodo ? (
                                <div className="grid grid-cols-2 gap-2 mt-2">
                                  <div>
                                    <label className="block mb-1 text-xs text-gray-500">
                                      Start Date
                                    </label>
                                    <input
                                      type="date"
                                      value={todo.todo_start_date}
                                      onChange={(e) =>
                                        updateTodoField(
                                          page.project_page_id,
                                          todo.todo_id,
                                          "todo_start_date",
                                          e.target.value
                                        )
                                      }
                                      className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    />
                                  </div>
                                  <div>
                                    <label className="block mb-1 text-xs text-gray-500">
                                      End Date
                                    </label>
                                    <input
                                      type="date"
                                      value={todo.todo_end_date}
                                      onChange={(e) =>
                                        updateTodoField(
                                          page.project_page_id,
                                          todo.todo_id,
                                          "todo_end_date",
                                          e.target.value
                                        )
                                      }
                                      className="w-full px-2 py-1 text-xs border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    />
                                  </div>
                                </div>
                              ) : (
                                <div className="flex items-center mt-2 space-x-2 text-xs text-gray-500">
                                  <Calendar className="w-3 h-3" />
                                  <span>
                                    {todo.todo_start_date} - {todo.todo_end_date}
                                  </span>
                                </div>
                              )}
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

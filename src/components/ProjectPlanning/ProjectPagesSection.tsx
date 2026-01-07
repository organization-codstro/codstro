import React, { useState, useEffect } from "react";
import {
  ChevronDown,
  ChevronUp,
  Calendar,
  Edit2,
  Save,
  X,
  Trash2,
} from "lucide-react";
import { ProjectPage, Todo } from "../../types/ProjectPlanning/project";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProjectPagesSectionProps } from "../../types/ProjectPlanning/ProjectPagesSection";

export const ProjectPagesSection: React.FC<ProjectPagesSectionProps> = ({
  pages,
  expandedPage,
  setExpandedPage,
  getStatusColor,
  onUpdatePage,
  onUpdateTodo,
  onDeleteTodo,
  onDeletePage, // 추가
  onAddTodo,
}) => {
  const [editingPageId, setEditingPageId] = useState<number | null>(null);
  const [editingTodoId, setEditingTodoId] = useState<{
    pageId: number;
    todoId: number;
  } | null>(null);
  const [editedPages, setEditedPages] =
    useState<Array<ProjectPage & { todos: Todo[] }>>(pages);

  // 삭제 대기 상태 관리 (type: 'page' | 'todo')
  const [deletePending, setDeletePending] = useState<{
    type: "page" | "todo";
    id: number;
  } | null>(null);

  useEffect(() => {
    setEditedPages(pages);
  }, [pages]);

  // 3초 후 삭제 대기 해제
  useEffect(() => {
    if (deletePending) {
      const timer = setTimeout(() => setDeletePending(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [deletePending]);

  // 통합 삭제 핸들러
  const handleDeleteAction = (
    e: React.MouseEvent,
    type: "page" | "todo",
    id: number,
    parentPageId?: number
  ) => {
    e.stopPropagation();

    if (deletePending?.type === type && deletePending?.id === id) {
      if (type === "page" && onDeletePage) {
        onDeletePage(id);
        toast.success("페이지가 삭제되었습니다.");
      } else if (type === "todo" && onDeleteTodo && parentPageId) {
        onDeleteTodo(parentPageId, id);
        toast.success("작업이 삭제되었습니다.");
      }
      setDeletePending(null);
    } else {
      setDeletePending({ type, id });
    }
  };

  const handleStartEdit = (pageId: number) => setEditingPageId(pageId);
  const handleCancelEdit = (pageId: number) => {
    setEditingPageId(null);
    const originalPage = pages.find((p) => p.project_page_id === pageId);
    if (originalPage) {
      setEditedPages((prev) =>
        prev.map((p) => (p.project_page_id === pageId ? originalPage : p))
      );
    }
  };

  const handleSaveEdit = (pageId: number) => {
    const editedPage = editedPages.find((p) => p.project_page_id === pageId);
    if (editedPage && onUpdatePage) onUpdatePage(pageId, editedPage);
    setEditingPageId(null);
  };

  const updatePageField = (
    pageId: number,
    field: keyof ProjectPage,
    value: string | boolean
  ) => {
    setEditedPages((prev) =>
      prev.map((page) =>
        page.project_page_id === pageId ? { ...page, [field]: value } : page
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
              todo.id === todoId ? { ...todo, [field]: value } : todo
            ),
          };
        }
        return page;
      })
    );
  };

  const handleStartEditTodo = (pageId: number, todoId: number) =>
    setEditingTodoId({ pageId, todoId });
  const handleCancelEditTodo = () => setEditingTodoId(null);

  const handleSaveEditTodo = (pageId: number, todoId: number) => {
    const page = editedPages.find((p) => p.project_page_id === pageId);
    const todo = page?.todos.find((t) => t.id === todoId);
    if (todo && onUpdateTodo) onUpdateTodo(pageId, todoId, todo);
    setEditingTodoId(null);
  };

  return (
    <div
      className="p-6 bg-white border border-gray-200 rounded-lg"
      onClick={() => setDeletePending(null)}
    >
      <h2 className="mb-4 text-lg font-semibold text-gray-900">
        Project Pages
      </h2>

      <div className="space-y-3">
        {editedPages.map((page) => {
          const isEditing = editingPageId === page.project_page_id;
          const isExpanded = expandedPage === page.project_page_id;
          const isPagePending =
            deletePending?.type === "page" &&
            deletePending?.id === page.project_page_id;

          return (
            <div
              key={page.project_page_id}
              className="overflow-hidden border border-gray-200 rounded-lg"
            >
              <div className="flex items-center justify-between p-4 bg-gray-50">
                <button
                  type="button"
                  className="flex-1 text-left transition-colors rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-400"
                  onClick={() =>
                    setExpandedPage(isExpanded ? null : page.project_page_id)
                  }
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      {isEditing ? (
                        <>
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
                        </>
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
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSaveEdit(page.project_page_id);
                        }}
                        className="p-2 text-green-600 rounded-md bg-green-50 hover:bg-green-100"
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
                        className="p-2 text-red-600 rounded-md bg-red-50 hover:bg-red-100"
                        title="Cancel"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-1">
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStartEdit(page.project_page_id);
                        }}
                        className="p-2 text-blue-600 transition-all bg-white border border-gray-200 rounded-md shadow-sm hover:bg-blue-50"
                        title="Edit Page"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        type="button"
                        onClick={(e) =>
                          handleDeleteAction(e, "page", page.project_page_id)
                        }
                        className={`p-2 transition-all rounded-md border ${
                          isPagePending
                            ? "bg-red-500 text-white border-red-500 shadow-md scale-105"
                            : "text-gray-400 bg-white border-gray-200 hover:text-red-500 hover:bg-red-50"
                        }`}
                        title={
                          isPagePending ? "한 번 더 눌러서 삭제" : "Delete Page"
                        }
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
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
                              id: Date.now(),
                              name: "New Task",
                              content: "",
                              description: "",
                              start_date: new Date()
                                .toISOString()
                                .split("T")[0],
                              end_date: new Date().toISOString().split("T")[0],
                              status: "pending",
                              created_at: new Date()
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
                          editingTodoId?.todoId === todo.id;
                        const isTodoPending =
                          deletePending?.type === "todo" &&
                          deletePending?.id === todo.id;

                        return (
                          <div
                            key={todo.id}
                            className="p-3 border border-gray-200 rounded"
                          >
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex-1">
                                {isEditingTodo ? (
                                  <>
                                    <input
                                      type="text"
                                      value={todo.name}
                                      onChange={(e) =>
                                        updateTodoField(
                                          page.project_page_id,
                                          todo.id,
                                          "name",
                                          e.target.value
                                        )
                                      }
                                      className="w-full px-2 py-1 mb-2 text-sm font-medium text-gray-900 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    />
                                    <textarea
                                      value={todo.description}
                                      onChange={(e) =>
                                        updateTodoField(
                                          page.project_page_id,
                                          todo.id,
                                          "description",
                                          e.target.value
                                        )
                                      }
                                      rows={2}
                                      className="w-full px-2 py-1 mt-1 text-xs text-gray-600 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                                    />
                                  </>
                                ) : (
                                  <>
                                    <span className="text-sm font-medium text-gray-900">
                                      {todo.name}
                                    </span>
                                    <p className="mt-1 text-xs text-gray-600">
                                      {todo.description}
                                    </p>
                                  </>
                                )}
                              </div>
                              <div className="flex items-center ml-2 space-x-2">
                                {isEditingTodo ? (
                                  <div className="flex items-center space-x-1">
                                    <select
                                      value={todo.status}
                                      onChange={(e) =>
                                        updateTodoField(
                                          page.project_page_id,
                                          todo.id,
                                          "status",
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
                                          todo.id
                                        )
                                      }
                                      className="p-1 text-green-600 rounded hover:bg-green-50"
                                    >
                                      <Save className="w-3 h-3" />
                                    </button>
                                    <button
                                      type="button"
                                      onClick={handleCancelEditTodo}
                                      className="p-1 text-gray-600 rounded hover:bg-gray-100"
                                    >
                                      <X className="w-3 h-3" />
                                    </button>
                                  </div>
                                ) : (
                                  <div className="flex items-center space-x-1">
                                    <span
                                      className={`px-2 py-1 rounded text-xs text-white ${getStatusColor(
                                        todo.status
                                      )}`}
                                    >
                                      {todo.status}
                                    </span>
                                    {isEditing && (
                                      <button
                                        type="button"
                                        onClick={() =>
                                          handleStartEditTodo(
                                            page.project_page_id,
                                            todo.id
                                          )
                                        }
                                        className="p-1 text-gray-400 hover:text-blue-500"
                                      >
                                        <Edit2 className="w-3 h-3" />
                                      </button>
                                    )}
                                    <button
                                      type="button"
                                      onClick={(e) =>
                                        handleDeleteAction(
                                          e,
                                          "todo",
                                          todo.id,
                                          page.project_page_id
                                        )
                                      }
                                      className={`p-1 transition-all rounded ${
                                        isTodoPending
                                          ? "bg-red-500 text-white scale-110"
                                          : "text-gray-400 hover:text-red-500 hover:bg-red-50"
                                      }`}
                                    >
                                      <Trash2 className="w-3 h-3" />
                                    </button>
                                  </div>
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
                                    value={todo.start_date}
                                    onChange={(e) =>
                                      updateTodoField(
                                        page.project_page_id,
                                        todo.id,
                                        "start_date",
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
                                    value={todo.end_date}
                                    onChange={(e) =>
                                      updateTodoField(
                                        page.project_page_id,
                                        todo.id,
                                        "end_date",
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
                                  {todo.start_date} - {todo.end_date}
                                </span>
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

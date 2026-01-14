import React, { useState, useEffect } from "react";
import {
  ProjectPage,
  Todo,
} from "../../../types/pages/ProjectPlanning/project";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProjectPagesSectionProps } from "../../../types/pages/ProjectPlanning/ProjectPagesSection/ProjectPagesSection";
import { ProjectTodoItem } from "./ProjectTodoItem";
import { ProjectPageHeader } from "./ProjectPageHeader";

export const ProjectPagesSection: React.FC<ProjectPagesSectionProps> = ({
  pages,
  expandedPage,
  setExpandedPage,
  getStatusColor,
  onUpdatePage,
  onUpdateTodo,
  onDeleteTodo,
  onDeletePage,
  onAddTodo,
}) => {
  const [editingPageId, setEditingPageId] = useState<string | null>(null);
  const [editingTodoId, setEditingTodoId] = useState<{
    pageId: string;
    todoId: string;
  } | null>(null);
  const [editedPages, setEditedPages] =
    useState<Array<ProjectPage & { todos: Todo[] }>>(pages);

  // 삭제 대기 상태 관리 (type: 'page' | 'todo')
  const [deletePending, setDeletePending] = useState<{
    type: "page" | "todo";
    id: string;
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
    id: string,
    parentPageId?: string
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

  // const handleStartEdit = (pageId: string) => setEditingPageId(pageId);
  // const handleCancelEdit = (pageId: string) => {
  //   setEditingPageId(null);
  //   const originalPage = pages.find((p) => p.project_page_id === pageId);
  //   if (originalPage) {
  //     setEditedPages((prev) =>
  //       prev.map((p) => (p.project_page_id === pageId ? originalPage : p))
  //     );
  //   }
  // };

  // const handleSaveEdit = (pageId: string) => {
  //   const editedPage = editedPages.find((p) => p.project_page_id === pageId);
  //   if (editedPage && onUpdatePage) onUpdatePage(pageId, editedPage);
  //   setEditingPageId(null);
  // };

  const updatePageField = (
    pageId: string,
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
    pageId: string,
    todoId: string,
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

  // const handleStartEditTodo = (pageId: string, todoId: string) =>
  //   setEditingTodoId({ pageId, todoId });
  // const handleCancelEditTodo = () => setEditingTodoId(null);

  // const handleSaveEditTodo = (pageId: string, todoId: string) => {
  //   const page = editedPages.find((p) => p.project_page_id === pageId);
  //   const todo = page?.todos.find((t) => t.id === todoId);
  //   if (todo && onUpdateTodo) onUpdateTodo(pageId, todoId, todo);
  //   setEditingTodoId(null);
  // };

  // --- Render ---
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

          return (
            <div
              key={page.project_page_id}
              className="overflow-hidden border border-gray-200 rounded-lg"
            >
              <ProjectPageHeader
                page={page}
                isEditing={isEditing}
                isExpanded={isExpanded}
                isPagePending={
                  deletePending?.type === "page" &&
                  deletePending?.id === page.project_page_id
                }
                onToggleExpand={() =>
                  setExpandedPage(isExpanded ? null : page.project_page_id)
                }
                onUpdateField={(f, v) =>
                  updatePageField(page.project_page_id, f, v)
                }
                onSave={() => {
                  onUpdatePage?.(page.project_page_id, page);
                  setEditingPageId(null);
                }}
                onCancel={() => {
                  setEditingPageId(null);
                  setEditedPages(pages);
                }}
                onEdit={() => setEditingPageId(page.project_page_id)}
                onDelete={(e) =>
                  handleDeleteAction(e, "page", page.project_page_id)
                }
              />

              {isExpanded && (
                <div className="p-4 space-y-4 bg-white">
                  {/* 페이지 상세 정보 영역 (Role & Complete Status) */}
                  <div className="space-y-3">
                    {isEditing ? (
                      <div className="space-y-2">
                        <label className="block text-xs font-medium text-gray-700">
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
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                        />
                        <label className="flex items-center space-x-2 cursor-pointer">
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
                            className="w-4 h-4 text-blue-600 rounded"
                          />
                          <span className="text-xs font-medium text-gray-700">
                            Mark as complete
                          </span>
                        </label>
                      </div>
                    ) : (
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-gray-500 font-medium">
                          Role: {page.project_page_role}
                        </span>
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
                    )}
                  </div>

                  {/* 할 일 목록 영역 */}
                  <div className="pt-3 border-t border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-medium text-gray-500">
                        Tasks ({page.todos.length})
                      </p>
                      {isEditing && (
                        <button
                          type="button"
                          onClick={() => {
                            const newTodo: Todo = {
                              id: Date.now().toString(),
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
                            onAddTodo?.(page.project_page_id, newTodo);
                          }}
                          className="px-2 py-1 text-xs font-medium text-blue-600 hover:text-blue-700"
                        >
                          + Add Task
                        </button>
                      )}
                    </div>

                    <div className="space-y-2">
                      {page.todos.map((todo) => (
                        <ProjectTodoItem
                          key={todo.id}
                          todo={todo}
                          isEditingTodo={
                            editingTodoId?.pageId === page.project_page_id &&
                            editingTodoId?.todoId === todo.id
                          }
                          isTodoPending={
                            deletePending?.type === "todo" &&
                            deletePending?.id === todo.id
                          }
                          canEdit={isEditing}
                          getStatusColor={getStatusColor}
                          onUpdateField={(f, v) =>
                            updateTodoField(page.project_page_id, todo.id, f, v)
                          }
                          onStartEdit={() =>
                            setEditingTodoId({
                              pageId: page.project_page_id,
                              todoId: todo.id,
                            })
                          }
                          onSave={() => {
                            onUpdateTodo?.(page.project_page_id, todo.id, todo);
                            setEditingTodoId(null);
                          }}
                          onCancel={() => setEditingTodoId(null)}
                          onDelete={(e) =>
                            handleDeleteAction(
                              e,
                              "todo",
                              todo.id,
                              page.project_page_id
                            )
                          }
                        />
                      ))}
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

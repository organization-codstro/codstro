import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { Edit, Save, X } from "lucide-react";
import "react-toastify/dist/ReactToastify.css";

import {
  ProjectPage,
  ProjectTodo,
  ProjectPageWithTodos,
} from "../../../types/common/ProjectPlanning";
import {
  GET_NEXT_STATUS,
  PROJECT_STATUS_TYPE,
  PROJECT_STATUS_TYPE_ARRAY,
  STATUS_LABEL,
  STATUS_STYLE,
} from "../../../constants/ProjectPlanning/ProjectPlanning";
import { ProjectPagesSectionProps } from "../../../types/pages/ProjectPlanning/ProjectPagesSection/ProjectPagesSection";

import { ProjectTodoItem } from "./ProjectTodoItem";
import { ProjectPageHeader } from "./ProjectPageHeader";


export const ProjectPagesSection: React.FC<ProjectPagesSectionProps> = ({
  projectId,
  pages,
  expandedPage,
  setExpandedPage,
  getStatusColor,
  onUpdateTodo,
  onDeleteTodo,
  onDeletePage,
  onAddTodo,
  onAddPage,
  onSave,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editingPageId, setEditingPageId] = useState<string | null>(null);
  const [editingTodoId, setEditingTodoId] = useState<{
    pageId: string;
    todoId: string;
  } | null>(null);

  const [editedPages, setEditedPages] = useState<ProjectPageWithTodos[]>(pages);
  const [workingPages, setWorkingPages] =
    useState<ProjectPageWithTodos[]>(pages);

  const [deletePending, setDeletePending] = useState<{
    type: "page" | "todo";
    id: string;
  } | null>(null);

  useEffect(() => {
    setEditedPages(pages);
     if (!isEditing) {
      setWorkingPages(pages);
     }
  }, [pages]);

  useEffect(() => {
    if (!deletePending) return;
    const timer = setTimeout(() => setDeletePending(null), 3000);
    return () => clearTimeout(timer);
  }, [deletePending]);

  const handleEdit = () => {
    setWorkingPages(editedPages);
    setIsEditing(true);
  };

  const handleCancel = () => {
    setWorkingPages(editedPages);
    setEditingPageId(null);
    setEditingTodoId(null);
    setIsEditing(false);
  };

  const handleSave = async () => {
    await onSave?.(workingPages);
    setEditedPages(workingPages);
    setEditingPageId(null);
    setEditingTodoId(null);
    setIsEditing(false);
  };

  const patchLocalPage = (
    pageId: string,
    partial: Partial<ProjectPageWithTodos>,
  ) => {
    setWorkingPages((prev) =>
      prev.map((p) =>
        p.project_page_id === pageId ? { ...p, ...partial } : p,
      ),
    );
  };

  const patchLocalTodo = (
    pageId: string,
    todoId: string,
    partial: Partial<ProjectTodo>,
  ) => {
    setWorkingPages((prev) =>
      prev.map((p) =>
        p.project_page_id === pageId
          ? {
              ...p,
              todos: p.todos.map((t) =>
                t.id === todoId ? { ...t, ...partial } : t,
              ),
            }
          : p,
      ),
    );
  };

  const handleCyclePageStatus = (
    e: React.MouseEvent,
    page: ProjectPageWithTodos,
  ) => {
    e.stopPropagation();
    if (!isEditing) return;
    const currentStatus =
      (page.project_page_status as PROJECT_STATUS_TYPE) ?? "waiting";
    const next = GET_NEXT_STATUS(currentStatus);
    patchLocalPage(page.project_page_id, { project_page_status: next });
  };

  const updatePageField = (
    pageId: string,
    field: keyof ProjectPage,
    value: string | boolean,
  ) => {
    patchLocalPage(pageId, { [field]: value });
  };

  const handleSavePage = (pageId: string) => {
    const page = workingPages.find((p) => p.project_page_id === pageId);
    if (!page) return;
    setEditingPageId(null);
  };

  const handleCancelPage = () => {
    setEditingPageId(null);
    setWorkingPages(editedPages);
  };

  const handleDeleteAction = (
    e: React.MouseEvent,
    type: "page" | "todo",
    id: string,
    parentPageId?: string,
  ) => {
    e.stopPropagation();
    if (!isEditing) return;

    const isConfirm = deletePending?.type === type && deletePending?.id === id;
    if (!isConfirm) {
      setDeletePending({ type, id });
      return;
    }

    setDeletePending(null);

    if (type === "page") {
      setWorkingPages((prev) => prev.filter((p) => p.project_page_id !== id));
      onDeletePage?.(id);
      toast.success("페이지가 삭제되었습니다.");
      return;
    }

    if (type === "todo" && parentPageId) {
      setWorkingPages((prev) =>
        prev.map((p) =>
          p.project_page_id === parentPageId
            ? { ...p, todos: p.todos.filter((t) => t.id !== id) }
            : p,
        ),
      );
      onDeleteTodo?.(parentPageId, id);
      toast.success("작업이 삭제되었습니다.");
    }
  };

  const handleAddTodo = (pageId: string) => {
    if (!isEditing) return;
    const today = new Date().toISOString().split("T")[0];
    const newTodo: ProjectTodo = {
      id: crypto.randomUUID(),
      name: "New Task",
      content: "",
      description: "",
      start_date: today,
      end_date: today,
      status: "waiting",
      created_at: today,
      project_page_id: pageId,
    };
    setWorkingPages((prev) =>
      prev.map((p) =>
        p.project_page_id === pageId
          ? { ...p, todos: [...p.todos, newTodo] }
          : p,
      ),
    );
    onAddTodo?.(pageId, newTodo);
    setEditingTodoId({ pageId, todoId: newTodo.id });
  };

  const handleAddPage = () => {
    if (!isEditing) return;
    const newPage: ProjectPageWithTodos = {
      project_page_id: crypto.randomUUID(),
      project_page_name: "New Page",
      project_page_role: "",
      project_page_function: "",
      project_page_is_complete: false,
      project_id: projectId,
      todos: [],
    };
    setWorkingPages((prev) => [...prev, newPage]);
    onAddPage?.(newPage);
  };

  const updateTodoField = (
    pageId: string,
    todoId: string,
    field: keyof ProjectTodo,
    value: string,
  ) => {
    patchLocalTodo(pageId, todoId, { [field]: value });
  };

  const handleSaveTodo = (pageId: string, todoId: string) => {
    const todo = workingPages
      .find((p) => p.project_page_id === pageId)
      ?.todos.find((t) => t.id === todoId);
    if (!todo) return;
    onUpdateTodo?.(pageId, todoId, todo);
    setEditingTodoId(null);
  };

  const handleCancelTodo = (pageId: string, todoId: string) => {
    const original = editedPages
      .find((p) => p.project_page_id === pageId)
      ?.todos.find((t) => t.id === todoId);
    if (original) patchLocalTodo(pageId, todoId, original);
    setEditingTodoId(null);
  };

  const displayPages = isEditing ? workingPages : editedPages;

  return (
    <div
      className="p-6 bg-white border border-gray-200 rounded-lg"
      onClick={() => setDeletePending(null)}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Project Pages</h2>
        <div className="flex items-center gap-2">
          {isEditing ? (
            <>
              <button
                type="button"
                onClick={handleAddPage}
                className="px-3 py-1 text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                + Add Page
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="flex items-center gap-1 px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <X className="w-3.5 h-3.5" />
                Cancel
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="flex items-center gap-1 px-3 py-1 text-sm text-white rounded-lg bg-[#587CF0]"
              >
                <Save className="w-3.5 h-3.5" />
                Save
              </button>
            </>
          ) : (
            onSave && (
              <button
                type="button"
                onClick={handleEdit}
                className="flex items-center gap-1 px-3 py-1 text-sm text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                <Edit className="w-3.5 h-3.5" />
                Edit
              </button>
            )
          )}
        </div>
      </div>

      <div className="space-y-3">
        {displayPages.map((page) => {
          const isEditingThisPage = editingPageId === page.project_page_id;
          const isExpanded = expandedPage === page.project_page_id;
          const pageStatus = ((page as any).project_page_status ??
            "waiting") as PROJECT_STATUS_TYPE;

          return (
            <div
              key={page.project_page_id}
              className="overflow-hidden border border-gray-200 rounded-lg"
            >
              <ProjectPageHeader
                page={page}
                isEditing={isEditingThisPage}
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
                onSave={() => handleSavePage(page.project_page_id)}
                onCancel={handleCancelPage}
                onEdit={
                  isEditing
                    ? () => setEditingPageId(page.project_page_id)
                    : undefined
                }
                onDelete={
                  isEditing
                    ? (e) => handleDeleteAction(e, "page", page.project_page_id)
                    : undefined
                }
              />

              {isExpanded && (
                <div className="p-4 space-y-4 bg-white">
                  <div className="space-y-3">
                    {isEditingThisPage ? (
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
                              e.target.value,
                            )
                          }
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                        />
                        <div>
                          <label className="block mb-1 text-xs font-medium text-gray-700">
                            이 페이지의 개발 상태
                          </label>
                          <div className="flex gap-2">
                            {PROJECT_STATUS_TYPE_ARRAY.map((s) => (
                              <button
                                key={s}
                                type="button"
                                onClick={() =>
                                  patchLocalPage(page.project_page_id, {
                                    project_page_status: s,
                                  })
                                }
                                className={`px-2 py-1 rounded text-xs font-medium border transition-colors ${
                                  pageStatus === s
                                    ? STATUS_STYLE[s] +
                                      " ring-2 ring-offset-1 ring-current"
                                    : "bg-white text-gray-400 border-gray-200 hover:border-gray-400"
                                }`}
                              >
                                {STATUS_LABEL[s]}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-medium text-gray-500">
                          이 페이지의 개발 상태
                        </span>
                        <button
                          type="button"
                          onClick={(e) => handleCyclePageStatus(e, page)}
                          title={isEditing ? "클릭하여 상태 변경" : undefined}
                          className={`px-2 py-1 rounded text-xs font-medium transition-colors select-none ${STATUS_STYLE[pageStatus]} ${!isEditing ? "cursor-default" : ""}`}
                        >
                          {STATUS_LABEL[pageStatus]}
                        </button>
                      </div>
                    )}
                  </div>

                  <div className="pt-3 border-t border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-medium text-gray-500">
                        Tasks ({page.todos.length})
                      </p>
                      {isEditing && (
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddTodo(page.project_page_id);
                          }}
                          className="px-2 py-1 text-xs font-medium text-blue-600 hover:text-blue-700"
                        >
                          + Add Task
                        </button>
                      )}
                    </div>

                    <div className="space-y-2">
                      {page.todos.length === 0 && (
                        <p className="py-3 text-xs text-center text-gray-400">
                          {isEditing
                            ? "작업이 없습니다. + Add Task를 눌러 추가하세요."
                            : "작업이 없습니다."}
                        </p>
                      )}
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
                            updateTodoField(
                              page.project_page_id,
                              todo.id,
                              f as keyof ProjectTodo,
                              v,
                            )
                          }
                          onStartEdit={
                            isEditing
                              ? () =>
                                  setEditingTodoId({
                                    pageId: page.project_page_id,
                                    todoId: todo.id,
                                  })
                              : undefined
                          }
                          onSave={() =>
                            handleSaveTodo(page.project_page_id, todo.id)
                          }
                          onCancel={() =>
                            handleCancelTodo(page.project_page_id, todo.id)
                          }
                          onDelete={
                            isEditing
                              ? (e) =>
                                  handleDeleteAction(
                                    e,
                                    "todo",
                                    todo.id,
                                    page.project_page_id,
                                  )
                              : undefined
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

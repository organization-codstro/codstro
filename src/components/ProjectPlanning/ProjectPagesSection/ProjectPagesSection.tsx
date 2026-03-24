import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ── 타입 ──────────────────────────────────────────────────────
import {
  ProjectPage,
  ProjectTodo,
  ProjectPageWithTodos,
} from "../../../types/common/projectPlanning";
import { PROJECT_STATUS_TYPE } from "../../../constants/ProjectPlanning/ProjectPlanning";
import { ProjectPagesSectionProps } from "../../../types/pages/ProjectPlanning/ProjectPagesSection/ProjectPagesSection";

// ── 하위 컴포넌트 ─────────────────────────────────────────────
import { ProjectTodoItem } from "./ProjectTodoItem";
import { ProjectPageHeader } from "./ProjectPageHeader";

// Supabase API 호출 없음 — 저장은 부모의 Save/Create 버튼에서 일괄 처리

// 상태 순환: waiting → in progress → done → waiting
const STATUS_CYCLE: PROJECT_STATUS_TYPE[] = ["waiting", "in progress", "done"];

const getNextStatus = (current: PROJECT_STATUS_TYPE): PROJECT_STATUS_TYPE => {
  const idx = STATUS_CYCLE.indexOf(current);
  return STATUS_CYCLE[(idx + 1) % STATUS_CYCLE.length];
};

const STATUS_STYLE: Record<PROJECT_STATUS_TYPE, string> = {
  waiting: "bg-gray-100 text-gray-700 hover:bg-gray-200",
  "in progress": "bg-blue-100 text-blue-700 hover:bg-blue-200",
  done: "bg-green-100 text-green-700 hover:bg-green-200",
};

const STATUS_LABEL: Record<PROJECT_STATUS_TYPE, string> = {
  waiting: "Waiting",
  "in progress": "In Progress",
  done: "✓ Done",
};

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
  onAddPage,
}) => {
  const [editingPageId, setEditingPageId] = useState<string | null>(null);
  const [editingTodoId, setEditingTodoId] = useState<{
    pageId: string;
    todoId: string;
  } | null>(null);

  const [editedPages, setEditedPages] = useState<ProjectPageWithTodos[]>(pages);

  const [deletePending, setDeletePending] = useState<{
    type: "page" | "todo";
    id: string;
  } | null>(null);

  useEffect(() => {
    setEditedPages(pages);
  }, [pages]);

  useEffect(() => {
    if (!deletePending) return;
    const timer = setTimeout(() => setDeletePending(null), 3000);
    return () => clearTimeout(timer);
  }, [deletePending]);

  const patchLocalPage = (
    pageId: string,
    partial: Partial<ProjectPageWithTodos>,
  ) => {
    setEditedPages((prev) =>
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
    setEditedPages((prev) =>
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

  // ── 개발 상태 순환 토글 ────────────────────────────────────
  const handleCyclePageStatus = (
    e: React.MouseEvent,
    page: ProjectPageWithTodos,
  ) => {
    e.stopPropagation();
    const currentStatus =
      (page.project_page_status as PROJECT_STATUS_TYPE) ?? "waiting";
    const next = getNextStatus(currentStatus);
    onUpdatePage?.(page.project_page_id, {
      ...page,
      project_page_status: next,
    });
  };

  const updatePageField = (
    pageId: string,
    field: keyof ProjectPage,
    value: string | boolean,
  ) => {
    patchLocalPage(pageId, { [field]: value });
  };

  const handleSavePage = (pageId: string) => {
    const page = editedPages.find((p) => p.project_page_id === pageId);
    if (!page) return;
    onUpdatePage?.(pageId, page);
    setEditingPageId(null);
  };

  const handleCancelPage = () => {
    setEditingPageId(null);
    setEditedPages(pages);
  };

  const handleDeleteAction = (
    e: React.MouseEvent,
    type: "page" | "todo",
    id: string,
    parentPageId?: string,
  ) => {
    e.stopPropagation();

    const isConfirm = deletePending?.type === type && deletePending?.id === id;
    if (!isConfirm) {
      setDeletePending({ type, id });
      return;
    }

    setDeletePending(null);

    if (type === "page") {
      onDeletePage?.(id);
      toast.success("페이지가 삭제되었습니다.");
      return;
    }

    if (type === "todo" && parentPageId) {
      onDeleteTodo?.(parentPageId, id);
      toast.success("작업이 삭제되었습니다.");
    }
  };

  const handleAddTodo = (pageId: string) => {
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

    onAddTodo?.(pageId, newTodo);
    setEditingTodoId({ pageId, todoId: newTodo.id });
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
    const todo = editedPages
      .find((p) => p.project_page_id === pageId)
      ?.todos.find((t) => t.id === todoId);
    if (!todo) return;
    onUpdateTodo?.(pageId, todoId, todo);
    setEditingTodoId(null);
  };

  const handleCancelTodo = (pageId: string, todoId: string) => {
    const original = pages
      .find((p) => p.project_page_id === pageId)
      ?.todos.find((t) => t.id === todoId);
    if (original) patchLocalTodo(pageId, todoId, original);
    setEditingTodoId(null);
  };

  return (
    <div
      className="p-6 bg-white border border-gray-200 rounded-lg"
      onClick={() => setDeletePending(null)}
    >
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Project Pages</h2>
        <button
          type="button"
          onClick={onAddPage}
          className="px-3 py-1 text-sm font-medium text-blue-600 hover:text-blue-700"
        >
          + Add Page
        </button>
      </div>

      <div className="space-y-3">
        {editedPages.map((page) => {
          const isEditing = editingPageId === page.project_page_id;
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
                onSave={() => handleSavePage(page.project_page_id)}
                onCancel={handleCancelPage}
                onEdit={() => setEditingPageId(page.project_page_id)}
                onDelete={(e) =>
                  handleDeleteAction(e, "page", page.project_page_id)
                }
              />

              {isExpanded && (
                <div className="p-4 space-y-4 bg-white">
                  {/* 이 페이지의 개발 상태 */}
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
                              e.target.value,
                            )
                          }
                          className="w-full px-3 py-2 text-sm border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400"
                        />
                        {/* 편집 모드에서도 상태 선택 가능 */}
                        <div>
                          <label className="block mb-1 text-xs font-medium text-gray-700">
                            이 페이지의 개발 상태
                          </label>
                          <div className="flex gap-2">
                            {STATUS_CYCLE.map((s) => (
                              <button
                                key={s}
                                type="button"
                                onClick={() =>
                                  onUpdatePage?.(page.project_page_id, {
                                    ...page,
                                    project_page_status: s,
                                  } as any)
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
                        {/* 클릭할 때마다 waiting → in progress → done 순환 */}
                        <button
                          type="button"
                          onClick={(e) => handleCyclePageStatus(e, page)}
                          title="클릭하여 상태 변경"
                          className={`px-2 py-1 rounded text-xs font-medium transition-colors select-none ${STATUS_STYLE[pageStatus]}`}
                        >
                          {STATUS_LABEL[pageStatus]}
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Tasks */}
                  <div className="pt-3 border-t border-gray-200">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-xs font-medium text-gray-500">
                        Tasks ({page.todos.length})
                      </p>
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
                    </div>

                    <div className="space-y-2">
                      {page.todos.length === 0 && (
                        <p className="py-3 text-xs text-center text-gray-400">
                          작업이 없습니다. + Add Task를 눌러 추가하세요.
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
                          canEdit={true}
                          getStatusColor={getStatusColor}
                          onUpdateField={(f, v) =>
                            updateTodoField(
                              page.project_page_id,
                              todo.id,
                              f as keyof ProjectTodo,
                              v,
                            )
                          }
                          onStartEdit={() =>
                            setEditingTodoId({
                              pageId: page.project_page_id,
                              todoId: todo.id,
                            })
                          }
                          onSave={() =>
                            handleSaveTodo(page.project_page_id, todo.id)
                          }
                          onCancel={() =>
                            handleCancelTodo(page.project_page_id, todo.id)
                          }
                          onDelete={(e) =>
                            handleDeleteAction(
                              e,
                              "todo",
                              todo.id,
                              page.project_page_id,
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

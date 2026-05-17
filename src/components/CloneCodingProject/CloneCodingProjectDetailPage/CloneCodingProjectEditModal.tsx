import React, { useState } from "react";
import { X } from "lucide-react";
import { CloneCodingProject } from "../../../types/common/CloneCodingProject";
import { CloneCodingService } from "../../../api/CloneCodingProject/CloneCodingProjectDetailPage";
import { CLONE_CODING_STATE_TYPE } from "../../../constants/CloneCodingProject/CloneCodingProject";

interface ProjectEditModalProps {
  project: CloneCodingProject;
  currentStatus: CLONE_CODING_STATE_TYPE;
  onSave: (
    updated: CloneCodingProject,
    newStatus: CLONE_CODING_STATE_TYPE,
  ) => void;
  onClose: () => void;
}

export const ProjectEditModal: React.FC<ProjectEditModalProps> = ({
  project,
  currentStatus,
  onSave,
  onClose,
}) => {
  const [form, setForm] = useState({
    title: project.title,
    description: project.description,
    estimated_hours: project.estimated_hours,
    github_url: project.github_url ?? "",
    demo_url: project.demo_url ?? "",
    tech_stack: project.tech_stack.join(", "),
    tags: project.tags.join(", "),
    clone_coding_project_structure:
      project.clone_coding_project_structure ?? "",
    status: currentStatus,
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async () => {
    setIsSaving(true);
    try {
      const updated: CloneCodingProject = {
        ...project,
        title: form.title,
        description: form.description,
        estimated_hours: form.estimated_hours,
        github_url: form.github_url || undefined,
        demo_url: form.demo_url || undefined,
        tech_stack: form.tech_stack
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        tags: form.tags
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
        clone_coding_project_structure: form.clone_coding_project_structure,
      };

      await CloneCodingService.updateProject({
        projectId: project.id,
        data: updated,
      });

      onSave(updated, form.status as CLONE_CODING_STATE_TYPE);
    } catch {
      alert("저장 중 오류가 발생했습니다.");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto bg-white rounded-xl shadow-xl p-8">
        <button
          onClick={onClose}
          className="absolute p-1 rounded-lg top-4 right-4 hover:bg-gray-100"
        >
          <X className="w-5 h-5 text-gray-500" />
        </button>

        <h2 className="mb-6 text-xl font-bold text-gray-800">프로젝트 수정</h2>

        <div className="space-y-4">
          <Field label="제목">
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              className="input-base"
            />
          </Field>

          <Field label="설명">
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              rows={3}
              className="resize-none input-base"
            />
          </Field>

          <Field label="Project Status">
            <select
              name="status"
              value={form.status}
              onChange={handleChange}
              className="input-base"
            >
              <option value="waiting">waiting</option>
              <option value="in progress">in progress</option>
              <option value="completed">completed</option>
            </select>
          </Field>

          <Field label="예상 시간">
            <input
              name="estimated_hours"
              value={form.estimated_hours}
              onChange={handleChange}
              className="input-base"
            />
          </Field>

          <Field label="Tech Stack (쉼표로 구분)">
            <input
              name="tech_stack"
              value={form.tech_stack}
              onChange={handleChange}
              className="input-base"
              placeholder="React, TypeScript, Tailwind"
            />
          </Field>

          <Field label="Tags (쉼표로 구분)">
            <input
              name="tags"
              value={form.tags}
              onChange={handleChange}
              className="input-base"
              placeholder="frontend, todo-app"
            />
          </Field>

          <Field label="GitHub URL">
            <input
              name="github_url"
              value={form.github_url}
              onChange={handleChange}
              className="input-base"
            />
          </Field>

          <Field label="Demo URL">
            <input
              name="demo_url"
              value={form.demo_url}
              onChange={handleChange}
              className="input-base"
            />
          </Field>

          <Field label="Project Structure">
            <textarea
              name="clone_coding_project_structure"
              value={form.clone_coding_project_structure}
              onChange={handleChange}
              rows={8}
              className="font-mono text-sm resize-y input-base"
              placeholder={`src/\n  components/\n  pages/\n  ...`}
            />
          </Field>
        </div>

        <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
          >
            취소
          </button>
          <button
            onClick={handleSubmit}
            disabled={isSaving}
            className="px-4 py-2 text-sm text-white bg-[#587CF0] rounded-lg hover:bg-[#4a6de8] disabled:opacity-50"
          >
            {isSaving ? "저장 중..." : "저장"}
          </button>
        </div>
      </div>
    </div>
  );
};

const Field = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div>
    <label className="block mb-1 text-sm font-medium text-gray-700">
      {label}
    </label>
    {children}
  </div>
);

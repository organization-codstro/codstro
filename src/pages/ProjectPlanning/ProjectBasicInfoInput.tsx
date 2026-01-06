import { useState, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { ProjectBasicInfo, Project } from "../../types/ProjectPlanning/project";
import {
  activeProjectsData,
  planningProjectsData,
} from "../../data/ProjectPlanning/project";

export default function ProjectBasicInfoInput() {
  const navigate = useNavigate();
  const location = useLocation();

  // location state에서 projectId 확인 (기존 프로젝트 수정 모드)
  const projectId = (location.state as { projectId?: number })?.projectId;

  // 기존 프로젝트 정보 로드 (수정 모드인 경우)
  const existingProject: Project | undefined = projectId
    ? [...activeProjectsData, ...planningProjectsData].find(
        (p) => p.project_id === projectId
      )
    : undefined;

  const [basicInfo, setBasicInfo] = useState<ProjectBasicInfo>({
    project_topic: existingProject?.project_topic || "",
    desired_features: existingProject?.project_description || "",
    concepts_to_cover: existingProject?.project_stacks || "",
    other_info: "",
  });

  // 에러 상태 관리
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  useEffect(() => {
    if (existingProject) {
      setBasicInfo({
        project_topic: existingProject.project_topic || "",
        desired_features: existingProject.project_description || "",
        concepts_to_cover: existingProject.project_stacks || "",
        other_info: "",
      });
    }
  }, [existingProject]);

  const handleInputChange = (field: keyof ProjectBasicInfo, value: string) => {
    setBasicInfo((prev) => ({ ...prev, [field]: value }));
    // 입력 시 해당 필드 에러 해제
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: false }));
    }
  };

  /** ✅ 폼 유효성 검사 (붉은 보더 표시용) */
  const validateForm = () => {
    const newErrors: Record<string, boolean> = {};

    if (!basicInfo.project_topic?.trim()) {
      newErrors.project_topic = true;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    // 2차 검증 실행
    if (!validateForm()) return;

    navigate("/projects/new/chat", {
      state: {
        basicInfo,
        projectId,
      },
    });
  };

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      {/* Header */}
      <div className="px-8 py-6 bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900">
            {projectId ? "Edit Project" : "Create New Project"}
          </h1>
          <p className="mt-1 text-gray-600">
            {projectId
              ? "Edit basic information about your project"
              : "Step 1: Enter basic information about your project"}
          </p>
        </div>
      </div>

      {/* Form */}
      <div className="max-w-4xl p-8 mx-auto">
        <div className="p-8 space-y-6 bg-white border border-gray-200 rounded-lg">
          {/* 프로젝트 주제 - 필수 항목 */}
          <div>
            <label
              htmlFor="project_topic"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              프로젝트 주제 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="project_topic"
              value={basicInfo.project_topic || ""}
              onChange={(e) =>
                handleInputChange("project_topic", e.target.value)
              }
              placeholder="예: AI 기반 채팅 애플리케이션"
              className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                errors.project_topic
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-300 focus:ring-blue-500"
              }`}
            />
            {errors.project_topic ? (
              <p className="mt-1 text-xs text-red-500">
                프로젝트 주제를 입력해주세요.
              </p>
            ) : (
              <p className="mt-1 text-sm text-gray-500">
                만들고 싶은 프로젝트의 주제나 아이디어를 입력해주세요
              </p>
            )}
          </div>

          {/* 하고 싶은 기능 */}
          <div>
            <label
              htmlFor="desired_features"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              하고 싶은 기능
            </label>
            <textarea
              id="desired_features"
              value={basicInfo.desired_features || ""}
              onChange={(e) =>
                handleInputChange("desired_features", e.target.value)
              }
              placeholder="예: 실시간 메시징, 파일 공유, 그룹 채팅 등"
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="mt-1 text-sm text-gray-500">
              프로젝트에 포함하고 싶은 주요 기능들을 입력해주세요
            </p>
          </div>

          {/* 다루고 싶은 개념 */}
          <div>
            <label
              htmlFor="concepts_to_cover"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              다루고 싶은 개념
            </label>
            <textarea
              id="concepts_to_cover"
              value={basicInfo.concepts_to_cover || ""}
              onChange={(e) =>
                handleInputChange("concepts_to_cover", e.target.value)
              }
              placeholder="예: WebSocket, React Hooks, TypeScript, 상태 관리 등"
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="mt-1 text-sm text-gray-500">
              프로젝트를 통해 학습하거나 적용하고 싶은 기술이나 개념을
              입력해주세요
            </p>
          </div>

          {/* 기타 정보 */}
          <div>
            <label
              htmlFor="other_info"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              기타 정보
            </label>
            <textarea
              id="other_info"
              value={basicInfo.other_info || ""}
              onChange={(e) => handleInputChange("other_info", e.target.value)}
              placeholder="추가로 전달하고 싶은 정보가 있다면 입력해주세요"
              rows={3}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Footer Actions */}
        <div className="flex justify-between mt-8">
          <button
            type="button"
            onClick={() => navigate("/projects")}
            className="px-6 py-3 font-medium text-gray-700 transition-colors border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>

          <div className="flex space-x-4">
            <button
              type="button"
              onClick={handleNext}
              className="flex items-center px-6 py-3 space-x-2 font-medium text-white transition-all rounded-lg shadow-md active:scale-95"
              style={{ backgroundColor: "#587CF0" }}
            >
              <span>Next: AI Chat</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

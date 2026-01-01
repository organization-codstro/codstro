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

  useEffect(() => {
    // 기존 프로젝트 정보가 있으면 폼에 채우기
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
  };

  const handleNext = () => {
    // 다음 단계로 이동하면서 기초 정보 전달
    navigate("/projects/new/chat", {
      state: {
        basicInfo,
        projectId, // 수정 모드인 경우 projectId 전달
      },
    });
  };

  const isFormValid = () => {
    return (
      basicInfo.project_topic?.trim() !== "" ||
      basicInfo.desired_features?.trim() !== "" ||
      basicInfo.concepts_to_cover?.trim() !== ""
    );
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
          {/* 프로젝트 주제 */}
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
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <p className="mt-1 text-sm text-gray-500">
              만들고 싶은 프로젝트의 주제나 아이디어를 입력해주세요
            </p>
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
            className="px-6 py-3 font-medium text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Cancel
          </button>

          <div className="flex space-x-4">
            <button
              type="button"
              onClick={handleNext}
              disabled={!isFormValid()}
              className="flex items-center px-6 py-3 space-x-2 font-medium text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed"
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

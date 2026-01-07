import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { ProjectBasicInfo, Project } from "../../types/ProjectPlanning/project";
import {
  activeProjectsData,
  planningProjectsData,
} from "../../data/ProjectPlanning/project";
import { ProjectInfoHeader } from "../../components/ProjectPlanning/ProjectBasicInfoInputPage/ProjectInfoHeader";
import { ProjectInputField } from "../../components/ProjectPlanning/ProjectBasicInfoInputPage/ProjectInputField";
import { ProjectInfoActions } from "../../components/ProjectPlanning/ProjectBasicInfoInputPage/ProjectInfoActions";


export default function ProjectBasicInfoInput() {
  const navigate = useNavigate();
  const location = useLocation();

  // location state에서 projectId 확인 (기존 프로젝트 수정 모드)
  const projectId = (location.state as { projectId?: number })?.projectId;

  // 기존 프로젝트 정보 로드
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
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: false }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, boolean> = {};
    if (!basicInfo.project_topic?.trim()) {
      newErrors.project_topic = true;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateForm()) return;
    navigate("/projects/new/chat", {
      state: { basicInfo, projectId },
    });
  };

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      <ProjectInfoHeader isEditMode={!!projectId} />

      <div className="max-w-4xl p-8 mx-auto">
        <div className="p-8 space-y-6 bg-white border border-gray-200 rounded-lg">
          {/* 프로젝트 주제 */}
          <ProjectInputField
            id="project_topic"
            label="프로젝트 주제"
            required
            value={basicInfo.project_topic || ""}
            onChange={(val) => handleInputChange("project_topic", val)}
            placeholder="예: AI 기반 채팅 애플리케이션"
            description="만들고 싶은 프로젝트의 주제나 아이디어를 입력해주세요"
            error={errors.project_topic}
            errorMessage="프로젝트 주제를 입력해주세요."
          />

          {/* 하고 싶은 기능 */}
          <ProjectInputField
            id="desired_features"
            label="하고 싶은 기능"
            type="textarea"
            value={basicInfo.desired_features || ""}
            onChange={(val) => handleInputChange("desired_features", val)}
            placeholder="예: 실시간 메시징, 파일 공유, 그룹 채팅 등"
            description="프로젝트에 포함하고 싶은 주요 기능들을 입력해주세요"
          />

          {/* 다루고 싶은 개념 */}
          <ProjectInputField
            id="concepts_to_cover"
            label="다루고 싶은 개념"
            type="textarea"
            value={basicInfo.concepts_to_cover || ""}
            onChange={(val) => handleInputChange("concepts_to_cover", val)}
            placeholder="예: WebSocket, React Hooks, TypeScript, 상태 관리 등"
            description="프로젝트를 통해 학습하거나 적용하고 싶은 기술이나 개념을 입력해주세요"
          />

          {/* 기타 정보 */}
          <ProjectInputField
            id="other_info"
            label="기타 정보"
            type="textarea"
            rows={3}
            value={basicInfo.other_info || ""}
            onChange={(val) => handleInputChange("other_info", val)}
            placeholder="추가로 전달하고 싶은 정보가 있다면 입력해주세요"
          />
        </div>

        <ProjectInfoActions
          onCancel={() => navigate("/projects")}
          onNext={handleNext}
        />
      </div>
    </div>
  );
}

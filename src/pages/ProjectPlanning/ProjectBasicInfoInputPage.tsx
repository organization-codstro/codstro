import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ProjectBasicInfo } from "../../types/common/ProjectPlanning";
import { ProjectInfoHeader } from "../../components/ProjectPlanning/ProjectBasicInfoInputPage/ProjectInfoHeader";
import { ProjectInputField } from "../../components/ProjectPlanning/ProjectBasicInfoInputPage/ProjectInputField";
import { ProjectInfoActions } from "../../components/ProjectPlanning/ProjectBasicInfoInputPage/ProjectInfoActions";
import { ProjectBasicInfoInputService } from "../../api/ProjectPlanning/ProjectBasicInfoInputPage";
import { LoginService } from "../../api/Auth/LoginPage";

export default function ProjectBasicInfoInputPage() {
  const navigate = useNavigate();
  const { projectId } = useParams<{ projectId: string }>();

  // 1. 상태 관리
  const [isLoading, setIsLoading] = useState(!!projectId); // 수정 모드일 때만 초기 로딩 활성화
  const [basicInfo, setBasicInfo] = useState<ProjectBasicInfo>({
    project_name: "",
    project_topic: "",
    desired_features: "",
    concepts_to_cover: "",
    other_info: "",
  });
  const [errors, setErrors] = useState<Record<string, boolean>>({});

  // 2. 생명주기 (useEffect): 기존 데이터 로드 (수정 모드일 경우)
  useEffect(() => {
    const loadProjectData = async () => {
      if (!projectId) return;

      try {
        setIsLoading(true);
        const data = await ProjectBasicInfoInputService.getPlanningBasicInfo({
          projectId,
        });
        setBasicInfo(data);
      } catch (error) {
        console.error(error);
        toast.error("프로젝트 정보를 불러오지 못했습니다.");
      } finally {
        setIsLoading(false);
      }
    };

    loadProjectData();
  }, [projectId]);

  const handleInputChange = (field: keyof ProjectBasicInfo, value: string) => {
    setBasicInfo((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: false }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, boolean> = {};
    if (!basicInfo.project_name?.trim()) {
      newErrors.project_name = true; // 추가
    }
    if (!basicInfo.project_topic?.trim()) {
      newErrors.project_topic = true;
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // 3. 저장 및 다음 단계 이동
  const handleNext = async () => {
    if (!validateForm()) return;

    const toastId = toast.loading("프로젝트 정보를 저장하고 있습니다...");

    try {
      // 신규 생성일 경우 유저 ID 확보
      const userId = await LoginService.getCurrentUserId();
      if (!userId) {
        toast.error("로그인이 필요합니다.");
        return;
      }

      const result = await ProjectBasicInfoInputService.saveOrUpdateBasicInfo({
        userId,
        projectId, // undefined이면 신규 생성(insert), 있으면 수정(update)
        info: basicInfo,
      });

      toast.update(toastId, {
        render: "정보가 저장되었습니다. 다음 단계로 이동합니다.",
        type: "success",
        isLoading: false,
        autoClose: 500,
      });

      // 생성된 혹은 기존의 projectId를 가지고 채팅 페이지로 이동
      navigate("/projects/new/chat", {
        state: {
          basicInfo,
          projectId: result.project_id,
        },
      });
    } catch (error) {
      toast.update(toastId, {
        render: "저장 중 오류가 발생했습니다.",
        type: "error",
        isLoading: false,
        autoClose: 500,
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen">
        데이터 로딩 중...
      </div>
    );
  }

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      <ProjectInfoHeader isEditMode={!!projectId} />

      <div className="max-w-4xl p-8 mx-auto">
        <div className="p-8 space-y-6 bg-white border border-gray-200 rounded-lg">
          <ProjectInputField
            id="project_name"
            label="프로젝트 이름"
            required
            value={basicInfo.project_name || ""}
            onChange={(val) => handleInputChange("project_name", val)}
            placeholder="예: MyChat"
            description="프로젝트의 이름을 입력해주세요"
            error={errors.project_name}
            errorMessage="프로젝트 이름을 입력해주세요."
          />

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

          <ProjectInputField
            id="desired_features"
            label="하고 싶은 기능"
            type="textarea"
            value={basicInfo.desired_features || ""}
            onChange={(val) => handleInputChange("desired_features", val)}
            placeholder="예: 실시간 메시징, 파일 공유, 그룹 채팅 등"
            description="프로젝트에 포함하고 싶은 주요 기능들을 입력해주세요"
          />

          <ProjectInputField
            id="concepts_to_cover"
            label="다루고 싶은 개념"
            type="textarea"
            value={basicInfo.concepts_to_cover || ""}
            onChange={(val) => handleInputChange("concepts_to_cover", val)}
            placeholder="예: WebSocket, React Hooks, TypeScript, 상태 관리 등"
            description="프로젝트를 통해 학습하거나 적용하고 싶은 기술이나 개념을 입력해주세요"
          />

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

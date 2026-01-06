import { useNavigate } from "react-router-dom";
import { StudyPlan } from "../../types/Woomoonkyung/StudyPlanNode";
import StudyPlanForm from "../../components/Woomoonkyung/StudyPlanForm";

const WoomoonkyungCreate = () => {
  const navigate = useNavigate();

  const handleSave = (
    data: Omit<StudyPlan, "study_plan_id" | "study_plans_created_date">
  ) => {
    console.log("Create", data);
    //todo : 공부 계획 1차 생성 api 연결 (생성하고 그 계획의 id 반환)
    navigate(`/woomoonkyung/create/node/${1}`);
  };

  return (
    <div className="p-8 bg-gray-50">
      <StudyPlanForm
        mode="create"
        onSave={handleSave}
        onCancel={() => navigate("/woomoonkyung")}
      />
    </div>
  );
};

export default WoomoonkyungCreate;

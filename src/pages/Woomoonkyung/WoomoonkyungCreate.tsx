import { useNavigate } from "react-router-dom";
import StudyPlanForm from "../../components/Woomoonkyung/StudyPlanForm";
import { StudyPlan } from "../../data/Woomoonkyung/woomoonkyungData";

const WoomoonkyungCreate = () => {
  const navigate = useNavigate();

  const handleSave = (
    data: Omit<StudyPlan, "study_plan_id" | "study_plans_created_date">
  ) => {
    console.log("Create", data);
    navigate("/woomoonkyung");
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

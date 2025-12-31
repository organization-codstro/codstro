import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import StudyPlanNodeEditor from "../../components/Woomoonkyung/StudyPlanNodeEditor";
import {
  StudyPlan,
  StudyPlanNode,
  studyPlans,
  studyPlanNodes,
} from "../../data/Woomoonkyung/woomoonkyungData";

const WoomoonkyungNodes: React.FC = () => {
  const { planId } = useParams<{ planId: string }>();
  const navigate = useNavigate();

  const studyPlan: StudyPlan | undefined = studyPlans.find(
    (plan) => plan.study_plan_id === planId
  );

  if (!studyPlan) {
    return (
      <div className="p-8 text-center text-gray-600">Study plan not found.</div>
    );
  }

  const existingNodes: StudyPlanNode[] = studyPlanNodes
    .filter((node) => node.study_plan_id === planId)
    .sort((a, b) => a.position - b.position);

  const handleSaveNodes = (
    nodes: Omit<StudyPlanNode, "study_plan_node_id" | "created_date">[]
  ) => {
    console.log("Saving nodes for plan:", planId, nodes);
    navigate("/woomoonkyung");
  };

  const handleBack = () => {
    navigate(`/woomoonkyung/${planId}`);
  };

  return (
    <div className="p-8 bg-gray-50">
      <StudyPlanNodeEditor
        studyPlan={studyPlan}
        existingNodes={existingNodes}
        onSave={handleSaveNodes}
        onBack={handleBack}
      />
    </div>
  );
};

export default WoomoonkyungNodes;

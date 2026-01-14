import React from "react";
import { useParams } from "react-router-dom";
import {
  studyPlans,
  studyPlanNodes,
} from "../../data/Woomoonkyung/woomoonkyungData";
import BackButton from "../../components/Concepts/BackButton";
import PlanHeader from "../../components/Woomoonkyung/RecommendedStudyPlanDetailPage/PlanHeader";
import NodeList from "../../components/Woomoonkyung/RecommendedStudyPlanDetailPage/NodeList";

export default function RecommendedStudyPlanDetailPage() {
  const { planId } = useParams<{ planId: string }>();

  const selectedPlan = studyPlans.find((plan) => plan.study_plan_id === planId);

  if (!selectedPlan) {
    return (
      <div className="p-8 text-center text-gray-600">Study plan not found.</div>
    );
  }

  const nodes = studyPlanNodes
    .filter((node) => node.study_plan_id === planId)
    .sort((a, b) => a.position - b.position);

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto space-y-6">
        <BackButton
          label="Back to Recommended Plans"
          to="/woomoonkyung/recommended"
        />

        <PlanHeader
          name={selectedPlan.study_plan_name}
          description={selectedPlan.study_plan_description}
          imageUrl={selectedPlan.study_plans_image_url}
          startDate={selectedPlan.study_plans_start_date}
          endDate={selectedPlan.study_plans_end_date}
          nodeCount={nodes.length}
          state={selectedPlan.study_plans_state}
          isBookmarked={selectedPlan.study_plans_is_archived}
        />

        <NodeList nodes={nodes} />
      </div>
    </div>
  );
}

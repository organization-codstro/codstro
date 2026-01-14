import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  studyPlans,
  studyPlanNodes,
} from "../../data/Woomoonkyung/woomoonkyungData";
import { StudyPlan } from "../../types/pages/Woomoonkyung/Woomoonkyung";
import BackButton from "../../components/Woomoonkyung/RecommendedStudyPlanDetailPage/BackButton";
import PlanDetailHeader from "../../components/Woomoonkyung/StudyPlanArchiveDetailPage/PlanDetailHeader";
import MyNodeList from "../../components/Woomoonkyung/StudyPlanArchiveDetailPage/MyNodeList";

export default function StudyPlanDetailPage() {
  const { planId } = useParams<{ planId: string }>();
  const [selectedPlan, setSelectedPlan] = useState<StudyPlan | null>(null);

  const plan = studyPlans.find((p) => p.study_plan_id === planId);
  const nodes = studyPlanNodes.filter((n) => n.study_plan_id === planId);

  const completedNodesCount = nodes.filter((node) => node.completed).length;
  const totalNodesCount = nodes.length;
  const progressPercentage =
    totalNodesCount > 0 ? (completedNodesCount / totalNodesCount) * 100 : 0;

  useEffect(() => {
    if (plan) setSelectedPlan(plan);
  }, [plan]);

  if (!plan || !selectedPlan) {
    return (
      <div className="p-8 text-center text-gray-600">Study plan not found.</div>
    );
  }

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto space-y-6">
        <BackButton label="Back to Archive" to="/Woomoonkyung/archive" />

        <PlanDetailHeader
          planId={planId!}
          name={selectedPlan.study_plan_name}
          description={selectedPlan.study_plan_description}
          imageUrl={selectedPlan.study_plans_image_url}
          startDate={selectedPlan.study_plans_start_date}
          endDate={selectedPlan.study_plans_end_date}
          state={selectedPlan.study_plans_state}
          completedNodes={completedNodesCount}
          totalNodes={totalNodesCount}
          progressPercentage={progressPercentage}
        />

        <MyNodeList nodes={nodes} />
      </div>
    </div>
  );
}

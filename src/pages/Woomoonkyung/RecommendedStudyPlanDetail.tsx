import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  BookOpen,
  Calendar,
  Target,
  Download,
  Bookmark,
  BookmarkCheck,
  ArrowRight,
} from "lucide-react";
import {
  StudyPlanNode,
  studyPlans,
  studyPlanNodes,
  stateColors,
} from "../../data/Woomoonkyung/woomoonkyungData";

const RecommendedStudyPlanDetail: React.FC = () => {
  const navigate = useNavigate();
  const { planId } = useParams<{ planId: string }>();

  const selectedPlan = studyPlans.find((plan) => plan.study_plan_id === planId);

  const getNodesForPlan = (planId: string): StudyPlanNode[] => {
    return studyPlanNodes
      .filter((node) => node.study_plan_id === planId)
      .sort((a, b) => a.position - b.position);
  };

  if (!selectedPlan) {
    return (
      <div className="p-8 text-center text-gray-600">Study plan not found.</div>
    );
  }

  const nodes = getNodesForPlan(selectedPlan.study_plan_id);
  const isBookmarked = selectedPlan.study_plans_is_archived;

  return (
    <div className="p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Back Button */}
        <button
          onClick={() => navigate("/woomoonkyung/recommended")}
          className="flex items-center gap-2 text-[#587CF0] hover:text-[#4a6de8]"
        >
          <ArrowRight className="w-4 h-4 rotate-180" />
          Back to Recommended Plans
        </button>

        {/* Plan Header */}
        <div className="overflow-hidden bg-white border border-purple-100 shadow-sm rounded-xl">
          {selectedPlan.study_plans_image_url && (
            <div className="h-48 overflow-hidden bg-gray-200">
              <img
                src={selectedPlan.study_plans_image_url}
                alt={selectedPlan.study_plan_name}
                className="object-cover w-full h-full"
              />
            </div>
          )}

          <div className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h1 className="mb-2 text-2xl font-bold text-gray-800">
                  {selectedPlan.study_plan_name}
                </h1>
                <p className="mb-4 text-gray-600">
                  {selectedPlan.study_plan_description}
                </p>

                <div className="flex items-center gap-4 text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {new Date(
                        selectedPlan.study_plans_start_date
                      ).toLocaleDateString()}
                      {" - "}
                      {new Date(
                        selectedPlan.study_plans_end_date
                      ).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Target className="w-4 h-4" />
                    <span>{nodes.length} learning nodes</span>
                  </div>
                </div>
              </div>

              <span
                className={`px-3 py-1 text-sm rounded-full border ${
                  stateColors[selectedPlan.study_plans_state]
                }`}
              >
                {selectedPlan.study_plans_state}
              </span>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button
                className={`flex items-center gap-2 px-4 py-2 rounded-lg border ${
                  isBookmarked
                    ? "bg-yellow-100 text-yellow-700 border-yellow-200"
                    : "bg-gray-100 text-gray-700 border-gray-200"
                }`}
              >
                {isBookmarked ? (
                  <BookmarkCheck className="w-4 h-4" />
                ) : (
                  <Bookmark className="w-4 h-4" />
                )}
                {isBookmarked ? "Bookmarked" : "Bookmark"}
              </button>

              <button className="flex items-center gap-2 px-4 py-2 bg-[#587CF0] text-white rounded-lg hover:bg-[#4a6de8]">
                <Download className="w-4 h-4" />
                Add to My Plans
              </button>
            </div>
          </div>
        </div>

        {/* Study Plan Nodes */}
        <div className="p-6 bg-white border border-purple-100 shadow-sm rounded-xl">
          <h3 className="mb-6 text-lg font-semibold text-gray-800">
            Learning Path
          </h3>

          <div className="space-y-4">
            {nodes.map((node) => (
              <div
                key={node.study_plan_node_id}
                className="p-4 border border-gray-200 rounded-lg"
              >
                <div className="flex gap-3">
                  <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#587CF0] text-white text-sm font-medium">
                    {node.position}
                  </div>
                  <div>
                    <h4 className="mb-1 font-semibold text-gray-800">
                      {node.study_plan_node_name}
                    </h4>
                    <p className="mb-2 text-sm text-gray-600">
                      {node.description}
                    </p>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <Calendar className="w-3 h-3" />
                      {new Date(node.start_date).toLocaleDateString()} -{" "}
                      {new Date(node.end_date).toLocaleDateString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {nodes.length === 0 && (
            <div className="py-12 text-center">
              <BookOpen className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <p className="text-gray-600">This study plan has no nodes yet.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecommendedStudyPlanDetail;

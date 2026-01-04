import { useNavigate, useParams } from "react-router-dom";
import {
  stateColors,
  StudyPlan,
  studyPlanNodes,
  studyPlans,
} from "../../data/Woomoonkyung/woomoonkyungData";
import {
  ArrowRight,
  BookOpen,
  Calendar,
  CheckCircle2,
  Edit3,
  Target,
} from "lucide-react";
import { useEffect, useState } from "react";

const WoomoonkyungDetail = () => {
  const { planId } = useParams<{ planId: string }>();
  const [selectedPlan, setSelectedPlan] = useState<StudyPlan | null>(null);
  const navigate = useNavigate();

  const plan = studyPlans.find((p) => p.study_plan_id === planId);
  const nodes = studyPlanNodes.filter((n) => n.study_plan_id === planId);
  const completedNodes = nodes.filter((node) => node.completed).length;
  const totalNodes = nodes.length;
  const progressPercentage =
    totalNodes > 0 ? (completedNodes / totalNodes) * 100 : 0;

  if (!plan) return null;

  useEffect(() => {
    setSelectedPlan(plan);
  }, [plan]);

  if (!selectedPlan) {
    console.log("selectedPlaFiltern 없음");
    return null;
  }

  return (
    <div className="p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Back Button */}
        <button
          onClick={() => navigate("/Woomoonkyung/archive")}
          className="flex items-center gap-2 text-[#587CF0] hover:text-[#4a6de8] transition-colors"
        >
          <ArrowRight className="w-4 h-4 rotate-180" />
          Back to Archive
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
                      ).toLocaleDateString()}{" "}
                      -{" "}
                      {new Date(
                        selectedPlan.study_plans_end_date
                      ).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Target className="w-4 h-4" />
                    <span>
                      {completedNodes}/{totalNodes} nodes completed
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2">
                <span
                  className={`px-3 py-1 text-sm rounded-full border ${
                    stateColors[selectedPlan.study_plans_state]
                  }`}
                >
                  {selectedPlan.study_plans_state}
                </span>
                <button
                  onClick={() => navigate(`/woomoonkyung/edit/${planId}`)}
                  className="p-2 text-gray-400 transition-colors hover:text-blue-500"
                >
                  <Edit3 className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Progress */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Overall Progress</span>
                <span className="font-medium">
                  {Math.round(progressPercentage)}%
                </span>
              </div>
              <div className="w-full h-3 bg-gray-200 rounded-full">
                <div
                  className="bg-[#587CF0] h-3 rounded-full transition-all duration-300"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Study Plan Nodes */}
        <div className="p-6 bg-white border border-purple-100 shadow-sm rounded-xl">
          <h3 className="mb-6 text-lg font-semibold text-gray-800">
            Study Plan Nodes
          </h3>

          <div className="space-y-4">
            {nodes.map((node, index) => (
              <div
                key={node.study_plan_node_id}
                className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                  node.completed
                    ? "border-green-200 bg-green-50"
                    : "border-gray-200 bg-white hover:border-blue-200"
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-start flex-1 gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#587CF0] text-white text-sm font-medium">
                      {node.position}
                    </div>
                    <div className="flex-1">
                      <h4
                        className={`font-semibold text-gray-800 mb-2 ${
                          node.completed ? "line-through text-gray-500" : ""
                        }`}
                      >
                        {node.study_plan_node_name}
                      </h4>
                      <p
                        className={`text-sm text-gray-600 mb-3 ${
                          node.completed ? "line-through" : ""
                        }`}
                      >
                        {node.description}
                      </p>
                      <div className="flex items-center gap-4 text-xs text-gray-500">
                        <div className="flex items-center gap-1">
                          <Calendar className="w-3 h-3" />
                          <span>
                            {new Date(node.start_date).toLocaleDateString()} -{" "}
                            {new Date(node.end_date).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {node.completed ? (
                      <CheckCircle2 className="w-6 h-6 text-green-500" />
                    ) : (
                      <div className="w-6 h-6 border-2 border-gray-300 rounded-full"></div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {nodes.length === 0 && (
            <div className="py-12 text-center">
              <BookOpen className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <h3 className="mb-2 text-lg font-medium text-gray-800">
                No study nodes yet
              </h3>
              <p className="text-gray-600">
                This study plan doesn't have any nodes configured yet.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default WoomoonkyungDetail;

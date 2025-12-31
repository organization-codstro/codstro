import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Archive,
  Star,
  Calendar,
  Target,
  Search,
  Filter,
  BookmarkCheck,
  CheckCircle2,
  Award,
  User,
  Download,
} from "lucide-react";
import {
  StudyPlan,
  StudyPlanNode,
  studyPlans,
  studyPlanNodes,
  recommendedStudyPlans,
  recommendedStudyPlanNodes,
  bookmarkedPlans,
  stateColors,
  stateIcons,
} from "../../data/Woomoonkyung/woomoonkyungData";

const StudyPlanArchive: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<StudyPlan | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedFilter, setSelectedFilter] = useState<
    "all" | "bookmarked" | "completed" | "my_plans"
  >("all");
  const navigate = useNavigate();

  // Get archived plans (completed user plans + bookmarked recommended plans)
  const getArchivedPlans = (): StudyPlan[] => {
    const completedUserPlans = studyPlans.filter(
      (plan) => plan.study_plans_state === "done"
    );
    const bookmarkedRecommendedPlans = recommendedStudyPlans.filter((plan) =>
      bookmarkedPlans.some(
        (bookmark) =>
          bookmark.study_plan_id === plan.study_plan_id &&
          bookmark.is_bookmarked
      )
    );

    return [...completedUserPlans, ...bookmarkedRecommendedPlans];
  };

  const getNodesForPlan = (planId: string): StudyPlanNode[] => {
    // Check if it's a user plan or recommended plan
    const isRecommendedPlan = recommendedStudyPlans.some(
      (p) => p.study_plan_id === planId
    );
    const nodes = isRecommendedPlan
      ? recommendedStudyPlanNodes
      : studyPlanNodes;

    return nodes
      .filter((node) => node.study_plan_id === planId)
      .sort((a, b) => a.position - b.position);
  };

  const getCompletedNodesCount = (planId: string): number => {
    return getNodesForPlan(planId).filter((node) => node.completed).length;
  };

  const getTotalNodesCount = (planId: string): number => {
    return getNodesForPlan(planId).length;
  };

  const getProgressPercentage = (planId: string): number => {
    const total = getTotalNodesCount(planId);
    const completed = getCompletedNodesCount(planId);
    return total > 0 ? (completed / total) * 100 : 0;
  };

  const isRecommendedPlan = (planId: string): boolean => {
    return recommendedStudyPlans.some((p) => p.study_plan_id === planId);
  };

  const isBookmarkedPlan = (planId: string): boolean => {
    return bookmarkedPlans.some(
      (b) => b.study_plan_id === planId && b.is_bookmarked
    );
  };

  const handlePlanClick = (plan: StudyPlan) => {
    navigate(`/woomoonkyung/archive/${plan.study_plan_id}`);
  };

  const handleBackToList = () => {
    setSelectedPlan(null);
    navigate("/woomoonkyung/archive");
  };

  const removeFromArchive = (planId: string) => {
    // In real app, this would make an API call
    console.log("Remove from archive:", planId);
    alert("계획이 보관함에서 제거되었습니다.");
  };

  const addToMyPlans = (plan: StudyPlan) => {
    // In real app, this would copy the plan to user's plans
    console.log("Adding plan to my plans:", plan.study_plan_name);
    alert(`"${plan.study_plan_name}" 계획이 나의 계획으로 추가되었습니다!`);
  };

  const archivedPlans = getArchivedPlans();

  const filteredPlans = archivedPlans.filter((plan) => {
    // Filter by type
    if (
      selectedFilter === "bookmarked" &&
      !isBookmarkedPlan(plan.study_plan_id)
    )
      return false;
    if (selectedFilter === "completed" && plan.study_plans_state !== "done")
      return false;
    if (selectedFilter === "my_plans" && isRecommendedPlan(plan.study_plan_id))
      return false;

    // Filter by search query
    if (
      searchQuery &&
      !plan.study_plan_name.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !plan.study_plan_description
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    )
      return false;

    return true;
  });

  // If a plan is selected, show detail view
  if (selectedPlan) {
    const nodes = getNodesForPlan(selectedPlan.study_plan_id);
    const completedNodes = nodes.filter((node) => node.completed).length;
    const totalNodes = nodes.length;
    const progressPercentage =
      totalNodes > 0 ? (completedNodes / totalNodes) * 100 : 0;
    const isPlanRecommended = isRecommendedPlan(selectedPlan.study_plan_id);
    const isPlanBookmarked = isBookmarkedPlan(selectedPlan.study_plan_id);

    return (
      <div className="p-8 bg-gray-50">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Back Button */}
          <button
            onClick={handleBackToList}
            className="flex items-center gap-2 text-[#587CF0] hover:text-[#4a6de8] transition-colors"
          >
            <Target className="w-4 h-4 rotate-180" />
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
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-2xl font-bold text-gray-800">
                      {selectedPlan.study_plan_name}
                    </h1>
                    {isPlanRecommended ? (
                      <span className="flex items-center gap-1 px-2 py-1 text-sm text-blue-700 bg-blue-100 border border-blue-200 rounded-full">
                        <Award className="w-3 h-3" />
                        System Recommended
                      </span>
                    ) : (
                      <span className="flex items-center gap-1 px-2 py-1 text-sm text-green-700 bg-green-100 border border-green-200 rounded-full">
                        <User className="w-3 h-3" />
                        My Plan
                      </span>
                    )}
                    {isPlanBookmarked && (
                      <span className="flex items-center gap-1 px-2 py-1 text-sm text-yellow-700 bg-yellow-100 border border-yellow-200 rounded-full">
                        <BookmarkCheck className="w-3 h-3" />
                        Bookmarked
                      </span>
                    )}
                  </div>
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
                    {stateIcons[selectedPlan.study_plans_state]}{" "}
                    {selectedPlan.study_plans_state}
                  </span>
                </div>
              </div>

              {/* Progress */}
              <div className="mb-4 space-y-2">
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

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                {isPlanRecommended && (
                  <button
                    onClick={() => addToMyPlans(selectedPlan)}
                    className="flex items-center gap-2 px-4 py-2 bg-[#587CF0] text-white rounded-lg hover:bg-[#4a6de8] transition-colors"
                  >
                    <Download className="w-4 h-4" />
                    Add to My Plans
                  </button>
                )}
                <button
                  onClick={() => removeFromArchive(selectedPlan.study_plan_id)}
                  className="flex items-center gap-2 px-4 py-2 text-gray-700 transition-colors bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  <Archive className="w-4 h-4" />
                  Remove from Archive
                </button>
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
                      : "border-gray-200 bg-white"
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
                <Target className="w-12 h-12 mx-auto mb-4 text-gray-400" />
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
  }

  // Main archive list view
  return (
    <div className="p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="flex items-center gap-3 text-2xl font-bold text-gray-800">
              <Archive className="h-7 w-7 text-[#587CF0]" />
              Study Plans Archive
            </h1>
            <p className="text-gray-600">
              Completed plans and bookmarked recommendations
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
              <input
                type="text"
                placeholder="Search archived plans..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#587CF0] focus:border-transparent bg-white transition-all duration-200"
              />
            </div>
          </div>
        </div>

        {/* Statistics Banner */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          <div className="p-4 bg-white border border-purple-100 rounded-lg shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-blue-100 rounded-lg">
                <Archive className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Archived</p>
                <p className="text-xl font-semibold text-gray-800">
                  {archivedPlans.length}
                </p>
              </div>
            </div>
          </div>
          <div className="p-4 bg-white border border-purple-100 rounded-lg shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-lg">
                <CheckCircle2 className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Completed</p>
                <p className="text-xl font-semibold text-gray-800">
                  {
                    archivedPlans.filter((p) => p.study_plans_state === "done")
                      .length
                  }
                </p>
              </div>
            </div>
          </div>
          <div className="p-4 bg-white border border-purple-100 rounded-lg shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-yellow-100 rounded-lg">
                <BookmarkCheck className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Bookmarked</p>
                <p className="text-xl font-semibold text-gray-800">
                  {
                    archivedPlans.filter((p) =>
                      isBookmarkedPlan(p.study_plan_id)
                    ).length
                  }
                </p>
              </div>
            </div>
          </div>
          <div className="p-4 bg-white border border-purple-100 rounded-lg shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-lg">
                <User className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">My Plans</p>
                <p className="text-xl font-semibold text-gray-800">
                  {
                    archivedPlans.filter(
                      (p) => !isRecommendedPlan(p.study_plan_id)
                    ).length
                  }
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Archived Plans List */}
        <div className="p-6 bg-white border border-purple-100 shadow-sm rounded-xl">
          <h2 className="mb-6 text-lg font-semibold text-gray-800">
            Archived Plans
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPlans.map((plan) => {
              const completedNodes = getCompletedNodesCount(plan.study_plan_id);
              const totalNodes = getTotalNodesCount(plan.study_plan_id);
              const progressPercentage = getProgressPercentage(
                plan.study_plan_id
              );
              const isPlanRecommended = isRecommendedPlan(plan.study_plan_id);
              const isPlanBookmarked = isBookmarkedPlan(plan.study_plan_id);

              return (
                <div
                  key={plan.study_plan_id}
                  className="overflow-hidden transition-shadow bg-white border border-gray-200 rounded-lg cursor-pointer hover:shadow-md"
                  onClick={() => handlePlanClick(plan)}
                >
                  {plan.study_plans_image_url && (
                    <div className="h-32 overflow-hidden bg-gray-200">
                      <img
                        src={plan.study_plans_image_url}
                        alt={plan.study_plan_name}
                        className="object-cover w-full h-full"
                      />
                    </div>
                  )}

                  <div className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="mb-1 font-semibold text-gray-800">
                          {plan.study_plan_name}
                        </h3>
                        <p className="text-sm text-gray-600 line-clamp-2">
                          {plan.study_plan_description}
                        </p>
                      </div>
                    </div>

                    {/* Badges */}
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      {isPlanRecommended ? (
                        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs text-blue-700 bg-blue-100 border border-blue-200 rounded-full">
                          <Award className="w-3 h-3" />
                          System
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs text-green-700 bg-green-100 border border-green-200 rounded-full">
                          <User className="w-3 h-3" />
                          My Plan
                        </span>
                      )}
                      {isPlanBookmarked && (
                        <span className="inline-flex items-center gap-1 px-2 py-1 text-xs text-yellow-700 bg-yellow-100 border border-yellow-200 rounded-full">
                          <BookmarkCheck className="w-3 h-3" />
                          Bookmarked
                        </span>
                      )}
                      <span
                        className={`inline-flex items-center gap-1 px-2 py-1 text-xs rounded-full border ${
                          stateColors[plan.study_plans_state]
                        }`}
                      >
                        <span>{stateIcons[plan.study_plans_state]}</span>
                        {plan.study_plans_state}
                      </span>
                    </div>

                    {/* Progress */}
                    <div className="mb-3">
                      <div className="flex justify-between mb-1 text-xs text-gray-500">
                        <span>Progress</span>
                        <span>
                          {completedNodes}/{totalNodes} nodes
                        </span>
                      </div>
                      <div className="w-full h-2 bg-gray-200 rounded-full">
                        <div
                          className="bg-[#587CF0] h-2 rounded-full transition-all duration-300"
                          style={{ width: `${progressPercentage}%` }}
                        ></div>
                      </div>
                    </div>

                    {/* Dates */}
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>
                          {new Date(
                            plan.study_plans_start_date
                          ).toLocaleDateString()}
                        </span>
                      </div>
                      <span>→</span>
                      <div className="flex items-center gap-1">
                        <Target className="w-3 h-3" />
                        <span>
                          {new Date(
                            plan.study_plans_end_date
                          ).toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredPlans.length === 0 && (
            <div className="py-12 text-center">
              <Archive className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <h3 className="mb-2 text-lg font-medium text-gray-800">
                No archived plans found
              </h3>
              <p className="text-gray-600">
                Try adjusting your filters or search query
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StudyPlanArchive;

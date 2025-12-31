import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Star,
  BookOpen,
  Calendar,
  Target,
  Download,
  Bookmark,
  BookmarkCheck,
  Search,
  TrendingUp,
  Award,
  ArrowRight,
} from "lucide-react";
import {
  StudyPlan,
  StudyPlanNode,
  studyPlans as recommendedStudyPlans,
  studyPlanNodes as recommendedStudyPlanNodes,
  bookmarkedPlans,
  stateColors,
  stateIcons,
} from "../../data/Woomoonkyung/woomoonkyungData";

const RecommendedStudyPlans: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<StudyPlan | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [bookmarks, setBookmarks] = useState<Set<string>>(
    new Set(
      bookmarkedPlans.filter((b) => b.is_bookmarked).map((b) => b.study_plan_id)
    )
  );
  const navigate = useNavigate();

  const getNodesForPlan = (planId: string): StudyPlanNode[] => {
    return recommendedStudyPlanNodes
      .filter((node) => node.study_plan_id === planId)
      .sort((a, b) => a.position - b.position);
  };

  const getTotalNodesCount = (planId: string): number => {
    return getNodesForPlan(planId).length;
  };

  const handlePlanClick = (plan: StudyPlan) => {
    navigate(`/woomoonkyung/recommended/${plan.study_plan_id}`);
  };

  const handleBackToList = (selectedPlanId: string) => {
    setSelectedPlan(null);
    navigate(`/woomoonkyung/${selectedPlanId}`);
  };

  const toggleBookmark = (planId: string) => {
    const newBookmarks = new Set(bookmarks);
    if (newBookmarks.has(planId)) {
      newBookmarks.delete(planId);
    } else {
      newBookmarks.add(planId);
    }
    setBookmarks(newBookmarks);
    // In real app, this would make an API call
    console.log("Toggle bookmark for plan:", planId);
  };

  const addToMyPlans = (plan: StudyPlan) => {
    // In real app, this would copy the plan to user's plans
    console.log("Adding plan to my plans:", plan.study_plan_name);
    alert(`"${plan.study_plan_name}" 계획이 나의 계획으로 추가되었습니다!`);
  };

  const filteredPlans = recommendedStudyPlans.filter((plan) => {
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
    const totalNodes = nodes.length;
    const isBookmarked = bookmarks.has(selectedPlan.study_plan_id);

    return (
      <div className="p-8 bg-gray-50">
        <div className="max-w-6xl mx-auto space-y-6">
          {/* Back Button */}
          <button
            onClick={() => handleBackToList(selectedPlan.study_plan_id)}
            className="flex items-center gap-2 text-[#587CF0] hover:text-[#4a6de8] transition-colors"
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
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-2xl font-bold text-gray-800">
                      {selectedPlan.study_plan_name}
                    </h1>
                    <span className="px-2 py-1 text-sm text-blue-700 bg-blue-100 border border-blue-200 rounded-full">
                      System Recommended
                    </span>
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
                      <span>{totalNodes} learning nodes</span>
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

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => toggleBookmark(selectedPlan.study_plan_id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${
                    isBookmarked
                      ? "bg-yellow-100 text-yellow-700 border border-yellow-200"
                      : "bg-gray-100 text-gray-700 border border-gray-200 hover:bg-yellow-50 hover:text-yellow-600"
                  }`}
                >
                  {isBookmarked ? (
                    <BookmarkCheck className="w-4 h-4" />
                  ) : (
                    <Bookmark className="w-4 h-4" />
                  )}
                  {isBookmarked ? "Bookmarked" : "Bookmark"}
                </button>
                <button
                  onClick={() => addToMyPlans(selectedPlan)}
                  className="flex items-center gap-2 px-4 py-2 bg-[#587CF0] text-white rounded-lg hover:bg-[#4a6de8] transition-colors"
                >
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
              {nodes.map((node, index) => (
                <div
                  key={node.study_plan_node_id}
                  className="p-4 bg-white border-2 border-gray-200 rounded-lg"
                >
                  <div className="flex items-start gap-3">
                    <div className="flex items-center justify-center w-8 h-8 rounded-full bg-[#587CF0] text-white text-sm font-medium">
                      {node.position}
                    </div>
                    <div className="flex-1">
                      <h4 className="mb-2 font-semibold text-gray-800">
                        {node.study_plan_node_name}
                      </h4>
                      <p className="mb-3 text-sm text-gray-600">
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
                </div>
              ))}
            </div>

            {nodes.length === 0 && (
              <div className="py-12 text-center">
                <BookOpen className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                <h3 className="mb-2 text-lg font-medium text-gray-800">
                  No learning nodes configured
                </h3>
                <p className="text-gray-600">
                  This study plan doesn't have detailed learning steps yet.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Main list view
  return (
    <div className="p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Recommended Study Plans
            </h1>
            <p className="text-gray-600">
              Discover curated study plans created by experts
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
              <input
                type="text"
                placeholder="Search plans..."
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
                <BookOpen className="w-5 h-5 text-blue-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Plans</p>
                <p className="text-xl font-semibold text-gray-800">
                  {recommendedStudyPlans.length}
                </p>
              </div>
            </div>
          </div>
          <div className="p-4 bg-white border border-purple-100 rounded-lg shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-yellow-100 rounded-lg">
                <Star className="w-5 h-5 text-yellow-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Bookmarked</p>
                <p className="text-xl font-semibold text-gray-800">
                  {bookmarks.size}
                </p>
              </div>
            </div>
          </div>
          <div className="p-4 bg-white border border-purple-100 rounded-lg shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-green-100 rounded-lg">
                <TrendingUp className="w-5 h-5 text-green-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Popular</p>
                <p className="text-xl font-semibold text-gray-800">
                  {
                    recommendedStudyPlans.filter(
                      (p) =>
                        p.study_plan_name.includes("Web") ||
                        p.study_plan_name.includes("Mobile")
                    ).length
                  }
                </p>
              </div>
            </div>
          </div>
          <div className="p-4 bg-white border border-purple-100 rounded-lg shadow-sm">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 bg-purple-100 rounded-lg">
                <Award className="w-5 h-5 text-purple-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600">Expert Created</p>
                <p className="text-xl font-semibold text-gray-800">
                  {recommendedStudyPlans.length}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Study Plans List */}
        <div className="p-6 bg-white border border-purple-100 shadow-sm rounded-xl">
          <h2 className="mb-6 text-lg font-semibold text-gray-800">
            Available Study Plans
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPlans.map((plan) => {
              const totalNodes = getTotalNodesCount(plan.study_plan_id);
              const isBookmarked = bookmarks.has(plan.study_plan_id);

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
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          toggleBookmark(plan.study_plan_id);
                        }}
                        className={`p-1 rounded transition-colors ${
                          isBookmarked
                            ? "text-yellow-500"
                            : "text-gray-400 hover:text-yellow-500"
                        }`}
                      >
                        {isBookmarked ? (
                          <BookmarkCheck className="w-4 h-4" />
                        ) : (
                          <Bookmark className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    {/* System Badge */}
                    <div className="mb-3">
                      <span className="inline-flex items-center gap-1 px-2 py-1 text-xs text-blue-700 bg-blue-100 border border-blue-200 rounded-full">
                        <Award className="w-3 h-3" />
                        System Recommended
                      </span>
                    </div>

                    {/* Stats */}
                    <div className="mb-3">
                      <div className="flex justify-between mb-1 text-xs text-gray-500">
                        <span>Learning Nodes</span>
                        <span>{totalNodes} steps</span>
                      </div>
                    </div>

                    {/* Dates */}
                    <div className="flex items-center justify-between mb-3 text-xs text-gray-500">
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

                    {/* Action Button */}
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addToMyPlans(plan);
                      }}
                      className="w-full px-3 py-2 bg-[#587CF0] text-white text-sm rounded-lg hover:bg-[#4a6de8] transition-colors flex items-center justify-center gap-2"
                    >
                      <Download className="w-3 h-3" />
                      Add to My Plans
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {filteredPlans.length === 0 && (
            <div className="py-12 text-center">
              <BookOpen className="w-12 h-12 mx-auto mb-4 text-gray-400" />
              <h3 className="mb-2 text-lg font-medium text-gray-800">
                No plans found
              </h3>
              <p className="text-gray-600">Try adjusting your search query</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecommendedStudyPlans;

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  BookOpen,
  Calendar,
  Target,
  Download,
  Bookmark,
  BookmarkCheck,
  Search,
  ArrowRight,
} from "lucide-react";
import {
  studyPlans as recommendedStudyPlans,
  studyPlanNodes as recommendedStudyPlanNodes,
  bookmarkedPlans,
  stateColors,
} from "../../data/Woomoonkyung/woomoonkyungData";
import {
  StudyPlan,
  StudyPlanNode,
} from "../../types/Woomoonkyung/StudyPlanNode";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const RecommendedStudyPlans: React.FC = () => {
  const [selectedPlan, setSelectedPlan] = useState<StudyPlan | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [bookmarks, setBookmarks] = useState<Set<number>>(
    new Set(
      bookmarkedPlans
        .filter((b) => b.is_bookmarked)
        .map((b) => Number(b.study_plan_id))
    )
  );
  const navigate = useNavigate();

  const getNodesForPlan = (planId: number): StudyPlanNode[] => {
    return recommendedStudyPlanNodes
      .filter((node) => node.study_plan_id === Number(planId))
      .sort((a, b) => a.position - b.position);
  };

  const getTotalNodesCount = (planId: number): number => {
    return getNodesForPlan(planId).length;
  };

  const handlePlanClick = (plan: StudyPlan) => {
    navigate(`/woomoonkyung/recommended/${plan.study_plan_id}`);
  };

  const handleBackToList = (selectedPlanId: number) => {
    setSelectedPlan(null);
    navigate(`/woomoonkyung/${selectedPlanId}`);
  };

  const toggleBookmark = (planId: number) => {
    const newBookmarks = new Set(bookmarks);
    if (newBookmarks.has(planId)) {
      newBookmarks.delete(planId);
      toast.info("북마크가 해제되었습니다.", { position: "top-right" });
    } else {
      newBookmarks.add(planId);
      toast.success("북마크에 추가되었습니다.", { position: "top-right" });
    }
    setBookmarks(newBookmarks);
  };

  const addToMyPlans = (plan: StudyPlan) => {
    // 실제 앱에서는 API 호출
    toast.success(
      `"${plan.study_plan_name}" 계획이 나의 계획에 추가되었습니다!`,
      {
        position: "top-right",
      }
    );
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
                        className={`p-1 rounded transition-colors `}
                      ></button>
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

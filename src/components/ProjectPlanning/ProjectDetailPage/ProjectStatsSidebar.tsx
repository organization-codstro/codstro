import { ProjectStatsSidebarProps } from "../../../types/pages/ProjectPlanning/ProjectDetailPage/ProjectStatsSidebar";

export const ProjectStatsSidebar = ({
  todos,
  isPlanning,
  onNewMeeting,
  onViewMeetings,
}: ProjectStatsSidebarProps) => {
  const total = todos.length;
  const done = todos.filter((t) => t.status === "done").length;
  const inProgress = todos.filter((t) => t.status === "in progress").length;
  const waiting = todos.filter((t) => t.status === "waiting").length;
  const progressPercent = total > 0 ? Math.round((done / total) * 100) : 0;

  return (
    <div className="space-y-6">
      {!isPlanning && (
        <>
          <div className="p-6 bg-white border border-gray-200 rounded-lg">
            <h3 className="mb-4 text-sm font-semibold text-gray-900">
              Task Progress
            </h3>

            {/* 진행률 바 */}
            <div className="mb-4">
              <div className="flex items-center justify-between mb-1 text-xs text-gray-500">
                <span>전체 진행률</span>
                <span className="font-medium text-gray-700">
                  {progressPercent}%
                </span>
              </div>
              <div className="w-full h-2 bg-gray-100 rounded-full">
                <div
                  className="h-2 rounded-full bg-[#587CF0] transition-all"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Total</span>
                <span className="font-medium text-gray-900">{total}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Completed</span>
                <span className="font-medium text-green-600">{done}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">In Progress</span>
                <span className="font-medium text-yellow-600">
                  {inProgress}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Waiting</span>
                <span className="font-medium text-gray-600">{waiting}</span>
              </div>
            </div>
          </div>

          <div className="p-6 bg-white border border-gray-200 rounded-lg">
            <h3 className="mb-4 text-sm font-semibold text-gray-900">
              Quick Actions
            </h3>
            <div className="space-y-2">
              <button
                onClick={onNewMeeting}
                className="w-full px-4 py-2 text-sm font-medium text-left text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Create Meeting
              </button>
              <button
                onClick={onViewMeetings}
                className="w-full px-4 py-2 text-sm font-medium text-left text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                View Meetings
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

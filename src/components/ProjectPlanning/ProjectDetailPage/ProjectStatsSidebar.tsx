import { ProjectStatsSidebarProps } from "../../../types/ProjectPlanning/ProjectDetailPage/ProjectStatsSidebar";


export const ProjectStatsSidebar = ({
  project,
  todos,
  isPlanning,
  onNewMeeting,
  onViewMeetings,
}: ProjectStatsSidebarProps) => {
  return (
    <div className="space-y-6">
      {!isPlanning && (
        <>
          <div className="p-6 bg-white border border-gray-200 rounded-lg">
            <h3 className="mb-4 text-sm font-semibold text-gray-900">
              Project Tasks
            </h3>
            <div className="space-y-3 text-sm">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Total</span>
                <span className="font-medium text-gray-900">
                  {todos.length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Completed</span>
                <span className="font-medium text-green-600">
                  {todos.filter((t) => t.status === "completed").length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">In Progress</span>
                <span className="font-medium text-yellow-600">
                  {todos.filter((t) => t.status === "in-progress").length}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Waiting</span>
                <span className="font-medium text-gray-600">
                  {todos.filter((t) => t.status === "pending").length}
                </span>
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

      <div className="p-6 bg-white border border-gray-200 rounded-lg">
        <h3 className="mb-4 text-sm font-semibold text-gray-900">
          Project Details
        </h3>
        <div className="space-y-2 text-sm">
          <div>
            <span className="text-gray-600">Created:</span>
            <span className="ml-2 text-gray-900">
              {new Date(project.project_created_date).toLocaleDateString()}
            </span>
          </div>
          <div>
            <span className="text-gray-600">Status:</span>
            <span className="ml-2 text-gray-900">
              {isPlanning ? "Planning" : "Active"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

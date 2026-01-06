import { Plus, Calendar, TrendingUp, Clock, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Project } from "../../types/ProjectPlanning/project";
import {
  activeProjectsData,
  planningProjectsData,
  trendingNewsData,
} from "../../data/ProjectPlanning/project";

export default function ProjectMain() {
  const navigate = useNavigate();

  // TODO: API 연동 전 임시 데이터
  const activeProjects: Project[] = activeProjectsData;
  const planningProjects: Project[] = planningProjectsData;

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      <div className="p-8 mx-auto max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">My Projects</h1>
            <p className="mt-1 text-gray-600">
              Plan and manage your projects with AI
            </p>
          </div>
          <button
            onClick={() => navigate("/projects/new")}
            className="flex items-center px-6 py-3 space-x-2 font-medium text-white transition-all rounded-lg hover:opacity-90"
            style={{ backgroundColor: "#587CF0" }}
          >
            <Plus className="w-5 h-5" />
            <span>New Project</span>
          </button>
        </div>

        <div className="grid grid-cols-1 gap-8 mb-8">
          {/* Active Projects */}
          <div>
            <div className="flex items-center mb-4 space-x-2">
              <Play className="w-5 h-5" style={{ color: "#587CF0" }} />
              <h2 className="text-xl font-semibold text-gray-900">
                Active Projects
              </h2>
            </div>

            {activeProjects.length === 0 ? (
              <div className="p-12 text-center bg-white border-2 border-gray-300 border-dashed rounded-lg">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-blue-50">
                  <Play className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="mb-2 text-lg font-medium text-gray-900">
                  No active projects yet
                </h3>
                <p className="mb-4 text-gray-600">
                  Complete project planning to start active projects
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {activeProjects.map((project) => (
                  <div
                    key={project.project_id}
                    className="p-6 transition-shadow bg-white border border-gray-200 rounded-lg cursor-pointer hover:shadow-md"
                    onClick={() => navigate(`/projects/${project.project_id}`)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {project.project_name}
                        </h3>
                        <p className="mt-1 text-sm text-gray-600">
                          {project.project_topic}
                        </p>
                      </div>
                      <div
                        className="flex-shrink-0 w-4 h-4 rounded-full"
                        style={{ backgroundColor: project.project_main_color }}
                      />
                    </div>
                    <p className="mb-3 text-sm text-gray-500 line-clamp-2">
                      {project.project_description}
                    </p>
                    <div className="flex items-center space-x-4 text-xs text-gray-500">
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3" />
                        <span>
                          {project.project_start_date} -{" "}
                          {project.project_end_date}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Planning Projects */}
          <div>
            <div className="flex items-center mb-4 space-x-2">
              <Clock className="w-5 h-5" style={{ color: "#F59E0B" }} />
              <h2 className="text-xl font-semibold text-gray-900">
                Planning Projects
              </h2>
            </div>

            {planningProjects.length === 0 ? (
              <div className="p-12 text-center bg-white border-2 border-gray-300 border-dashed rounded-lg">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-orange-50">
                  <Clock className="w-8 h-8 text-orange-400" />
                </div>
                <h3 className="mb-2 text-lg font-medium text-gray-900">
                  No projects in planning
                </h3>
                <p className="mb-4 text-gray-600">
                  Start planning your first project with AI assistance
                </p>
                <button
                  onClick={() => navigate("/projects/new")}
                  className="px-6 py-2 font-medium text-white rounded-lg"
                  style={{ backgroundColor: "#587CF0" }}
                >
                  Create Project
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {planningProjects.map((project) => (
                  <div
                    key={project.project_id}
                    className="p-6 transition-shadow bg-white border border-gray-200 rounded-lg cursor-pointer hover:shadow-md"
                    onClick={() => navigate(`/projects/${project.project_id}`)}
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {project.project_name}
                        </h3>
                        <p className="mt-1 text-sm text-gray-600">
                          {project.project_topic}
                        </p>
                      </div>
                      <div
                        className="flex-shrink-0 w-4 h-4 rounded-full"
                        style={{ backgroundColor: project.project_main_color }}
                      />
                    </div>
                    <p className="mb-3 text-sm text-gray-500 line-clamp-2">
                      {project.project_description}
                    </p>
                    <div className="flex items-center justify-between mt-4">
                      <span className="px-2 py-1 text-xs font-medium text-orange-700 bg-orange-100 rounded">
                        Planning
                      </span>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          navigate("/projects/new", {
                            state: { projectId: project.project_id },
                          });
                        }}
                        className="px-4 py-1 text-sm font-medium text-blue-600 hover:text-blue-700"
                      >
                        Continue Planning →
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Trending Topics - Optional sidebar */}
        {(activeProjects.length > 0 || planningProjects.length > 0) && (
          <div className="mt-8">
            <h2 className="flex items-center mb-4 space-x-2 text-xl font-semibold text-gray-900">
              <TrendingUp className="w-5 h-5" style={{ color: "#587CF0" }} />
              <span>Trending Topics</span>
            </h2>
            <div className="overflow-hidden bg-white border border-gray-200 rounded-lg">
              {trendingNewsData.map((news) => (
                <div
                  key={news.id}
                  className="p-4 transition-colors border-b border-gray-100 cursor-pointer last:border-b-0 hover:bg-gray-50"
                >
                  <h4 className="mb-1 text-sm font-medium text-gray-900">
                    {news.title}
                  </h4>
                  <p className="text-xs text-gray-500">{news.date}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

import { Plus, Calendar, TrendingUp } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Project } from "../../types/ProjectPlanning/project";

export default function ProjectMain() {
  const navigate = useNavigate();

  // TODO: API 연동 전 임시
  const projects: Project[] = [];

  const trendingNews = [
    {
      id: 1,
      title: "AI-powered development tools gaining popularity",
      date: "2025-12-25",
    },
    { id: 2, title: "New React 19 features released", date: "2025-12-24" },
    { id: 3, title: "TypeScript 5.4 improvements", date: "2025-12-23" },
  ];

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

        <div className="grid grid-cols-1 gap-6 mb-8 lg:grid-cols-3">
          {/* Active Projects */}
          <div className="lg:col-span-2">
            <h2 className="mb-4 text-xl font-semibold text-gray-900">
              Active Projects
            </h2>

            {projects.length === 0 ? (
              <div className="p-12 text-center bg-white border-2 border-gray-300 border-dashed rounded-lg">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-blue-50">
                  <Plus className="w-8 h-8 text-blue-400" />
                </div>
                <h3 className="mb-2 text-lg font-medium text-gray-900">
                  No projects yet
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
              <div className="space-y-4">
                {projects.map((project) => (
                  <div
                    key={project.project_id}
                    className="p-6 transition-shadow bg-white border border-gray-200 rounded-lg cursor-pointer hover:shadow-md"
                    onClick={() => navigate(`/projects/${project.project_id}`)}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-gray-900">
                          {project.project_name}
                        </h3>
                        <p className="mt-1 text-gray-600">
                          {project.project_topic}
                        </p>
                        <div className="flex items-center mt-3 space-x-4 text-sm text-gray-500">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {project.project_start_date} -{" "}
                              {project.project_end_date}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: project.project_main_color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Trending */}
          <div>
            <h2 className="flex items-center mb-4 space-x-2 text-xl font-semibold text-gray-900">
              <TrendingUp className="w-5 h-5" style={{ color: "#587CF0" }} />
              <span>Trending Topics</span>
            </h2>
            <div className="overflow-hidden bg-white border border-gray-200 rounded-lg">
              {trendingNews.map((news) => (
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
        </div>
      </div>
    </div>
  );
}

import { useNavigate } from "react-router-dom";
import { Calendar, ArrowRight } from "lucide-react";
import { archivedProjectsData } from "../../data/ProjectPlanning/project";

const ProjectPlanningArchive = () => {
  const navigate = useNavigate();

  // TODO: API 연동 - 실제 아카이브된 프로젝트 데이터 가져오기
  const archivedProjects = archivedProjectsData;

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      {/* Header */}
      <div className="px-8 py-6 bg-white border-b border-gray-200">
        <div className="mx-auto max-w-7xl">
          <h1 className="text-3xl font-bold text-gray-900">
            Archived Projects
          </h1>
          <p className="mt-1 text-gray-600">마감일이 끝난 프로젝트 입니다.</p>
        </div>
      </div>

      {/* Projects List */}
      <div className="p-8 mx-auto max-w-7xl">
        {archivedProjects.length === 0 ? (
          <div className="p-12 text-center bg-white border-2 border-gray-300 border-dashed rounded-lg">
            <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full">
              <Calendar className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="mb-2 text-lg font-medium text-gray-900">
              No archived projects
            </h3>
            <p className="text-gray-600">마감일이 끝난 프로젝트가 없습니다.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {archivedProjects.map((project) => (
              <div
                key={project.project_id}
                className="p-6 transition-shadow bg-white border border-gray-200 rounded-lg cursor-pointer hover:shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                onClick={() => navigate(`/projects/${project.project_id}`)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    navigate(`/projects/${project.project_id}`);
                  }
                }}
                role="button"
                tabIndex={0}
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
                <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                  <div className="flex items-center space-x-2 text-xs text-gray-500">
                    <Calendar className="w-3 h-3" />
                    <span>
                      {project.project_start_date} - {project.project_end_date}
                    </span>
                  </div>
                  <div className="flex items-center space-x-1 text-sm text-gray-600">
                    <span>View</span>
                    <ArrowRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ProjectPlanningArchive;

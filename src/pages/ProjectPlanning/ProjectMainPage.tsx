import { Play, Clock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Project } from "../../types/pages/ProjectPlanning/project";
import {
  activeProjectsData,
  planningProjectsData,
  trendingNewsData,
} from "../../data/ProjectPlanning/project";
import { ProjectListHeader } from "../../components/ProjectPlanning/ProjectMainPage/ProjectListHeader";
import { EmptyProjectState } from "../../components/ProjectPlanning/EmptyProjectState";
import { ProjectCard } from "../../components/ProjectPlanning/ProjectCard";
import { TrendingSection } from "../../components/ProjectPlanning/ProjectMainPage/TrendingSection";

export default function ProjectMain() {
  const navigate = useNavigate();

  const activeProjects: Project[] = activeProjectsData;
  const planningProjects: Project[] = planningProjectsData;

  const handleCreateNew = () => navigate("/projects/new");

  return (
    <div className="flex-1 overflow-auto bg-gray-50">
      <div className="p-8 mx-auto max-w-7xl">
        <ProjectListHeader onNewProject={handleCreateNew} />

        <div className="grid grid-cols-1 gap-8 mb-8">
          {/* Active Projects Section */}
          <div>
            <div className="flex items-center mb-4 space-x-2">
              <Play className="w-5 h-5 text-[#587CF0]" />
              <h2 className="text-xl font-semibold text-gray-900">
                Active Projects
              </h2>
            </div>

            {activeProjects.length === 0 ? (
              <EmptyProjectState
                Icon={Play}
                title="No active projects yet"
                description="Complete project planning to start active projects"
                colorClass="text-blue-400"
                bgColorClass="bg-blue-50"
              />
            ) : (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {activeProjects.map((project) => (
                  <ProjectCard
                    key={project.project_id}
                    project={project}
                    onClick={() => navigate(`/projects/${project.project_id}`)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Planning Projects Section */}
          <div>
            <div className="flex items-center mb-4 space-x-2">
              <Clock className="w-5 h-5 text-[#F59E0B]" />
              <h2 className="text-xl font-semibold text-gray-900">
                Planning Projects
              </h2>
            </div>

            {planningProjects.length === 0 ? (
              <EmptyProjectState
                Icon={Clock}
                title="No projects in planning"
                description="Start planning your first project with AI assistance"
                actionLabel="Create Project"
                onAction={handleCreateNew}
                colorClass="text-orange-400"
                bgColorClass="bg-orange-50"
              />
            ) : (
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                {planningProjects.map((project) => (
                  <ProjectCard
                    key={project.project_id}
                    project={project}
                    onClick={() => navigate(`/projects/${project.project_id}`)}
                    onContinue={(e) => {
                      e.stopPropagation();
                      navigate("/projects/new", {
                        state: { projectId: project.project_id },
                      });
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Trending Section */}
        {(activeProjects.length > 0 || planningProjects.length > 0) && (
          <TrendingSection news={trendingNewsData} />
        )}
      </div>
    </div>
  );
}

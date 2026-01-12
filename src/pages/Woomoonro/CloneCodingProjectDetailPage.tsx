import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  projectsData,
  userProjectsData as initialUserProjectsData,
  projectTodosData,
  difficultyColors,
  statusColors,
} from "../../data/woomoonro/woomoonroData";
import ProjectDetailHeader from "../../components/Woomoonro/CloneCodingProjectDetailPage/ProjectDetailHeader";
import ProjectInfoGrid from "../../components/Woomoonro/CloneCodingProjectDetailPage/ProjectInfoGrid";
import ProjectStatusCard from "../../components/Woomoonro/CloneCodingProjectDetailPage/ProjectStatusCard";
import {
  CloneCodingProject,
  UserCloneCodingProject,
} from "../../types/pages/Woomoonro/woomoonro";

const ProjectDetailPage: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();

  const [project, setProject] = useState<CloneCodingProject | null>(null);
  const [userProject, setUserProject] = useState<
    UserCloneCodingProject | undefined
  >(undefined);
  const [userProjectsData, setUserProjectsData] = useState(
    initialUserProjectsData
  );

  useEffect(() => {
    if (projectId) {
      const numericId = Number(projectId);
      const foundProject = projectsData.find((p) => p.id === numericId);

      if (foundProject) {
        setProject(foundProject);
        setUserProject(
          userProjectsData.find((up) => up.project_id === numericId)
        );
      } else {
        navigate("/woomoonro");
      }
    }
  }, [projectId, navigate, userProjectsData]);

  if (!project) return null;

  const onToggleBookmark = () => {
    setUserProjectsData((prev) =>
      prev.map((up) =>
        up.project_id === project.id
          ? { ...up, is_bookmarked: !up.is_bookmarked }
          : up
      )
    );
  };

  const onUpdateStatus = (status: UserCloneCodingProject["status"]) => {
    console.log("Update status to:", status);
    // 실제 API 호출 로직이 들어갈 자리
  };

  const currentTodos = projectTodosData.filter(
    (t) => t.project_id === project.id
  );
  const completedCount = currentTodos.filter((t) => t.is_completed).length;
  const progress =
    currentTodos.length > 0 ? (completedCount / currentTodos.length) * 100 : 0;

  return (
    <div className="min-h-screen p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <ProjectDetailHeader
          title={project.title}
          description={project.description}
          isBookmarked={!!userProject?.is_bookmarked}
          onBack={() => navigate("/woomoonro")}
          onToggleBookmark={onToggleBookmark}
        />

        <div className="overflow-hidden bg-white border border-purple-100 shadow-sm rounded-xl">
          {project.thumbnail_url && (
            <div className="h-64 overflow-hidden bg-gray-200">
              <img
                src={project.thumbnail_url}
                alt=""
                className="object-cover w-full h-full"
              />
            </div>
          )}

          <div className="p-8">
            <div className="grid grid-cols-1 gap-12 md:grid-cols-3">
              <ProjectInfoGrid
                difficulty={project.difficulty}
                difficultyColor={difficultyColors[project.difficulty]}
                status={userProject?.status}
                statusColor={
                  userProject ? statusColors[userProject.status] : ""
                }
                estimatedHours={project.estimated_hours}
                techStack={project.tech_stack}
                tags={project.tags}
                githubUrl={project.github_url}
                demoUrl={project.demo_url}
              />

              <ProjectStatusCard
                currentStatus={userProject?.status || "not_started"}
                onStatusChange={onUpdateStatus}
                completedTodos={completedCount}
                totalTodos={currentTodos.length}
                progressPercentage={progress}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailPage;

import React from "react";
import {
  Clock,
  BookmarkCheck,
  Calendar,
  CheckCircle2,
  Github,
  ExternalLink,
  Bookmark,
} from "lucide-react";

import { CloneCodingProjectCardProps } from "../../../types/pages/Woomoonro/CloneCodingProjectGrid/CloneCodingProjectCard";
import {
  DIFFICULTY_COLORS,
  STATUS_COLORS,
} from "../../../constants/Woomoonro/woomoonro";
import CloneCodingProjectImg from "../../../assets/images/woomoonro/CloneCodingProjectImg.png";

// --- ProjectCard 컴포넌트 ---

const ProjectCard = ({
  project,
  userProject,
  onClick,
  onToggleBookmark,
}: CloneCodingProjectCardProps) => {
  const handleBookmarkClick = (e: React.MouseEvent) => {
    e.stopPropagation(); // 카드 클릭 이벤트 전파 방지
    onToggleBookmark(project.id);
  };

  return (
    <div
      className="overflow-hidden transition-shadow bg-white border border-purple-100 shadow-sm cursor-pointer rounded-xl hover:shadow-md"
      onClick={() => onClick(project.id)}
    >
      {/* Project Image */}
      <div className="h-48 overflow-hidden bg-gray-200">
        <img
          src={
            project.thumbnail_url
              ? project.thumbnail_url
              : CloneCodingProjectImg
          }
          alt={project.title}
          className="object-cover w-full h-full"
        />
      </div>

      <div className="p-6">
        {/* Header */}
        <div className="flex items-start justify-between mb-3">
          <div className="flex-1">
            <h3 className="mb-2 text-lg font-semibold text-gray-800">
              {project.title}
            </h3>
            <p className="mb-3 text-sm text-gray-600 line-clamp-2">
              {project.description}
            </p>
          </div>
          <button
            onClick={handleBookmarkClick}
            className="flex items-center gap-1 transition-colors hover:scale-110"
            aria-label={userProject?.is_bookmarked ? "북마크 해제" : "북마크"}
          >
            {userProject?.is_bookmarked ? (
              <BookmarkCheck className="w-6 h-6 text-yellow-500" />
            ) : (
              <Bookmark className="w-6 h-6 text-gray-400 hover:text-gray-600" />
            )}
          </button>
        </div>

        {/* Badges */}
        <div className="flex items-center gap-2 mb-4">
          <span
            className={`px-2 py-1 text-xs rounded-full border ${
              DIFFICULTY_COLORS[project.difficulty]
            }`}
          >
            {project.difficulty}
          </span>

          <span
            className={`px-2 py-1 text-xs rounded-full border ${
              userProject
                ? STATUS_COLORS[userProject.status]
                : STATUS_COLORS["waiting"]
            }`}
          >
            {userProject ? userProject.status : "waiting"}
          </span>

          <span className="flex items-center gap-1 px-2 py-1 text-xs text-gray-600 bg-gray-100 rounded-full">
            <Clock className="w-3 h-3" />
            {project.estimated_hours}
          </span>
        </div>

        {/* Tech Stack */}
        <div className="mb-4">
          <div className="flex flex-wrap gap-1">
            {project.tech_stack.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 text-xs text-blue-700 border border-blue-200 rounded bg-blue-50"
              >
                {tech}
              </span>
            ))}
            {project.tech_stack.length > 3 && (
              <span className="px-2 py-1 text-xs text-gray-500 bg-gray-100 rounded">
                +{project.tech_stack.length - 3}
              </span>
            )}
          </div>
        </div>

        {/* Progress Notes */}
        {userProject?.progress_notes && (
          <div className="p-3 mb-4 rounded-lg bg-blue-50">
            <p className="text-sm text-blue-800 line-clamp-2">
              {userProject.progress_notes}
            </p>
          </div>
        )}

        {/* Dates */}
        <div className="flex items-center justify-between text-xs text-gray-500">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>Added: {project.created_at}</span>
          </div>
          {userProject?.completed_at && (
            <div className="flex items-center gap-1">
              <CheckCircle2 className="w-3 h-3 text-green-500" />
              <span>
                Completed:{" "}
                {new Date(userProject.completed_at).toLocaleDateString()}
              </span>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex items-center justify-between pt-4 mt-4 border-t border-gray-100">
          <div className="flex items-center gap-2">
            {project.github_url && (
              <a
                href={project.github_url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-2 text-gray-400 transition-colors hover:text-gray-600"
              >
                <Github className="w-4 h-4" />
              </a>
            )}
            {project.demo_url && (
              <a
                href={project.demo_url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={(e) => e.stopPropagation()}
                className="p-2 text-gray-400 transition-colors hover:text-gray-600"
              >
                <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectCard;

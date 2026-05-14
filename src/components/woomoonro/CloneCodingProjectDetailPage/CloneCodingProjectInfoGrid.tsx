import React from "react";
import { Clock, Github, ExternalLink } from "lucide-react";
import { CloneCodingProjectInfoGridProps } from "../../../types/pages/Woomoonro/CloneCodingProjectDetailPage/CloneCodingProjectInfoGrid";

export const ProjectInfoGrid: React.FC<CloneCodingProjectInfoGridProps> = ({
  status,
  statusColor,
  estimatedHours,
  techStack,
  tags,
  githubUrl,
  demoUrl,
}) => {
  return (
    <div className="space-y-6 md:col-span-2">
      <div className="flex flex-wrap items-center gap-3">
        {status && (
          <span
            className={`px-3 py-1 text-sm rounded-full border ${statusColor}`}
          >
            {status.replace("_", " ")}
          </span>
        )}
        <span className="flex items-center gap-1 px-3 py-1 text-sm text-gray-600 bg-gray-100 rounded-full">
          <Clock className="w-4 h-4" /> {estimatedHours}
        </span>
      </div>

      <div>
        <h3 className="mb-2 font-medium text-gray-800">Tech Stack</h3>
        <div className="flex flex-wrap gap-2">
          {techStack.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-sm text-blue-700 border border-blue-200 rounded-lg bg-blue-50"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div>
        <h3 className="mb-2 font-medium text-gray-800">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-sm text-gray-600 bg-gray-100 rounded-lg"
            >
              #{tag}
            </span>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-4 pt-2">
        {githubUrl && (
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 text-white transition-colors bg-gray-800 rounded-lg hover:bg-gray-700"
          >
            <Github className="w-4 h-4" /> GitHub
          </a>
        )}
        {demoUrl && (
          <a
            href={demoUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-4 py-2 bg-[#587CF0] text-white rounded-lg hover:bg-[#4a6de8] transition-colors"
          >
            <ExternalLink className="w-4 h-4" /> Live Demo
          </a>
        )}
      </div>
    </div>
  );
};

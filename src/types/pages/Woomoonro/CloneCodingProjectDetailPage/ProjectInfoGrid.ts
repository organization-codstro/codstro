export interface ProjectInfoGridProps {
  difficulty: string;
  difficultyColor: string;
  status?: string;
  statusColor?: string;
  estimatedHours: number;
  techStack: string[];
  tags: string[];
  githubUrl?: string;
  demoUrl?: string;
}

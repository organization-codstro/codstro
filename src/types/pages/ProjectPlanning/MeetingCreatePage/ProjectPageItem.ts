import { ProjectPage } from "../project";

export interface ProjectPageItemProps {
  page: ProjectPage;
  isSelected: boolean;
  onToggle: (id: string) => void;
}

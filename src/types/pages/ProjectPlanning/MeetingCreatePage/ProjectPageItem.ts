import { ProjectPage } from "../../../common/ProjectPlanning";

export interface ProjectPageItemProps {
  page: ProjectPage;
  isSelected: boolean;
  onToggle: (id: string) => void;
}

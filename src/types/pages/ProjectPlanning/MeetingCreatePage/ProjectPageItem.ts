import { ProjectPage } from "../../../common/projectPlanning";

export interface ProjectPageItemProps {
  page: ProjectPage;
  isSelected: boolean;
  onToggle: (id: string) => void;
}

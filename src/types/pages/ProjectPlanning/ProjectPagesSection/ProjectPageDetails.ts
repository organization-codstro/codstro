import { ProjectPage } from "../../../common/projectPlanning";

export interface ProjectPageDetailsProps {
  isEditing: boolean;
  page: ProjectPage;
  onUpdateField: (field: keyof ProjectPage, value: string | boolean) => void;
}

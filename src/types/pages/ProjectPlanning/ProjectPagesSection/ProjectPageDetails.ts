import { ProjectPage } from "../project";

export interface ProjectPageDetailsProps {
  isEditing: boolean;
  page: ProjectPage;
  onUpdateField: (field: keyof ProjectPage, value: string | boolean) => void;
}

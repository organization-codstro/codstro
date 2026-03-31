import { ProjectPage } from "../../../common/ProjectPlanning";

export interface PageHeaderProps {
  page: ProjectPage;
  isEditing: boolean;
  isExpanded: boolean;
  isPagePending: boolean;
  onToggleExpand: () => void;
  onUpdateField: (field: keyof ProjectPage, value: string) => void;
  onSave: () => void;
  onCancel: () => void;
  onEdit?: () => void;
  onDelete?: (e: React.MouseEvent) => void;
}

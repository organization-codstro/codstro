import { ProjectPageItemProps } from "../../../types/pages/ProjectPlanning/MeetingCreatePage/ProjectPageItem";


export const ProjectPageItem = ({ page, isSelected, onToggle }: ProjectPageItemProps) => {
  return (
    <label className="flex items-start p-4 transition-colors border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() => onToggle(page.project_page_id)}
        className="mt-1 mr-3"
      />
      <div className="flex-1">
        <h4 className="font-medium text-gray-900">{page.project_page_name}</h4>
        <p className="mt-1 text-sm text-gray-600">
          {page.project_page_function}
        </p>
      </div>
    </label>
  );
};

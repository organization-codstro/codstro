import { NotFoundViewProps } from "../../types/CompanyInformation/NotFoundView";

export const NotFoundView = ({
  message = "Interview not found",
}: NotFoundViewProps) => {
  return (
    <div className="flex items-center justify-center p-8 min-h-[200px]">
      <p className="text-lg text-gray-500">{message}</p>
    </div>
  );
};

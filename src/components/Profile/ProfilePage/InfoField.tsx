import { InfoFieldProps } from "../../../types/Profile/ProfilePage/InfoField";

export default function InfoField({
  label,
  value,
  icon: Icon,
}: InfoFieldProps) {
  return (
    <div>
      <label className="flex items-center gap-2 mb-2 text-sm font-medium text-gray-600">
        {Icon && <Icon className="w-4 h-4" />}
        {label}
      </label>
      <p className="text-lg text-gray-900">{value}</p>
    </div>
  );
}

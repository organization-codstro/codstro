import React from "react";
import { TodoInputFieldProps } from "../../../types/Woomoonjeong/TodoManagementUpdate/TodoInputField";

const TodoInputField: React.FC<TodoInputFieldProps> = ({
  label,
  name,
  type = "text",
  value,
  onChange,
  error,
  placeholder,
  required,
}) => (
  <div>
    <label className="block mb-2 text-sm font-medium text-gray-700">
      {label} {required && "*"}
    </label>
    <input
      type={type}
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#587CF0] transition-all ${
        error ? "border-red-500" : "border-gray-200"
      }`}
    />
    {error && <p className="mt-1 text-sm text-red-600">{error}</p>}
  </div>
);

export default TodoInputField;

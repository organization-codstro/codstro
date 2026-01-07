import React from "react";

interface Props {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: React.ChangeEvent<any>) => void;
  error?: string;
  placeholder?: string;
  required?: boolean;
}

const TodoInputField: React.FC<Props> = ({
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

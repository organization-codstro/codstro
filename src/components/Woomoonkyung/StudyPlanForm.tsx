import React, { useState, useEffect } from "react";
import { ArrowLeft, Calendar, Save, X } from "lucide-react";
import { StudyPlan } from "../../types/pages/Woomoonkyung/Woomoonkyung";
import { StudyPlanFormFormData } from "../../types/pages/Woomoonkyung/StudyPlanForm";


interface StudyPlanFormProps {
  mode: "create" | "edit";
  existingPlan?: StudyPlan;
  onSave: (
    planData: Omit<StudyPlan, "study_plan_id" | "study_plans_created_date">
  ) => void;
  onCancel?: () => void;
}

const StudyPlanForm: React.FC<StudyPlanFormProps> = ({
  mode,
  existingPlan,
  onSave,
  onCancel,
}) => {
  const [formData, setFormData] = useState<StudyPlanFormFormData>({
    study_plan_name: "",
    study_plan_description: "",
    study_plans_image_url: "",
    study_plans_start_date: "",
    study_plans_end_date: "",
    study_plans_is_archived: false,
    study_plans_state: "waiting",
    user_id: 1, // 실제 환경에서는 로그인된 유저 ID
    study_plan_is_recommendation: false,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (mode === "edit" && existingPlan) {
      setFormData({
        study_plan_name: existingPlan.study_plan_name,
        study_plan_description: existingPlan.study_plan_description,
        study_plans_image_url: existingPlan.study_plans_image_url || "",
        study_plans_start_date: existingPlan.study_plans_start_date,
        study_plans_end_date: existingPlan.study_plans_end_date,
        study_plans_is_archived: existingPlan.study_plans_is_archived,
        study_plans_state: existingPlan.study_plans_state,
        user_id: Number(existingPlan.user_id),
        study_plan_is_recommendation: existingPlan.study_plan_is_recommendation,
      });
    }
  }, [mode, existingPlan]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }));

    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    // 계획 이름은 여전히 필수
    if (!formData.study_plan_name.trim())
      newErrors.study_plan_name = "계획 이름을 입력해주세요.";

    // ✅ 계획 설명 필수 체크 삭제

    if (!formData.study_plans_start_date)
      newErrors.study_plans_start_date = "시작일을 선택해주세요.";
    if (!formData.study_plans_end_date)
      newErrors.study_plans_end_date = "종료일을 선택해주세요.";

    if (formData.study_plans_start_date && formData.study_plans_end_date) {
      if (
        new Date(formData.study_plans_start_date) >=
        new Date(formData.study_plans_end_date)
      ) {
        newErrors.study_plans_end_date = "종료일은 시작일보다 늦어야 합니다.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      onSave(formData);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <button
          onClick={onCancel}
          className="p-2 transition-colors rounded-lg hover:bg-gray-100"
        >
          <ArrowLeft className="w-5 h-5 text-gray-600" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-800">
            {mode === "create" ? "새 공부 계획 만들기" : "공부 계획 수정"}
          </h1>
          <p className="text-gray-600">
            {mode === "create"
              ? "새로운 공부 계획의 기본 정보를 입력해주세요."
              : "공부 계획 정보를 수정해주세요."}
          </p>
        </div>
      </div>

      <div className="p-8 bg-white border border-purple-100 shadow-sm rounded-xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* 계획 이름 - 필수 */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              계획 이름 <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              name="study_plan_name"
              value={formData.study_plan_name}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 outline-none transition-all ${
                errors.study_plan_name
                  ? "border-red-500 focus:ring-red-200"
                  : "border-gray-200 focus:ring-[#587CF0]"
              }`}
              placeholder="예: Frontend Development Mastery"
            />
            {errors.study_plan_name && (
              <p className="mt-1 text-sm text-red-600">
                {errors.study_plan_name}
              </p>
            )}
          </div>

          {/* 계획 설명 - ✅ 비필수로 변경 */}
          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              계획 설명
            </label>
            <textarea
              name="study_plan_description"
              value={formData.study_plan_description}
              onChange={handleInputChange}
              rows={4}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#587CF0] outline-none transition-all resize-none"
              placeholder="이 공부 계획에 대한 자세한 설명을 입력해주세요..."
            />
          </div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {/* 시작일 - 필수 */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                시작일 <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Calendar className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                <input
                  type="date"
                  name="study_plans_start_date"
                  value={formData.study_plans_start_date}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 outline-none transition-all ${
                    errors.study_plans_start_date
                      ? "border-red-500 focus:ring-red-200"
                      : "border-gray-200 focus:ring-[#587CF0]"
                  }`}
                />
              </div>
              {errors.study_plans_start_date && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.study_plans_start_date}
                </p>
              )}
            </div>

            {/* 종료일 - 필수 */}
            <div>
              <label className="block mb-2 text-sm font-medium text-gray-700">
                종료일 <span className="text-red-500">*</span>
              </label>
              <div className="relative">
                <Calendar className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                <input
                  type="date"
                  name="study_plans_end_date"
                  value={formData.study_plans_end_date}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 outline-none transition-all ${
                    errors.study_plans_end_date
                      ? "border-red-500 focus:ring-red-200"
                      : "border-gray-200 focus:ring-[#587CF0]"
                  }`}
                />
              </div>
              {errors.study_plans_end_date && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.study_plans_end_date}
                </p>
              )}
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm font-medium text-gray-700">
              계획 상태
            </label>
            <select
              name="study_plans_state"
              value={formData.study_plans_state}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#587CF0] outline-none bg-white transition-all"
            >
              <option value="waiting">대기 중</option>
              <option value="in progress">진행 중</option>
              <option value="done">완료</option>
            </select>
          </div>

          <div>
            <label className="flex items-center gap-2 px-4 py-2 text-white bg-[#587CF0] rounded-lg cursor-pointer hover:bg-[#4a6de8] transition-colors w-fit">
              대표 이미지 선택
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) {
                    const reader = new FileReader();
                    reader.onload = () => {
                      setFormData((prev) => ({
                        ...prev,
                        study_plans_image_url: reader.result as string,
                      }));
                    };
                    reader.readAsDataURL(file);
                  }
                }}
              />
            </label>
            {formData.study_plans_image_url && (
              <div className="w-48 h-32 mt-3 overflow-hidden border border-gray-200 rounded-lg">
                <img
                  src={formData.study_plans_image_url}
                  alt="Preview"
                  className="object-cover w-full h-full"
                />
              </div>
            )}
          </div>

          <div className="flex items-center justify-end gap-4 pt-6 border-t border-gray-200">
            <button
              type="button"
              onClick={onCancel}
              className="flex items-center gap-2 px-6 py-3 text-gray-700 transition-colors border border-gray-200 rounded-lg hover:bg-gray-50"
            >
              <X className="w-4 h-4" />
              취소
            </button>
            <button
              type="submit"
              className="px-6 py-3 bg-[#587CF0] text-white rounded-lg hover:bg-[#4a6de8] transition-colors shadow-sm flex items-center gap-2"
            >
              <Save className="w-4 h-4" />
              {mode === "create" ? "계획 생성" : "변경사항 저장"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default StudyPlanForm;

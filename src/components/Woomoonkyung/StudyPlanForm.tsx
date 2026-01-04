import React, { useState, useEffect } from "react";
import { ArrowLeft, Calendar, Image, Save, X } from "lucide-react";
import { StudyPlan } from "../../types/Woomoonkyung/StudyPlanNode";

interface StudyPlanFormProps {
  mode: "create" | "edit";
  existingPlan?: StudyPlan;
  onSave: (
    planData: Omit<StudyPlan, "study_plan_id" | "study_plans_created_date">
  ) => void;
  onCancel: () => void;
}

const StudyPlanForm: React.FC<StudyPlanFormProps> = ({
  mode,
  existingPlan,
  onSave,
  onCancel,
}) => {
  type StudyPlanState = "waiting" | "in progress" | "done";

  interface StudyPlanForm {
    study_plan_name: string;
    study_plan_description: string;
    study_plans_image_url: string;
    study_plans_start_date: string;
    study_plans_end_date: string;
    study_plans_is_archived: boolean;
    study_plans_state: StudyPlanState;
    user_id: string;
  }

  const [formData, setFormData] = useState<StudyPlanForm>({
    study_plan_name: "",
    study_plan_description: "",
    study_plans_image_url: "",
    study_plans_start_date: "",
    study_plans_end_date: "",
    study_plans_is_archived: false,
    study_plans_state: "waiting", // ✅ 문자열 값
    user_id: "user_1",
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
        user_id: existingPlan.user_id,
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

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.study_plan_name.trim()) {
      newErrors.study_plan_name = "계획 이름을 입력해주세요.";
    }

    if (!formData.study_plan_description.trim()) {
      newErrors.study_plan_description = "계획 설명을 입력해주세요.";
    }

    if (!formData.study_plans_start_date) {
      newErrors.study_plans_start_date = "시작일을 선택해주세요.";
    }

    if (!formData.study_plans_end_date) {
      newErrors.study_plans_end_date = "종료일을 선택해주세요.";
    }

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

  const suggestedImages = [
    "https://images.pexels.com/photos/270348/pexels-photo-270348.jpeg",
    "https://images.pexels.com/photos/1181675/pexels-photo-1181675.jpeg",
    "https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg",
    "https://images.pexels.com/photos/4164418/pexels-photo-4164418.jpeg",
    "https://images.pexels.com/photos/1181671/pexels-photo-1181671.jpeg",
    "https://images.pexels.com/photos/196644/pexels-photo-196644.jpeg",
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header */}
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

      {/* Form */}
      <div className="p-8 bg-white border border-purple-100 shadow-sm rounded-xl">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Plan Name */}
          <div>
            <label
              htmlFor="study_plan_name"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              계획 이름 *
            </label>
            <input
              type="text"
              id="study_plan_name"
              name="study_plan_name"
              value={formData.study_plan_name}
              onChange={handleInputChange}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#587CF0] focus:border-transparent transition-all ${
                errors.study_plan_name ? "border-red-300" : "border-gray-200"
              }`}
              placeholder="예: Frontend Development Mastery"
            />
            {errors.study_plan_name && (
              <p className="mt-1 text-sm text-red-600">
                {errors.study_plan_name}
              </p>
            )}
          </div>

          {/* Plan Description */}
          <div>
            <label
              htmlFor="study_plan_description"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              계획 설명 *
            </label>
            <textarea
              id="study_plan_description"
              name="study_plan_description"
              value={formData.study_plan_description}
              onChange={handleInputChange}
              rows={4}
              className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#587CF0] focus:border-transparent transition-all resize-none ${
                errors.study_plan_description
                  ? "border-red-300"
                  : "border-gray-200"
              }`}
              placeholder="이 공부 계획에 대한 자세한 설명을 입력해주세요..."
            />
            {errors.study_plan_description && (
              <p className="mt-1 text-sm text-red-600">
                {errors.study_plan_description}
              </p>
            )}
          </div>

          {/* Date Range */}
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            <div>
              <label
                htmlFor="study_plans_start_date"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                시작일 *
              </label>
              <div className="relative">
                <Calendar className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                <input
                  type="date"
                  id="study_plans_start_date"
                  name="study_plans_start_date"
                  value={formData.study_plans_start_date}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#587CF0] focus:border-transparent transition-all ${
                    errors.study_plans_start_date
                      ? "border-red-300"
                      : "border-gray-200"
                  }`}
                />
              </div>
              {errors.study_plans_start_date && (
                <p className="mt-1 text-sm text-red-600">
                  {errors.study_plans_start_date}
                </p>
              )}
            </div>

            <div>
              <label
                htmlFor="study_plans_end_date"
                className="block mb-2 text-sm font-medium text-gray-700"
              >
                종료일 *
              </label>
              <div className="relative">
                <Calendar className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
                <input
                  type="date"
                  id="study_plans_end_date"
                  name="study_plans_end_date"
                  value={formData.study_plans_end_date}
                  onChange={handleInputChange}
                  className={`w-full pl-10 pr-4 py-3 border rounded-lg focus:ring-2 focus:ring-[#587CF0] focus:border-transparent transition-all ${
                    errors.study_plans_end_date
                      ? "border-red-300"
                      : "border-gray-200"
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

          {/* Plan State */}
          <div>
            <label
              htmlFor="study_plans_state"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              계획 상태
            </label>
            <select
              id="study_plans_state"
              name="study_plans_state"
              value={formData.study_plans_state}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#587CF0] focus:border-transparent transition-all"
            >
              <option value="waiting">대기 중</option>
              <option value="in progress">진행 중</option>
              <option value="done">완료</option>
            </select>
          </div>

          {/* Image URL */}
          <div>
            <label
              htmlFor="study_plans_image_url"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
              대표 이미지 URL
            </label>
            <div className="relative">
              <Image className="absolute w-4 h-4 text-gray-400 transform -translate-y-1/2 left-3 top-1/2" />
              <input
                type="url"
                id="study_plans_image_url"
                name="study_plans_image_url"
                value={formData.study_plans_image_url}
                onChange={handleInputChange}
                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#587CF0] focus:border-transparent transition-all"
                placeholder="https://example.com/image.jpg"
              />
            </div>

            {/* Suggested Images */}
            <div className="mt-3">
              <p className="mb-2 text-sm text-gray-600">추천 이미지:</p>
              <div className="grid grid-cols-3 gap-2 md:grid-cols-6">
                {suggestedImages.map((imageUrl, index) => (
                  <button
                    key={index}
                    type="button"
                    onClick={() =>
                      setFormData((prev) => ({
                        ...prev,
                        study_plans_image_url: imageUrl,
                      }))
                    }
                    className={`relative h-16 rounded-lg overflow-hidden border-2 transition-all ${
                      formData.study_plans_image_url === imageUrl
                        ? "border-[#587CF0] ring-2 ring-[#587CF0] ring-opacity-20"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                  >
                    <img
                      src={imageUrl}
                      alt={`Suggestion ${index + 1}`}
                      className="object-cover w-full h-full"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Image Preview */}
            {formData.study_plans_image_url && (
              <div className="mt-3">
                <p className="mb-2 text-sm text-gray-600">미리보기:</p>
                <div className="relative w-full h-32 overflow-hidden border border-gray-200 rounded-lg">
                  <img
                    src={formData.study_plans_image_url}
                    alt="Preview"
                    className="object-cover w-full h-full"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Action Buttons */}
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
              className="px-6 py-3 bg-[#587CF0] text-white rounded-lg hover:bg-[#4a6de8] transition-colors flex items-center gap-2"
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

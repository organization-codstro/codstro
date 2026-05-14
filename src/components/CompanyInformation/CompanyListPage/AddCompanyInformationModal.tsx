import { useState } from "react";
import { X, Loader2 } from "lucide-react";
import { toast } from "react-toastify";
import {
  AddCompanyInformationModalProps,
  AddCompanyInformationFormData,
} from "../../../types/pages/CompanyInformation/CompanyListPage/AddCompanyInformationModal";
import { RECRUITMENT_TYPES } from "../../../constants/CompanyInformation/CompanyInformation";

export const AddCompanyInformationModal = ({
  isOpen,
  onClose,
  onSuccess,
  onSubmit,
}: AddCompanyInformationModalProps) => {
  const [formData, setFormData] = useState<AddCompanyInformationFormData>({
    name: "",
    jobField: "",
    recruitmentType: "신입",
    officialLink: "",
  });
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const resetForm = () => {
    setFormData({
      name: "",
      jobField: "",
      recruitmentType: "신입",
      officialLink: "",
    });
  };

  const handleClose = () => {
    resetForm();
    onClose();
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async () => {
    if (!formData.name.trim()) {
      toast.warning("회사 이름을 입력해주세요.");
      return;
    }

    if (!formData.jobField.trim()) {
      toast.warning("지원 직무를 입력해주세요.");
      return;
    }

    if (!formData.recruitmentType) {
      toast.warning("채용 유형을 선택해주세요.");
      return;
    }

    setIsLoading(true);

    try {
      await onSubmit({
        name: formData.name.trim(),
        jobField: formData.jobField.trim(),
        recruitmentType: formData.recruitmentType,
        ...(formData.officialLink?.trim() && {
          officialLink: formData.officialLink.trim(),
        }),
      });

      toast.success("회사 정보가 생성되었습니다!");

      resetForm();
      onSuccess?.();
      handleClose();
    } catch (error) {
      console.error("오류:", error);

      toast.error(
        error instanceof Error ? error.message : "생성에 실패했습니다.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  const isValid =
    !!formData.name.trim() &&
    !!formData.jobField.trim() &&
    !!formData.recruitmentType;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* 배경 클릭 닫기 - 네이티브 button으로 분리 */}
      <button
        className="absolute inset-0 cursor-default bg-black/40"
        onClick={handleClose}
        aria-label="닫기"
        tabIndex={-1}
      />

      {/* 다이얼로그 */}
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="dialog-title"
        className="relative w-full max-w-md bg-white shadow-xl rounded-2xl"
        onKeyDown={(e) => e.key === "Escape" && handleClose()}
        tabIndex={-1}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 pb-0">
          <div>
            <h2
              id="dialog-title"
              className="text-lg font-semibold text-gray-900"
            >
              AI 회사정보 생성
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">
              회사 정보를 입력하면 AI가 분석해서 1차적인 회사 정보를 정리합니다.
            </p>
          </div>
          <button
            onClick={handleClose}
            aria-label="닫기"
            className="p-1.5 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X size={18} />
          </button>
        </div>

        <div className="flex flex-col gap-4 p-6">
          {/* 회사 이름 */}
          <div className="flex flex-col gap-1.5">
            <label htmlFor="name" className="text-xs font-medium text-gray-700">
              회사 이름 <span className="text-red-500">*</span>
            </label>
            <input
              id="name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              placeholder="ex) Google"
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#587CF0] focus:border-transparent transition-all"
            />
          </div>

          {/* 지원 직무(분야) */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="jobField"
              className="text-xs font-medium text-gray-700"
            >
              지원 직무(분야) <span className="text-red-500">*</span>
            </label>
            <input
              id="jobField"
              type="text"
              name="jobField"
              value={formData.jobField}
              onChange={handleInputChange}
              placeholder="ex) Frontend Engineer"
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#587CF0] focus:border-transparent transition-all"
            />
          </div>

          {/* 채용 유형 */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="recruitmentType"
              className="text-xs font-medium text-gray-700"
            >
              채용 유형 <span className="text-red-500">*</span>
            </label>
            <select
              id="recruitmentType"
              name="recruitmentType"
              value={formData.recruitmentType}
              onChange={handleInputChange}
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#587CF0] focus:border-transparent transition-all bg-white"
            >
              {RECRUITMENT_TYPES.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          {/* 공식 공고 링크 (선택) */}
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="officialLink"
              className="text-xs font-medium text-gray-700"
            >
              공식 공고 링크{" "}
              <span className="text-xs text-gray-400">(선택)</span>
            </label>
            <input
              id="officialLink"
              type="url"
              name="officialLink"
              value={formData.officialLink}
              onChange={handleInputChange}
              placeholder="https://example.com/jobs/123"
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-xl outline-none focus:ring-2 focus:ring-[#587CF0] focus:border-transparent transition-all"
            />
            <p className="text-xs text-gray-500">
              링크를 입력하면 AI가 자동으로 분석합니다
            </p>
          </div>

          {/* 버튼 영역 */}
          <div className="flex gap-3 pt-4">
            <button
              onClick={handleClose}
              disabled={isLoading}
              className="flex-1 px-4 py-2.5 text-sm font-medium text-gray-700 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
            >
              취소
            </button>
            <button
              onClick={handleSubmit}
              disabled={!isValid || isLoading}
              className={`flex-1 px-4 py-2.5 text-sm font-medium rounded-lg transition-colors text-white flex items-center justify-center gap-2 ${
                isValid && !isLoading
                  ? "bg-[#587CF0] hover:bg-[#4a6de8]"
                  : "bg-gray-300 cursor-not-allowed"
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  생성 중...
                </>
              ) : (
                "회사 정보 생성"
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

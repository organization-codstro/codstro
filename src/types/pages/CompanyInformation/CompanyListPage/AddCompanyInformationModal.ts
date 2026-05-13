export interface AddCompanyInformationFormData {
  name: string;
  jobField: string;
  recruitmentType: "신입" | "인턴" | "경력";
  officialLink?: string;
}

export interface AddCompanyInformationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess?: () => void;
  onSubmit: (data: AddCompanyInformationFormData) => Promise<void>;
}

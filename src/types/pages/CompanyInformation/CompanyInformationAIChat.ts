import { MATERIAL_TYPE } from "../../../constants/Concepts/concepts";

export interface CompanyInformationAIChatProps {
  isOpen: boolean;
  onClose: () => void;
  conceptName: string;
  materialId: string;
  materialType: MATERIAL_TYPE;
}

export interface ProjectBasicInfoSectionProps {
  projectName: string;
  setProjectName: (v: string) => void;
  projectTopic: string;
  setProjectTopic: (v: string) => void;
  projectDescription: string;
  setProjectDescription: (v: string) => void;
  startDate: string;
  setStartDate: (v: string) => void;
  endDate: string;
  setEndDate: (v: string) => void;
  mainColor: string;
  setMainColor: (v: string) => void;
  designStyle: string;
  setDesignStyle: (v: string) => void;
  projectEffect: string;
  setProjectEffect: (v: string) => void;
}

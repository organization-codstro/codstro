export interface Major {
  id: string;
  name: string;
  icon: any;
  description: string;
  color: string;
  detailedDescription: string;
  focus: string;
  careers: string;
  keySkills: string[];
  learningPath: string[];
  salaryRange: string;
  jobOutlook: string;
  famousCompanies: string[];
  dayInLife: string[];
}

export interface MajorQuestionOption {
  label: string;
  value: string;
  score: number;
}

export interface MajorQuestionResponse {
  id: string;
  question: string;
  options: MajorQuestionOption[];
}

export interface GetMajorResultDetailParams {
  majorName: string;
}

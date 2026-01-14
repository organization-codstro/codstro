export interface Fortune {
  id: string;
  code: number;
  name: string;
  summary: string;
  description: string;
  categoryMessage: string;
  color: string;
}

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

export interface Personality {
  id: string;
  type: string;
  name: string;
  description: string;
  detailedDescription: string;
  strengths: string[];
  weaknesses: string[];
  workStyle: string;
  idealProjects: string[];
  famousDevelopers: string[];
}

export interface Fortune {
  id: string;
  code: number;
  name: string;
  summary: string;
  description: string;
  categoryMessage: {
    daily: string;
    meeting: string;
    development: string;
  };
}

export interface Major {
  major_id: string; // uuid
  major_name: string;
  major_description: string;
  major_recommended_occupation: string;
  major_strengths: string;
  major_weaknesses: string;
  major_stress_management: string;
  major_annual_income: number;
  created_at?: string;
  updated_at?: string;
}

export interface Personality {
  id: string;
  name: string;
  code: string;
  participation: string;
  risks: string;
  thought: string;
  approach: string;
  recommendedJob: string;
  collaborativeStyle: string;
  strengths: string;
  weaknesses: string;
  stressManagement: string;
  morningGreetings: string;
  nightGreetings: string;
  createdAt: string;
}

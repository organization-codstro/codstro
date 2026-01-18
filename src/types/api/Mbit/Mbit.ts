export interface Major {
  id: string;
  name: string;
  description: string;
  annualIncome: string;
  jobOutlook: string;
  majorStrengths: string;
  majorWeaknesses: string;
  majorStrathManagement: string;
}

export interface Personality {
  id: string;
  name: string;
  code: string;
}

export interface PersonalityDetail {
  id: string;
  name: string;
  code: string;
  participation: string;
  risks: string;
  thought: string;
  approach: string;
  recommendedJob: string;
  recommendedReason: string;
  collaborativeStyle: string;
  strengths: string;
  weaknesses: string;
  strathManagement: string;
  morningGreetings: string;
  nightGreetings: string;
  createdAt: string;
}

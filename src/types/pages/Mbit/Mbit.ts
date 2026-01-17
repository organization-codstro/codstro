export interface Fortune {
  id: string;
  code: number;
  name: string;
  summary: string;
  description: string;
  categoryMessage: string;
}

export interface Major {
  id: string;
  name: string;
  description: string;
}

export interface MajorDetail{
  id: string;
  name: string;
  description: string;
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

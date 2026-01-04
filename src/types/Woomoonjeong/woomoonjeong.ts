export interface RecommendedPin {
  id: number;
  title: string;
  description: string;
  url: string;
  tags: string[];
  created_at: string;
  difficulty?: "beginner" | "intermediate" | "advanced";
  rating?: number;
  views?: number;
}

export interface TodoFormData {
  name: string;
  description: string;
  field_id: number;
  start_date: string;
  end_date: string;
  status: "pending" | "in-progress" | "completed";
}

export interface Group {
  id: number;
  type: "web" | "app" | "server" | "game" | "security" | "work" | "other";
  description: string;
  fields: Field[];
  created_at: string;
}
export interface Field {
  id: number;
  name: string;
  description: string;
  image?: string;
  pins: Pin[];
  created_at: string;
}

export interface Pin {
  id: number;
  title: string;
  description: string;
  url: string;
  tags: string[];
  created_at: string;
}

export interface Todo {
  id: number;
  field_id: number;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  status: "pending" | "in-progress" | "completed";
  created_at: string;
}

export interface RecommendedField {
  id: number;
  name: string;
  description: string;
  created_at: string;
}

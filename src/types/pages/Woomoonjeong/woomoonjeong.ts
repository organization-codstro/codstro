//필드 설정할때 표시할수 있는 그룹의 종류

export type GroupType =
  | "web"
  | "app"
  | "server"
  | "game"
  | "security"
  | "work"
  | "other";

export interface RecommendedPin {
  id: string;
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
  field_id: string;
  start_date: string;
  end_date: string;
  status: "pending" | "in-progress" | "completed";
}

export interface Group {
  id: string;
  name: "web" | "app" | "server" | "game" | "security" | "work" | "other";
  description: string;
  fields: Field[];
  created_at: string;
}
export interface Field {
  id: string;
  name: string;
  description: string;
  image?: string;
  pins: Pin[];
  created_at: string;
}

export interface Pin {
  id: string;
  title: string;
  description: string;
  url: string;
  tags: string[];
  created_at: string;
}

export interface Todo {
  id: string;
  field_id: string;
  name: string;
  description: string;
  start_date: string;
  end_date: string;
  status: "pending" | "in-progress" | "completed";
  created_at: string;
}

export interface RecommendedField {
  id: string;
  name: string;
  description: string;
  created_at: string;
}

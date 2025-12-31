export interface RecommendedPin {
  id: string;
  title: string;
  description: string;
  url: string;
  tags: string[];
  field_type: "web" | "app" | "server" | "game" | "security" | "work" | "other";
  created_at: string;
  difficulty?: "beginner" | "intermediate" | "advanced";
  rating?: number;
  views?: number;
}

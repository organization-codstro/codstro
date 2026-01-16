export interface RecommendedPin {
  pin_id: string;
  pin_title: string;
  pin_description: string;
  pin_url: string;
  pin_created_at: string;
  pin_difficulty?: "beginner" | "intermediate" | "advanced";
  pin_rating?: number;
  pin_views?: number;
}

export interface RecommendedField {
  field_id: string;
  field_name: string;
  field_description: string;
  field_created_at: string;
}

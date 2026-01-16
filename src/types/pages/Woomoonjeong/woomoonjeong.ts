import {
  GROUP_TYPE,
  TODO_STATUS_TYPE,
} from "../../../constants/Woomoonjeong/Woomoonjeong";

export interface RecommendedPin {
  pin_id: string;
  pin_title: string;
  pin_description: string;
  pin_url: string;
  created_at: string;
  pin_label: string[];
}

export interface TodoFormData {
  todo_name: string;
  todo_description: string;
  group_id: string;
  todo_start_date: string;
  todo_end_date: string;
  todo_status: TODO_STATUS_TYPE;
}

export interface Group {
  id: string;
  name: GROUP_TYPE;
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
  todo_id: string;
  field_id: string;
  todo_name: string;
  todo_description: string;
  todo_start_date: string;
  todo_end_date: string;
  todo_status: "waiting" | "in-progress" | "done";
  todo_created_date: string;
}

export interface RecommendedField {
  field_id: string;
  field_name: string;
  field_description: string;
  field_created_at: string;
}

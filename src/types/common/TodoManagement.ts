import {
  GROUP_NAME_TYPE,
  TODO_STATUS_TYPE,
} from "../../constants/TodoManagement/TodoManagement";

export interface RecommendedPin {
  pin_id: string;
  pin_title: string;
  pin_description: string;
  pin_url: string;
  pin_rating?: number;
  pin_views?: number;
  pin_label: string[];
  created_at: string;
}

export interface RecommendedField {
  field_id: string;
  field_name: string;
  field_description: string;
  create_at: string;
}

export interface TodoFormData {
  todo_name: string;
  todo_content: string;
  todo_description: string;
  group_id: string;
  todo_start_date: string;
  todo_end_date: string;
  todo_status: TODO_STATUS_TYPE;
}

export interface Group {
  group_id: string;
  group_name: GROUP_NAME_TYPE;
  group_description: string;
  fields: Field[];
  created_at: string;
}
export interface Field {
  field_id: string;
  field_name: string;
  field_description: string;
  image?: string;
  pins: Pin[];
  created_at: string;
  updated_at: string;
}

export interface Pin {
  pin_id: string;
  pin_title: string;
  pin_description: string;
  pin_url: string;
  pin_label: string[];
  created_at: string;
}

export interface Todo {
  todo_id: string;
  group_id: string;
  todo_name: string;
  todo_description: string;
  todo_start_date: string;
  todo_end_date: string;
  todo_status: TODO_STATUS_TYPE;
  todo_created_date: string;
}

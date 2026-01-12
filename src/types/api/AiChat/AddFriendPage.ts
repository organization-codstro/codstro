import { AiPersonas } from "../../db/supabase/table";

export interface GetMyFriendsParams {
  userId: number;
}

export type GetMyFriendsResponse = Array<{
  user_ai_setting_id: number;
  ai_personas: AiPersonas;
}>;

export interface SearchPersonasParams {
  personality?: string;
  gender?: string;
  topics?: string;
  age?: string;
}

export interface AddFriendParams {
  userId: number;
  personaId: number;
  callMeName?: string;
  emotion?: string;
  aiSelfAwareness?: boolean;
  serviceIntegration?: boolean;
}

export type AddFriendResponse = void;

export interface RemoveFriendParams {
  userId: number;
  personaId: number;
}

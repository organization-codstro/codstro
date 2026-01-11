import { AiPersonas } from "../../db/supabase/table";

export interface AddFriendParams {
  userId: number;
  personaId: number;
  callMeName?: string;
  emotion?: string;
  aiSelfAwareness?: boolean;
  serviceIntegration?: boolean;
}

export type GetMyFriendsDataType = Array<{
  user_ai_setting_id: number;
  ai_personas: AiPersonas;
}>;

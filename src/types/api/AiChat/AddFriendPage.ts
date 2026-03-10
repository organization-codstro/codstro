import { AiPersonas } from "../../db/supabase/table";

export interface GetMyFriendsParams {
  userId: string;
}

export type GetMyFriendsResponse = Array<{
  user_ai_setting_id: string;
  ai_personas: AiPersonas;
}>;

export interface SearchPersonasParams {
  personality?: string;
  gender?: string;
  topics?: string;
  age?: string;
}

// export interface AddFriendParams {
//   userId: string;
//   personaId: string;
//   callMeName?: string;
//   emotion?: string;
//   aiSelfAwareness?: boolean;
//   serviceIntegration?: boolean;
// }

//export type AddFriendResponse = void;

export interface RemoveFriendParams {
  userId: string;
  personaId: string;
}

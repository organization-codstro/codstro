import { AIPersona, AiUserSettings } from "../../common/aiChat";

export interface GetPersonaDetailParams {
  personaId: string;
  userId: string;
}

export interface AddFriendParams {
  aiPersonaId: string;
  userId: string;
  aiUserSettings: AiUserSettings;
}

export interface AddFriendResponse {
  aiPersona: AIPersona;
  isFriend: boolean;
  userAiSettingId: string;
}

export interface DeleteFriendParams {
  userAiSettingId: string;
}

// export interface StartChattingParams {
//   userId: string;
//   personaId: string;
// }

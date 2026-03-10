import { AiUserSettings } from "../../common/aiChat";

export interface GetPersonaDetailParams {
  personaId: string;
}

export interface AddFriendParams {
  aiPersonaId: string;
  userId: string;
  aiUserSettings: AiUserSettings;
}

// export interface StartChattingParams {
//   userId: string;
//   personaId: string;
// }

import { CLONE_CODING_STATE_TYPE } from "../../../../constants/Woomoonro/woomoonro";

/**
 * [유저 프로젝트 진행 상태 타입]
 */
export interface UserProjectStatus {
  status: CLONE_CODING_STATE_TYPE;
  is_bookmarked: boolean;
}

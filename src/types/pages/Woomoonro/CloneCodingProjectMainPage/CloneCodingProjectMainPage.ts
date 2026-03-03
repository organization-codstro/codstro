import {
  CloneCodingProject,
  UserCloneCodingProject,
} from "../../../common/woomoonro";

/**
 * [메인 페이지 데이터 인터페이스]
 * API 응답 데이터를 UI에서 사용하는 도메인 모델로 변환하기 위한 구조
 */
export interface MainProjectItem {
  project: CloneCodingProject;
  userProject?: UserCloneCodingProject;
}

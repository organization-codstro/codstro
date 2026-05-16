import {
  CloneCodingProject,
  UserCloneCodingProject,
} from "../../../common/CloneCodingProject";

/**
 * [아카이브 데이터 인터페이스]
 * API 응답 데이터와 UI 구조를 매핑하기 위한 타입
 */
export interface ArchivedProjectItem {
  userProject: UserCloneCodingProject;
  project: CloneCodingProject;
}

/**
 * [아카이브 통계 인터페이스]
 */
export interface ArchiveStats {
  total: number;
  waiting: number;
  "in progress": number;
  done: number;
}

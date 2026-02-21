import { CompanyMatch } from "../../common/companyInformation";

/** 매칭 상세 조회 Params */
export interface GetMatchingHistoryDetailParams {
  matchingId: string;
}

/** 매칭 상세 조회 Response */
export type GetMatchingHistoryDetailResponse = CompanyMatch;

/** 매칭 기록 이름 수정 Params */
export interface UpdateMatchingHistoryNameParams {
  matchingId: string;
  newName: string;
}

/** 매칭 기록 이름 수정 Response */
export type UpdateMatchingHistoryNameResponse = CompanyMatch[];

/** 매칭 기록 삭제 Params */
export interface DeleteMatchingHistoryParams {
  matchingId: string;
}

/** 매칭 기록 삭제 Response */
export type DeleteMatchingHistoryResponse = boolean;

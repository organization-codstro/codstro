import { CompanyMatch } from "../../common/companyInformation";

/** 유저 매칭 리스트 조회 Params */
export interface GetUserMatchingListParams {
  userId: string;
}

/** 유저 매칭 리스트 조회 Response */
export type GetUserMatchingListResponse = CompanyMatch[];

/** 매칭 기록 삭제 Params */
export interface DeleteMatchingRecordParams {
  matchingId: string;
}

/** 매칭 기록 삭제 Response */
export type DeleteMatchingRecordResponse = boolean;

/** 평균 매칭 점수 조회 Params */
export interface GetAverageMatchRateParams {
  userId: string;
}

/** 평균 매칭 점수 조회 Response */
export type GetAverageMatchRateResponse = string;

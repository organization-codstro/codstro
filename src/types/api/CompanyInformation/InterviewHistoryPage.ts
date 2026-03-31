import { CompanyInterview } from "../../common/CompanyInformation";

/** 특정 유저 면접 기록 리스트 조회 Params */
export interface GetUserInterviewListParams {
  userId: string;
}

/** 특정 유저 면접 기록 리스트 조회 Response */
export type GetUserInterviewListResponse = CompanyInterview[];

/** 면접 기록 삭제 Params */
export interface DeleteInterviewRecordParams {
  id: string;
}

/** 면접 기록 삭제 Response */
export type DeleteInterviewRecordResponse = boolean;

/** 면접 기록 개수 조회 Params */
export interface GetInterviewCountParams {
  userId: string;
}

/** 면접 기록 개수 조회 Response */
export type GetInterviewCountResponse = number;

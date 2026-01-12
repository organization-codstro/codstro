import { supabase } from "../../db/supabase/supabase";
import {
  GetCompanyDetailParams,
  GetCompanyDetailResponse,
  CheckIsBookmarkedParams,
  CheckIsBookmarkedResponse,
  AddBookmarkParams,
  AddBookmarkResponse,
  DeleteBookmarkParams,
  DeleteBookmarkResponse,
  ToggleBookmarkStatusParams,
  ToggleBookmarkStatusResponse,
} from "../../types/api/CompanyInformation/CompanyDetailPage";

/**
 * [함수 역할]: 특정 회사의 상세 정보(ID, 이름, 산업, 설명, 웹사이트, 가치관 등)를 조회합니다.
 * [참조 테이블]: companys
 */
export const getCompanyDetail = async (
  params: GetCompanyDetailParams
): Promise<GetCompanyDetailResponse> => {
  try {
    const { data, error } = await supabase
      .from("companys")
      .select("*")
      .eq("company_id", params.companyId)
      .single();

    if (error) throw error;
    return data;
  } catch (error) {
    console.error("Error fetching company detail:", error);
    throw error;
  }
};

/**
 * [함수 역할]: 특정 유저가 해당 회사를 북마크(관심 등록)했는지 여부를 확인합니다.
 * [참조 테이블]: user_favorite_companies
 */
export const checkIsBookmarked = async (
  params: CheckIsBookmarkedParams
): Promise<CheckIsBookmarkedResponse> => {
  try {
    const { data, error } = await supabase
      .from("user_favorite_companies")
      .select("user_favorite_companie_id")
      .eq("user_id", params.userId)
      .eq("companie_id", params.companyId)
      .maybeSingle();

    if (error) throw error;
    return !!data;
  } catch (error) {
    console.error("Error checking bookmark status:", error);
    return false;
  }
};

/**
 * [함수 역할]: 회사를 관심 목록에 추가합니다.
 * [참조 테이블]: user_favorite_companies
 */
export const addBookmark = async (
  params: AddBookmarkParams
): Promise<AddBookmarkResponse> => {
  try {
    const { error } = await supabase.from("user_favorite_companies").insert([
      {
        user_id: params.userId,
        companie_id: params.companyId,
        user_favorite_companie_created_date: new Date().toISOString(),
      },
    ]);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Error adding bookmark:", error);
    throw error;
  }
};

/**
 * [함수 역할]: 회사를 관심 목록에서 제거합니다.
 * [참조 테이블]: user_favorite_companies
 */
export const deleteBookmark = async (
  params: DeleteBookmarkParams
): Promise<DeleteBookmarkResponse> => {
  try {
    const { error } = await supabase
      .from("user_favorite_companies")
      .delete()
      .eq("user_id", params.userId)
      .eq("companie_id", params.companyId);

    if (error) throw error;
    return true;
  } catch (error) {
    console.error("Error deleting bookmark:", error);
    throw error;
  }
};

/**
 * [함수 역할]: 유저의 현재 북마크 상태에 따라 추가 또는 삭제를 수행합니다. (Toggle)
 * [비고]: UI 내 toggleBookmark 핸들러에서 호출하기 용이하도록 구성
 */
export const toggleBookmarkStatus = async (
  params: ToggleBookmarkStatusParams
): Promise<ToggleBookmarkStatusResponse> => {
  if (params.currentlyBookmarked) {
    return await deleteBookmark({
      userId: params.userId,
      companyId: params.companyId,
    });
  } else {
    return await addBookmark({
      userId: params.userId,
      companyId: params.companyId,
    });
  }
};

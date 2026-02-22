import { supabase } from "../../db/supabase/supabase";
import {
  GetRecommendedPinsParams,
  GetRecommendedFieldsParams,
  AddRecommendedPinToMyFieldParams,
  AddRecommendedFieldToMyGroupParams,
  TrackLinkClickParams,
} from "../../types/api/Woomoonjeong/RecommendedDocumentsMainPage";

/**
 * [추천 시스템 서비스]
 * 시스템에서 추천하는 문서(Pins)와 분야(Fields)를 조회하고,
 * 이를 사용자의 개인 그룹으로 복사하는 기능을 담당합니다.
 */
export const RecommendedDocumentsMainPageService = {
  /**
   * [추천 핀(문서) 목록 조회]
   * 모든 추천용 핀들을 가져옵니다.a
   * 필요 시 pins 테이블에 'is_recommended' 컬럼을 추가하거나 특정 field_id 범위를 지정하여 필터링합니다.
   * 참조 테이블: pins
   */
  async getRecommendedPins(params?: GetRecommendedPinsParams) {
    try {
      let query = supabase
        .from("pins")
        .select("*")
        // 추천 핀만 조회
        .eq("pin_is_recommendation", true)
        // 최신순 정렬
        .order("created_at", { ascending: false })
        // 우선 상위 10개만 조회
        .limit(10);
      // TODO: 추후 페이지네이션 적용 예정 (range() 또는 cursor 기반 적용 가능)

      if (params?.searchQuery) {
        query = query.or(
          `pin_title.ilike.%${params.searchQuery}%,pin_description.ilike.%${params.searchQuery}%`,
        );
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    } catch (error) {
      console.error(
        "[RecommendedDocumentsMainPageService - getRecommendedPins]:",
        error,
      );
      throw error;
    }
  },

  /**
   * [추천 분야(Field) 목록 조회]
   * field_is_recommendation 가 true인 분야들만 필터링하여 가져옵니다.
   * 참조 테이블: fields
   */
  async getRecommendedFields(params?: GetRecommendedFieldsParams) {
    try {
      let query = supabase
        .from("fields")
        .select("*")
        .eq("field_is_recommendation", true);

      if (params?.searchQuery) {
        query = query.or(
          `field_name.ilike.%${params.searchQuery}%, field_description.ilike.%${params.searchQuery}%`,
        );
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    } catch (error) {
      console.error(
        "[RecommendedDocumentsMainPageService - getRecommendedFields]:",
        error,
      );
      throw error;
    }
  },

  /**
   * [추천 핀을 내 보관함에 추가]
   * 추천 리소스를 사용자가 선택한 내 필드(field_id)에 복사하여 저장합니다.
   * 참조 테이블: pins
   */
  async addRecommendedPinToMyField(payload: AddRecommendedPinToMyFieldParams) {
    try {
      const { data, error } = await supabase
        .from("pins")
        .insert([
          {
            ...payload,
            pin_created_date: new Date().toISOString().split("T")[0],
          },
        ])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error(
        "[RecommendedDocumentsMainPageService - addRecommendedPinToMyField]:",
        error,
      );
      throw error;
    }
  },

  /**
   * [추천 분야를 내 그룹에 할당]
   * 추천되는 분야(섹션) 자체를 사용자의 그룹(group_id)으로 복사합니다.
   * 참조 테이블: fields
   *
   * 1. 사용자가 선택한 그룹 이름과 field id를 받음,
   * 2. 사용자의 로그인 정보를 확인 -> 그 정보를 기반으로 유저의 그룹 가져오기
   * 3. 가져온 그룹 id를 가져와서 field id의 field를 복사하여 저장
   * +. field_created_date는 yyyy-mm-dd형식으로 저장 되도록
   */
  async addRecommendedFieldToMyGroup(
    payload: AddRecommendedFieldToMyGroupParams,
  ) {
    try {
      const { groupName, selectFieldId } = payload;

      /**
       * 1️⃣ 로그인 유저 확인
       */
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError) throw userError;
      if (!user) throw new Error("로그인 정보가 없습니다.");

      /**
       * 2️⃣ 유저의 그룹 조회 (선택한 groupName 기반)
       */
      const { data: myGroup, error: groupError } = await supabase
        .from("groups")
        .select("group_id")
        .eq("user_id", user.id)
        .eq("group_name", groupName)
        .single();

      if (groupError) throw groupError;
      if (!myGroup) throw new Error("해당 그룹을 찾을 수 없습니다.");

      /**
       * 3️⃣ 추천 field 조회
       */
      const { data: recommendedField, error: fieldError } = await supabase
        .from("fields")
        .select("*")
        .eq("field_id", selectFieldId)
        .single();

      if (fieldError) throw fieldError;
      if (!recommendedField) throw new Error("추천 필드를 찾을 수 없습니다.");

      /**
       * 4️⃣ yyyy-mm-dd 형식 날짜 생성
       */
      const today = new Date().toISOString().split("T")[0];

      /**
       * 5️⃣ 필드 복사하여 insert
       */
      const { data, error } = await supabase
        .from("fields")
        .insert([
          {
            field_name: recommendedField.field_name,
            group_id: myGroup.group_id,
            field_is_recommendation: false,
            field_created_date: today,
          },
        ])
        .select()
        .single();

      if (error) throw error;

      return data;
    } catch (error) {
      console.error(
        "[RecommendedDocumentsMainPageService - addRecommendedFieldToMyGroup]:",
        error,
      );
      throw error;
    }
  },

  /**
   * [조회수 및 통계 업데이트]
   * 추천 문서 클릭 시 link 테이블의 카운트를 올립니다.
   * 참조 테이블: link
   */
  async trackLinkClick(params: TrackLinkClickParams) {
    try {
      // 이전에 작성한 link upsert 로직 재사용
      const { data: existing } = await supabase
        .from("link")
        .select("*")
        .eq("link_count_url", params.url)
        .single();

      if (existing) {
        await supabase
          .from("link")
          .update({ link_count_number: existing.link_count_number + 1 })
          .eq("link_count_id", existing.link_count_id);
      } else {
        await supabase
          .from("link")
          .insert([{ link_count_url: params.url, link_count_number: 1 }]);
      }
    } catch (error) {
      console.error(
        "[RecommendedDocumentsMainPageService - trackLinkClick]:",
        error,
      );
    }
  },
};

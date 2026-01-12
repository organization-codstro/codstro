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
   * 모든 추천용 핀들을 가져옵니다.
   * 필요 시 pins 테이블에 'is_recommended' 컬럼을 추가하거나 특정 field_id 범위를 지정하여 필터링합니다.
   * 참조 테이블: pins
   */
  async getRecommendedPins(params?: GetRecommendedPinsParams) {
    try {
      let query = supabase
        .from("pins")
        .select("*")
        // 예시 데이터의 difficulty, rating 등을 처리하려면 해당 컬럼이 DB에 존재해야 함
        .order("pin_created_date", { ascending: false });

      if (params?.searchQuery) {
        query = query.or(
          `pin_title.ilike.%${params.searchQuery}%, pin_description.ilike.%${params.searchQuery}%`
        );
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    } catch (error) {
      console.error("[RecommendedDocumentsMainPageService - getRecommendedPins]:", error);
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
          `field_name.ilike.%${params.searchQuery}%, field_description.ilike.%${params.searchQuery}%`
        );
      }

      const { data, error } = await query;
      if (error) throw error;
      return data;
    } catch (error) {
      console.error("[RecommendedDocumentsMainPageService - getRecommendedFields]:", error);
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
        error
      );
      throw error;
    }
  },

  /**
   * [추천 분야를 내 그룹에 할당]
   * 추천되는 분야(섹션) 자체를 사용자의 그룹(group_id)으로 복사합니다.
   * 참조 테이블: fields
   */
  async addRecommendedFieldToMyGroup(
    payload: AddRecommendedFieldToMyGroupParams
  ) {
    try {
      const { data, error } = await supabase
        .from("fields")
        .insert([
          {
            ...payload,
            field_is_recommendation: false, // 내 그룹으로 복사될 때는 일반 필드로 설정
            field_created_date: new Date().toISOString(),
          },
        ])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error(
        "[RecommendedDocumentsMainPageService - addRecommendedFieldToMyGroup]:",
        error
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
      console.error("[RecommendedDocumentsMainPageService - trackLinkClick]:", error);
    }
  },
};

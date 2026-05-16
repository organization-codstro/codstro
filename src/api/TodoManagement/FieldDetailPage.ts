import { supabase } from "../../db/supabase/supabase";
import {
  GetFieldDetailWithPinsParams,
  AssignFieldToGroupParams,
  GetPinByIdParams,
} from "../../types/api/TodoManagement/FieldDetailPage";

/**
 * [분야 상세 및 핀 관리 서비스]
 * 특정 분야(Field)의 상세 정보와 해당 분야에 속한 모든 핀(Pin) 데이터를 관리합니다.
 */
export const FieldDetailService = {
  /**
   * [분야 상세 정보 및 관련 데이터 조회]
   * 특정 fieldId를 가진 분야의 정보, 해당 분야가 속한 그룹(Group) 정보,
   * 그리고 그 분야에 포함된 모든 핀(Pins) 목록을 한 번에 조회합니다.
   * 참조 테이블: fields, groups, pins
   */
  async getFieldDetailWithPins(params: GetFieldDetailWithPinsParams) {
    try {
      const { data, error } = await supabase
        .from("fields")
        .select(
          `
          *,
          groups (
            group_id,
            group_name,
            group_description
          ),
          pins (
            *
          )
        `,
        )
        .eq("field_id", params.fieldId)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("[FieldDetailService - getFieldDetailWithPins]:", error);
      throw error;
    }
  },

  /**
   * [추천 분야를 내 그룹으로 복사/할당]
   * 추천 페이지에서 본 분야를 자신의 특정 그룹으로 복사할 때 사용합니다.
   * (기존 Mock의 onAdd 기능 대응)
   * 참조 테이블: fields
   */
  async assignFieldToGroup(payload: AssignFieldToGroupParams) {
    try {
      const { data, error } = await supabase
        .from("fields")
        .insert([
          {
            field_name: payload.field_name,
            field_description: payload.field_description,
            group_id: payload.group_id,
            field_is_recommendation: payload.field_is_recommendation,
            field_created_date: new Date().toISOString(),
          },
        ])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("[FieldDetailService - assignFieldToGroup]:", error);
      throw error;
    }
  },

  /**
   * [핀(문서) 상세 조회]
   * 특정 핀의 정보를 단일 조회합니다.
   * 참조 테이블: pins
   */
  async getPinById(params: GetPinByIdParams) {
    try {
      const { data, error } = await supabase
        .from("pins")
        .select("*")
        .eq("pin_id", params.pinId)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("[FieldDetailService - getPinById]:", error);
      throw error;
    }
  },
};

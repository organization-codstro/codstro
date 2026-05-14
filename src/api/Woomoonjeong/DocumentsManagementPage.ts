import { supabase } from "../../db/supabase/supabase";
import {
  CreateGroupParams,
  CreateFieldParams,
  UpdateFieldNameParams,
  CreatePinParams,
  DeleteItemParams,
  SearchDocumentsParams,
} from "../../types/api/Woomoonjeong/DocumentsManagementPage";

/**
 * [문서 관리 서비스]
 * 그룹(Group) -> 분야(Field) -> 문서(Pin)의 계층 구조를 관리합니다.
 * Supabase의 Foreign Key 설정을 기반으로 조인 쿼리를 수행합니다.
 */
export const DocumentsManagementService = {
  /**
   * [전체 데이터 로드]
   * 모든 그룹과 그에 속한 분야, 핀들을 계층적으로 가져옵니다.
   * 참조 테이블: groups, fields, pins
   */
  async getAllGroupsWithDetails() {
    try {
      const { data, error } = await supabase
        .from("groups")
        .select(
          `
          *,
          fields (
            *,
            pins (*)
          )
        `,
        )
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("[Service Error - getAllGroupsWithDetails]:", error);
      throw error;
    }
  },

  /**
   * [그룹 생성]
   * 새로운 그룹(프로젝트/카테고리)을 생성합니다.
   * 참조 테이블: groups
   */
  async createGroup(payload: CreateGroupParams) {
    try {
      const { data, error } = await supabase
        .from("groups")
        .insert([
          {
            ...payload,
            group_created_date: new Date().toISOString().split("T")[0],
          },
        ])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("[Service Error - createGroup]:", error);
      throw error;
    }
  },

  /**
   * [분야(Field) 생성]
   * 특정 그룹 내에 새로운 분야(섹션)를 생성합니다.
   * 참조 테이블: fields
   */
  async createField(payload: CreateFieldParams) {
    try {
      const { data, error } = await supabase
        .from("fields")
        .insert([
          {
            ...payload,
            created_at: new Date().toISOString(),
          },
        ])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("[Service Error - createField]:", error);
      throw error;
    }
  },

  /**
   * [분야 이름 수정]
   * 필드의 이름을 업데이트합니다.
   * 참조 테이블: fields
   */
  async updateFieldName(params: UpdateFieldNameParams) {
    try {
      const { error } = await supabase
        .from("fields")
        .update({ field_name: params.newName })
        .eq("field_id", params.fieldId);

      if (error) throw error;
    } catch (error) {
      console.error("[Service Error - updateFieldName]:", error);
      throw error;
    }
  },

  /**
   * [핀(Pin/문서) 생성 및 링크 카운트 처리]
   * 새로운 문서를 생성합니다
   * 참조 테이블: pins, link
   */
  async createPin(payload: CreatePinParams) {
    try {
      // 1. 핀 생성
      const { data, error } = await supabase
        .from("pins")
        .insert([
          {
            ...payload,
            created_at: new Date().toISOString(),
          },
        ])
        .select()
        .single();

      if (error) throw error;

      // 2. 링크 통계 업데이트
      //await this.upsertLinkCount({ url: payload.pin_url });

      return data;
    } catch (error) {
      console.error("[Service Error - createPin]:", error);
      throw error;
    }
  },

  /**
   * [삭제 통합 함수]
   * 타입에 따라 그룹, 분야, 핀을 삭제합니다.
   * 참조 테이블: groups, fields, pins
   */
  async deleteItem(params: DeleteItemParams) {
    try {
      let tableName: string;
      if (params.type === "group") {
        tableName = "groups";
      } else if (params.type === "field") {
        tableName = "fields";
      } else {
        tableName = "pins";
      }

      const idColumn = `${params.type}_id`;

      const { error } = await supabase
        .from(tableName)
        .delete()
        .eq(idColumn, params.id);

      if (error) throw error;
    } catch (error) {
      console.error(`[Service Error - delete ${params.type}]:`, error);
      throw error;
    }
  },

  /**
   * [통합 검색]
   * 그룹명, 분야명, 핀 제목 전체에서 검색어를 필터링합니다.
   * (클라이언트 사이드 필터링 대신 서버 쿼리 활용 시)
   */
  async searchDocuments(params: SearchDocumentsParams) {
    try {
      const { data, error } = await supabase
        .from("groups")
        .select(
          `
          *,
          fields!inner (
            *,
            pins!inner (*)
          )
        `,
        )
        .or(
          `group_description.ilike.%${params.query}%, fields.field_name.ilike.%${params.query}%, fields.pins.pin_title.ilike.%${params.query}%`,
        );

      if (error) throw error;
      return data;
    } catch (error) {
      console.error("[Service Error - searchDocuments]:", error);
      throw error;
    }
  },
};

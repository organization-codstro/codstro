import { supabase } from "../../db/supabase/supabase";
import {
  ProjectBasicInfo,
  SaveOrUpdateBasicInfoParams,
  GetPlanningBasicInfoParams,
} from "../../types/api/ProjectPlanning/ProjectBasicInfoInputPage";

/**
 * [ProjectBasicInfoInputService]
 * 프로젝트 기획 1단계: 초기 레코드 생성 및 기초 정보 저장을 담당합니다.
 */
export const ProjectBasicInfoInputService = {
  /**
   * [기초 정보 저장 및 프로젝트 초기화]
   * 프로젝트가 새로 생성되는 경우 insert, 수정 중인 경우 update를 수행합니다.
   * @table project_plannings
   */
  async saveOrUpdateBasicInfo(params: SaveOrUpdateBasicInfoParams) {
    try {
      const payload = {
        user_id: params.userId,
        project_topic: params.info.project_topic,
        project_description: params.info.desired_features, // '하고 싶은 기능'을 설명 필드에 매핑
        project_stacks: params.info.concepts_to_cover, // '다루고 싶은 개념'을 스택 필드에 매핑
        // 기타 정보(other_info)는 로그 테이블이나 별도 컬럼이 필요할 수 있으나,
        // 현재 스키마 기준으로는 주요 필드에 통합하거나 비고란 활용
        project_created_date: new Date().toISOString().split("T")[0],
      };

      if (params.projectId) {
        // 1. 기존 프로젝트 수정 모드
        const { data, error } = await supabase
          .from("project_plannings")
          .update(payload)
          .eq("project_id", params.projectId)
          .select()
          .single();

        if (error) throw error;
        return data;
      } else {
        // 2. 신규 프로젝트 생성 모드
        const { data, error } = await supabase
          .from("project_plannings")
          .insert([payload])
          .select()
          .single();

        if (error) throw error;
        return data;
      }
    } catch (error) {
      console.error("[saveOrUpdateBasicInfo Error]:", error);
      throw error;
    }
  },

  /**
   * [기존 임시 저장 데이터 로드]
   * 페이지 진입 시 기존에 입력했던 기초 정보가 있다면 가져옵니다.
   */
  async getPlanningBasicInfo(params: GetPlanningBasicInfoParams) {
    try {
      const { data, error } = await supabase
        .from("project_plannings")
        .select("*")
        .eq("project_id", params.projectId)
        .single();

      if (error) throw error;

      // UI 구조에 맞게 변환하여 반환
      return {
        project_topic: data.project_topic || "",
        desired_features: data.project_description || "",
        concepts_to_cover: data.project_stacks || "",
        other_info: "",
      } as ProjectBasicInfo;
    } catch (error) {
      console.error("[getPlanningBasicInfo Error]:", error);
      throw error;
    }
  },
};

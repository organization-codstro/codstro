import { supabase } from "../../db/supabase/supabase";
import {
  SaveOrUpdateBasicInfoParams,
  GetPlanningBasicInfoParams,
} from "../../types/api/ProjectPlanning/ProjectBasicInfoInputPage";
import { ProjectBasicInfo } from "../../types/common/ProjectPlanning";

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
        project_name: params.info.project_name,
        project_topic: params.info.project_topic,
        project_description: params.info.desired_features,
        project_stacks: params.info.concepts_to_cover,
        created_at: new Date().toISOString().split("T")[0],
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

        // 3. 첫 질문 생성 Edge Function 호출 (신규 생성 시에만)
        const { error: fnError } = await supabase.functions.invoke(
          "project_planning-generating_first_question",
          { body: { project_id: data.project_id } },
        );

        if (fnError) throw fnError;

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
        project_name: data.project_name,
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

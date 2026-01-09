import { supabase } from "../../db/supabase/supabase";

export interface RelatedItem {
  id: string;
  name: string;
  type: "concept" | "tool" | "library" | "service";
}

export interface ThirdPartyDetail {
  id: number;
  name: string;
  category: string[];
  tags: string[]; // category 배열을 tags로 매핑
  officialSite: string | null;
  description: string;
  content: string;
  isUnderstood: boolean;
  relatedConcepts: RelatedItem[];
}

/**
 * [ThirdPartyDetailService]
 * 서드파티 서비스(Firebase, Supabase 등) 상세 정보 조회 및 사용자 인터랙션을 담당합니다.
 * 참조 테이블: third_party_services_description_materials, user_concepts
 */
export const ThirdPartyDetailService = {
  /**
   * [조회] 특정 서드파티 서비스의 상세 데이터와 현재 사용자의 학습 상태를 가져옵니다.
   */
  async getServiceDetail(
    serviceId: string,
    userId: number
  ): Promise<ThirdPartyDetail> {
    // 1. 서비스 상세 데이터 조회 (스키마 컬럼 매핑)
    const { data: serviceData, error: serviceError } = await supabase
      .from("third_party_services_description_materials")
      .select(
        `
        id:third_party_services_description_material_id,
        name:third_party_services_description_material_name,
        description:third_party_services_description_material_description,
        content:third_party_services_description_material_content,
        category:third_party_services_description_material_category,
        officialSite:third_party_services_description_material_document_url
      `
      )
      .eq("third_party_services_description_material_id", serviceId)
      .single();

    if (serviceError) throw new Error(serviceError.message);

    // 2. 사용자의 '이해함' 상태 조회 (user_concepts 테이블)
    const { data: userStatus } = await supabase
      .from("user_concepts")
      .select("user_concept_id")
      .eq("user_id", userId)
      .eq("third_party_services_description_material_id", serviceId)
      .single();

    // 3. 연관 아이템 조회 (가정: 매핑 테이블 또는 content 내 키워드 기반)
    // 현재는 빈 배열로 반환 로직 구성
    const relatedItems: any[] = [];

    return {
      ...serviceData,
      tags: serviceData.category || [],
      isUnderstood: !!userStatus,
      relatedConcepts: relatedItems,
    };
  },

  /**
   * [업데이트] 서비스 '이해함' 상태를 토글합니다.
   * 참조 테이블: user_concepts
   */
  async toggleServiceUnderstood(
    userId: number,
    serviceId: string,
    currentStatus: boolean
  ) {
    if (currentStatus) {
      // 이해함 취소
      const { error } = await supabase
        .from("user_concepts")
        .delete()
        .eq("user_id", userId)
        .eq("third_party_services_description_material_id", serviceId);

      if (error) throw error;
      return false;
    } else {
      // 이해함 추가
      const { error } = await supabase.from("user_concepts").insert({
        user_id: userId,
        third_party_services_description_material_id: parseInt(serviceId),
        user_concept_is_starred: false,
        // 다른 FK들은 기본값(1) 처리 (스키마 대응)
        concept_description_material_id: 1,
        tool_description_material_id: 1,
        librarie_description_material_id: 1,
        package_manager_description__materials_id: 1,
      });

      if (error) throw error;
      return true;
    }
  },

  /**
   * [AI 서비스] Gemini API를 사용하여 해당 서비스 도입 시의 장단점이나 비용 구조 등을 질문합니다.
   */
  async askServiceAI(serviceName: string, question: string) {
    try {
      const response = await fetch("/api/gemini/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `서드파티 서비스 [${serviceName}]에 대한 전문적인 질문입니다: ${question}`,
        }),
      });
      const data = await response.json();
      return data.answer;
    } catch (error) {
      console.error("Gemini Service Error:", error);
      throw error;
    }
  },

  /**
   * [Todo 추가] 서비스 연동 실습 등 학습 과제를 개인 노트에 등록합니다.
   */
  async addServiceTodo(userId: number, serviceName: string, type: string) {
    const { error } = await supabase.from("notes").insert({
      user_id: userId,
      note_title: `[실습] ${serviceName} 연동하기 (${type})`,
      note_description: `${serviceName} 서비스를 활용한 프로젝트 연동 및 ${type} 실습입니다.`,
      note_labels: ["Third-party", type],
      created_date: new Date().toISOString().split("T")[0],
    });

    if (error) throw error;
    return true;
  },
};

import { supabase } from "../../db/supabase/supabase";
import { ConceptDetailResponse } from "../../types/api/Concepts/BasicConceptDetailPage";

/**
 * [ConceptDetailService]
 * 개념 상세 페이지의 데이터 로딩, 상태 변경, AI 연동을 담당합니다.
 */
export const ConceptDetailService = {
  /**
   * [조회] 특정 개념의 상세 정보와 학습 상태를 가져옵니다.
   * 참조 테이블: concept_description_materials, user_concepts
   */
  async getConceptDetail(
    conceptId: string,
    userId: string
  ): Promise<ConceptDetailResponse> {
    // 1. 개념 본문 데이터 조회
    const { data: material, error: materialError } = await supabase
      .from("concept_description_materials")
      .select(
        `
        id:concept_description_material_id,
        name:concept_description_material_title,
        description:concept_description_material_description,
        content:concept_description_material_content,
        category:concept_description_material_category,
        tags:concept_description_material_category
      `
      )
      .eq("concept_description_material_id", conceptId)
      .single();

    if (materialError) throw new Error(materialError.message);

    // 2. 유저의 학습 완료(이해함) 상태 조회
    const { data: userStatus } = await supabase
      .from("user_concepts")
      .select("user_concept_id")
      .eq("user_id", userId)
      .eq("concept_description_material_id", conceptId)
      .single();

    // 3. 연관 개념 데이터 조회 (가정: note_concept 테이블이나 별도 매핑 테이블 참조)
    // 여기서는 목 데이터 구조에 맞춰 빈 배열 또는 기본 로직으로 처리
    const relatedConcepts: any[] = [];

    return {
      ...material,
      isUnderstood: !!userStatus,
      relatedConcepts: relatedConcepts,
    };
  },

  /**
   * [업데이트] 유저의 '이해함' 상태를 토글합니다.
   * 참조 테이블: user_concepts
   */
  async toggleUnderstoodStatus(
    userId: string,
    conceptId: string,
    currentStatus: boolean
  ) {
    if (currentStatus) {
      // 이미 이해함 상태라면 레코드 삭제
      const { error } = await supabase
        .from("user_concepts")
        .delete()
        .eq("user_id", userId)
        .eq("concept_description_material_id", conceptId);

      if (error) throw error;
      return false;
    } else {
      // 미이해 상태라면 레코드 삽입
      const { error } = await supabase.from("user_concepts").insert({
        user_id: userId,
        concept_description_material_id: conceptId,
        user_concept_is_starred: false, // 기본값
      });

      if (error) throw error;
      return true;
    }
  },

  /**
   * [AI 서비스] Gemini API를 사용하여 개념에 대한 질문에 답변합니다.
   * @param conceptName 현재 보고 있는 개념 이름
   * @param userQuestion 유저의 질문 내용
   */
  async askAIChat(conceptName: string, userQuestion: string) {
    try {
      const response = await fetch("/api/gemini/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `개념 [${conceptName}]에 대해 질문합니다: ${userQuestion}`,
        }),
      });

      if (!response.ok) throw new Error("AI 응답을 가져오는데 실패했습니다.");
      const data = await response.json();
      return data.answer;
    } catch (error) {
      console.error("Gemini API Error:", error);
      throw error;
    }
  },

  /**
   * [Todo 생성] Firebase 등에 이미지를 업로드한 후, 해당 개념을 Todo 리스트에 등록합니다.
   * (구조상 DB 처리는 Supabase에서 진행)
   */
  async addConceptTodo(userId: string, conceptId: string, type: string) {
    const { error } = await supabase.from("notes").insert({
      user_id: userId,
      note_title: `[할일] ${type} 학습하기`,
      note_description: `개념 ID: ${conceptId} 와 연관된 학습 과제입니다.`,
      note_labels: [type, "todo"],
    });

    if (error) throw error;
    return true;
  },
};

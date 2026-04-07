import { supabase } from "../../db/supabase/supabase";

import { CreateConceptParams } from "../../types/api/Concept/ConceptCreatePage";

/**
 * [ConceptCreateService]
 * 개인 학습 컨셉의 생성, 수정, 조회 및 AI 본문 생성을 담당합니다.
 * 참조 테이블: concepts, concept_concepts, concepts
 */
export const ConceptCreateService = {
  /**
   * [생성] 개념을 생성하고 선택된 개념들과의 관계를 설정합니다.
   */
  async createConcept(params: CreateConceptParams) {
    const {
      title,
      prompt,
      categories = [],
      userId,
      concepts = [],
      description,
    } = params;

    // 1. 컨셉 껍데기 먼저 저장
    const { data: concept, error: conceptError } = await supabase
      .from("concepts")
      .insert({
        concept_name: title, // fix: concept_title → concept_name
        concept_content: "",
        concept_category: categories,
        concept_description: description,
        user_id: userId,
      })
      .select()
      .single();

    if (conceptError) throw conceptError;

    // 2. Edge Function으로 AI 컨셉 생성 및 저장
    const { error: fnError } = await supabase.functions.invoke(
      "concepts-concept_ai_create",
      {
        body: {
          concept_id: concept.concept_id,
          user_id: userId,
          title,
          description,
          prompt,
          concepts,
          categories,
        },
      },
    );

    if (fnError) throw fnError;

    return concept;
  },
};

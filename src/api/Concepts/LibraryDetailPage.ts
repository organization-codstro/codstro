import { supabase } from "../../db/supabase/supabase";

export interface RelatedItem {
  id: string;
  name: string;
  type: "concept" | "tool" | "library" | "service";
}

export interface LibraryDetail {
  id: number;
  name: string;
  language: string;
  category: string[];
  tags: string[]; // category 배열을 tags로 활용
  officialSite: string | null;
  description: string;
  content: string;
  isUnderstood: boolean;
  relatedConcepts: RelatedItem[];
}

/**
 * [LibraryDetailService]
 * 라이브러리 상세 정보 조회, 학습 상태 업데이트 및 AI 질의응답을 담당합니다.
 * 참조 테이블: librarie_description_materials, user_concepts
 */
export const LibraryDetailService = {
  /**
   * [조회] 특정 라이브러리의 상세 정보와 유저의 이해 여부를 가져옵니다.
   */
  async getLibraryDetail(
    libraryId: string,
    userId: number
  ): Promise<LibraryDetail> {
    // 1. 라이브러리 상세 데이터 조회 (테이블 기준 컬럼 매핑)
    const { data: libraryData, error: libraryError } = await supabase
      .from("librarie_description_materials")
      .select(
        `
        id:librarie_description_material_id,
        name:librarie_description_material_name,
        language:librarie_description_material_included_language,
        description:librarie_description_material_description,
        content:librarie_description_material_content,
        category:librarie_description_material_category,
        officialSite:librarie_description_material_document_url
      `
      )
      .eq("librarie_description_material_id", libraryId)
      .single();

    if (libraryError) throw new Error(libraryError.message);

    // 2. 유저의 학습 상태 조회 (user_concepts 테이블)
    const { data: userStatus } = await supabase
      .from("user_concepts")
      .select("user_concept_id")
      .eq("user_id", userId)
      .eq("librarie_description_material_id", libraryId)
      .single();

    // 3. 연관 개념 조회 (가정: note_concept 테이블 참조 등)
    // 스키마 구조상 매핑 테이블이 필요하며, 현재는 빈 배열로 반환 로직 구성
    const relatedItems: any[] = [];

    return {
      ...libraryData,
      tags: libraryData.category || [],
      isUnderstood: !!userStatus,
      relatedConcepts: relatedItems,
    };
  },

  /**
   * [업데이트] 라이브러리 '이해함' 상태를 토글합니다.
   * 참조 테이블: user_concepts
   */
  async toggleLibraryUnderstood(
    userId: number,
    libraryId: string,
    currentStatus: boolean
  ) {
    if (currentStatus) {
      // 이해함 취소 (삭제)
      const { error } = await supabase
        .from("user_concepts")
        .delete()
        .eq("user_id", userId)
        .eq("librarie_description_material_id", libraryId);

      if (error) throw error;
      return false;
    } else {
      // 이해함 추가 (삽입)
      const { error } = await supabase.from("user_concepts").insert({
        user_id: userId,
        librarie_description_material_id: parseInt(libraryId),
        user_concept_is_starred: false,
        // 다른 FK 필드들은 NULL 또는 기본값 처리 (스키마 대응)
        third_party_services_description_material_id: 1,
      });

      if (error) throw error;
      return true;
    }
  },

  /**
   * [AI 서비스] Gemini API를 사용하여 해당 라이브러리의 최신 트렌드나 사용법을 묻습니다.
   */
  async askLibraryAI(libraryName: string, question: string) {
    try {
      const response = await fetch("/api/gemini/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt: `라이브러리 [${libraryName}]에 대한 질문: ${question}`,
        }),
      });
      const data = await response.json();
      return data.answer;
    } catch (error) {
      console.error("Gemini API Error:", error);
      throw error;
    }
  },

  /**
   * [Todo 추가] 라이브러리 관련 학습 노트를 생성합니다.
   * 참조 테이블: notes
   */
  async addLibraryTodo(userId: number, libraryName: string, type: string) {
    const { error } = await supabase.from("notes").insert({
      user_id: userId,
      note_title: `[학습] ${libraryName} - ${type}`,
      note_description: `${libraryName} 라이브러리의 ${type} 관련 과제입니다.`,
      note_labels: ["Library", type],
      created_date: new Date().toISOString().split("T")[0],
    });

    if (error) throw error;
    return true;
  },
};

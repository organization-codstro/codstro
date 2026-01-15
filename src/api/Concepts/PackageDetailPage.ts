import { supabase } from "../../db/supabase/supabase";
import { PackageManagerDetail } from "../../types/api/Concepts/PackageDetailPage";

/**
 * [PackageManagerService]
 * 패키지 매니저(NPM, Yarn, PNPM 등)의 상세 정보 조회 및 사용자 인터랙션을 담당합니다.
 * 참조 테이블: package_manager_description__materials, user_concepts
 */
export const PackageManagerService = {
  /**
   * [상세 조회] 특정 패키지 매니저 자료의 상세 정보를 가져옵니다.
   */
  async getPackageManagerDetail(
    materialId: string,
    userId: number
  ): Promise<PackageManagerDetail> {
    try {
      // 1. 패키지 매니저 기본 정보 조회
      const { data: material, error: materialError } = await supabase
        .from("package_manager_description__materials")
        .select(
          `
          id: package_manager_description__materials_id,
          name: package_manager_description__materials_name,
          description: package_manager_description__materials_description,
          content: package_manager_description__materials_content,
          category: package_manager_description__materials_category,
          documentUrl: package_manager_description__materials_document_url,
          representativeImageUrl: package_manager_description__materials_representative_image_url
        `
        )
        .eq("package_manager_description__materials_id", materialId)
        .single();

      if (materialError) throw materialError;

      // 2. 유저의 학습 상태 조회 (user_concepts 테이블)
      const { data: userStatus } = await supabase
        .from("user_concepts")
        .select("user_concept_id")
        .eq("user_id", userId)
        .eq("package_manager_description__materials_id", materialId)
        .single();

      // 3. 연관 자료 조회 (간단한 로직: 동일 카테고리 내 다른 아이템)
      const { data: related } = await supabase
        .from("package_manager_description__materials")
        .select(
          "id:package_manager_description__materials_id, name:package_manager_description__materials_name"
        )
        .neq("package_manager_description__materials_id", materialId)
        .limit(4);

      return {
        ...material,
        isUnderstood: !!userStatus,
        relatedMaterials: related || [],
      };
    } catch (error) {
      console.error("Error fetching package manager detail:", error);
      throw error;
    }
  },

  /**
   * [이해함 토글] 사용자의 학습 완료 상태를 업데이트합니다.
   */
  async toggleUnderstanding(
    userId: number,
    materialId: string,
    currentStatus: boolean
  ) {
    if (currentStatus) {
      // 이미 이해함 상태라면 레코드 삭제
      const { error } = await supabase
        .from("user_concepts")
        .delete()
        .eq("user_id", userId)
        .eq("package_manager_description__materials_id", materialId);
      if (error) throw error;
      return false;
    } else {
      // 새로 이해함 체크라면 레코드 삽입
      const { error } = await supabase.from("user_concepts").insert({
        user_id: userId,
        package_manager_description__materials_id: parseInt(materialId),
        user_concept_is_starred: false,
        // 다른 FK 필드들은 기본값(1) 또는 NULL 처리
        concept_description_material_id: 1,
        tool_description_material_id: 1,
        librarie_description_material_id: 1,
        third_party_services_description_material_id: 1,
      });
      if (error) throw error;
      return true;
    }
  },

  /**
   * [Todo 추가] 패키지 매니저 실습 과제를 개인 노트에 등록합니다.
   */
  async addPackageManagerTodo(
    userId: number,
    materialName: string,
    type: string
  ) {
    const title =
      type === "documentation"
        ? `${materialName} 공식 가이드 정독하기`
        : `${materialName} 환경 설정 및 실습 프로젝트 생성`;

    const { error } = await supabase.from("notes").insert({
      user_id: userId,
      note_title: title,
      note_description: `${materialName}에 대한 ${type} 과제입니다.`,
      note_labels: ["Package Manager", type],
      created_date: new Date().toISOString().split("T")[0],
    });

    if (error) throw error;
    return true;
  },
};

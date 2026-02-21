import { useState, useEffect, useMemo } from "react";
import { BookOpen, Loader2 } from "lucide-react";
import { toast } from "react-toastify";

// API 서비스 및 인증
import { RecommendedDocumentsMainPageService } from "../../api/Woomoonjeong/RecommendedDocumentsMainPage";
import { LoginService } from "../../api/Auth/LoginPage";

// UI 컴포넌트
import SearchInput from "../../components/Woomoonjeong/RecommendedDocumentsMainPage/SearchInput";
import ContentTypeFilter from "../../components/Woomoonjeong/RecommendedDocumentsMainPage/ContentTypeFilter";
import FilterSection from "../../components/Woomoonjeong/RecommendedDocumentsMainPage/FilterSection";
import DocumentsGrid from "../../components/Woomoonjeong/RecommendedDocumentsMainPage/DocumentsGrid";
import AssignRecommendedFieldModal from "../../components/Woomoonjeong/RecommendedCreateFieldModal";
import RecommendedCreateDocumentModal from "../../components/Woomoonjeong/RecommendedDocumentsMainPage/RecommendedCreateDocumentModal";
import {
  Group,
  Pin,
  RecommendedField,
  RecommendedPin,
} from "../../types/common/woomoonjeong";
import { DocumentsManagementService } from "../../api/Woomoonjeong/DocumentsManagementPage";

export default function RecommendedDocumentsMainPage() {
  // --- 상태 관리 ---
  const [contentType, setContentType] = useState<"documents" | "fields">(
    "documents",
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // 데이터 상태
  const [recommendedPins, setRecommendedPins] = useState<RecommendedPin[]>([]);
  const [recommendedFields, setRecommendedFields] = useState<
    RecommendedField[]
  >([]);
  const [woomoonjeongData, setWoomoonjeongData] = useState<Group[]>([]);

  // 모달 제어
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedPin, setSelectedPin] = useState<Pin | null>(null);
  const [isAddFieldModalOpen, setIsAddFieldModalOpen] = useState(false);
  const [selectedField, setSelectedField] = useState<RecommendedField | null>(
    null,
  );

  // --- 초기 데이터 로드 ---
  useEffect(() => {
    const initData = async () => {
      setIsLoading(true);
      try {
        // 로그인 체크
        await LoginService.getCurrentUserId();

        // 데이터 동시 로드
        const [pins, fields, woomoonjeongData] = await Promise.all([
          RecommendedDocumentsMainPageService.getRecommendedPins(),
          RecommendedDocumentsMainPageService.getRecommendedFields(),
          DocumentsManagementService.getAllGroupsWithDetails(),
        ]);

        setRecommendedPins(pins || []);
        setRecommendedFields(fields || []);
        setWoomoonjeongData(woomoonjeongData);
      } catch (error) {
        toast.error("추천 데이터를 불러오는데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };
    initData();
  }, []);

  // --- 검색 필터링 (클라이언트 사이드) ---
  const filteredPins = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return recommendedPins.filter(
      (pin) =>
        pin.pin_title.toLowerCase().includes(q) ||
        pin.pin_description?.toLowerCase().includes(q),
    );
  }, [recommendedPins, searchQuery]);

  const filteredFields = useMemo(() => {
    const q = searchQuery.toLowerCase();
    return recommendedFields.filter(
      (field) =>
        field.field_name.toLowerCase().includes(q) ||
        field.field_description?.toLowerCase().includes(q),
    );
  }, [recommendedFields, searchQuery]);

  // --- 핸들러 로직 ---

  // 1. 추천 핀 클릭 시 트래킹 및 모달 오픈
  const handleAddDocument = async (pin: any) => {
    try {
      // 조회수 증가 (비동기로 실행, UI 블로킹 X)
      RecommendedDocumentsMainPageService.trackLinkClick({ url: pin.pin_url });
      setSelectedPin(pin);
      setIsAddModalOpen(true);
    } catch (error) {
      console.error(error);
    }
  };

  // 2. 추천 분야 할당 모달 오픈
  const handleAddField = (field: any) => {
    setSelectedField(field);
    setIsAddFieldModalOpen(true);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <Loader2 className="w-10 h-10 text-purple-600 animate-spin" />
        <p className="font-medium text-gray-500">
          추천 리소스를 불러오는 중...
        </p>
      </div>
    );
  }

  return (
    <div className="p-8 bg-gray-50">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Recommended Documents
            </h1>
            <p className="text-gray-600">
              Curated learning resources and fields for you
            </p>
          </div>
          <SearchInput
            value={searchQuery}
            onChange={setSearchQuery}
            placeholder={
              contentType === "documents"
                ? "Search documents..."
                : "Search fields..."
            }
          />
        </div>

        <FilterSection>
          <ContentTypeFilter
            contentType={contentType}
            onChange={setContentType}
          />
        </FilterSection>

        <DocumentsGrid
          key={contentType}
          contentType={contentType}
          documents={filteredPins}
          fields={filteredFields}
          // 저장 기능은 필요 시 API 연동 (현재는 조회 위주)
          savedPins={new Set()}
          savedFields={new Set()}
          onToggleSavePin={() => {}}
          onToggleSaveField={() => {}}
          onAddDocument={handleAddDocument}
          onAddField={handleAddField}
        />

        {((contentType === "documents" && filteredPins.length === 0) ||
          (contentType === "fields" && filteredFields.length === 0)) && (
          <div className="p-12 text-center bg-white border border-purple-100 rounded-xl">
            <BookOpen className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <h3 className="text-lg font-medium text-gray-800">
              No {contentType} found
            </h3>
            <p className="text-gray-600">Try adjusting your search query</p>
          </div>
        )}
      </div>

      {/* 추천 핀을 내 필드에 추가하는 모달 */}
      {selectedPin && (
        <RecommendedCreateDocumentModal
          isOpen={isAddModalOpen}
          onClose={() => {
            setIsAddModalOpen(false);
            setSelectedPin(null);
          }}
          pin={selectedPin}
          groups={woomoonjeongData}
          // 모달 내부에서 RecommendedDocumentsMainPageService.addRecommendedPinToMyField 호출 권장
          onAdd={() => {
            toast.success("문서가 내 보관함에 추가되었습니다.");
            setIsAddModalOpen(false);
          }}
        />
      )}

      {/* 추천 분야를 내 그룹에 할당하는 모달 */}
      {selectedField && (
        <AssignRecommendedFieldModal
          isOpen={isAddFieldModalOpen}
          onClose={() => {
            setIsAddFieldModalOpen(false);
            setSelectedField(null);
          }}
          field={{
            field_id: selectedField.field_id,
            field_name: selectedField.field_name,
            field_description: selectedField.field_description,
            create_at: selectedField.create_at,
          }}
          // 모달 내부에서 RecommendedDocumentsMainPageService.addRecommendedFieldToMyGroup 호출 권장
          onAdd={() => {
            toast.success("분야가 내 그룹에 할당되었습니다.");
            setIsAddFieldModalOpen(false);
          }}
        />
      )}
    </div>
  );
}

import React, { useEffect, useState, useMemo } from "react";
import { toast } from "react-toastify";
import {
  ChevronDown,
  ChevronRight,
  FileText,
  Trash2,
  Check,
  Loader2,
} from "lucide-react";

// API 서비스 및 인증 서비스
import { DocumentsManagementService } from "../../api/Woomoonjeong/DocumentsManagementPage";
import { LoginService } from "../../api/Auth/LoginPage";

// 기존 컴포넌트 및 설정
import { fieldTypeColors } from "../../data/woomoonjeong/woomoonjeongData";
import CreateCustomFieldModal from "../../components/Woomoonjeong/DocumentsManagementPage/Modal/CreateCustomFieldModal";
import CreateCustomDocumentModal from "../../components/Woomoonjeong/DocumentsManagementPage/Modal/CreateDocumentModal";
import EditDocumentModal from "../../components/Woomoonjeong/DocumentsManagementPage/Modal/EditDocumentModal";
import ManagementHeader from "../../components/Woomoonjeong/DocumentsManagementPage/ManagementHeader";
import DocumentFilterBar from "../../components/Woomoonjeong/DocumentsManagementPage/DocumentFilterBar";
import FieldItem from "../../components/Woomoonjeong/DocumentsManagementPage/FieldItem";
import ManagementSidebar from "../../components/Woomoonjeong/DocumentsManagementPage/ManagementSidebar";

export default function DocumentsManagementPage() {
  // --- 상태 관리 ---
  const [woomoonjeongData, setWoomoonjeongData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);

  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(new Set());
  const [expandedFields, setExpandedFields] = useState<Set<string>>(new Set());
  const [selectedGroupType, setSelectedGroupType] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // 모달 및 편집 상태
  const [isCreateFieldModalOpen, setIsCreateFieldModalOpen] = useState(false);
  const [isCreateDocumentModalOpen, setIsCreateDocumentModalOpen] =
    useState(false);
  const [editingPin, setEditingPin] = useState<{
    pin: any;
    group: any;
    field: any;
  } | null>(null);
  const [deletePending, setDeletePending] = useState<{
    type: "group" | "field" | "pin";
    id: string;
  } | null>(null);

  // --- 초기 데이터 로드 ---
  useEffect(() => {
    const initPage = async () => {
      setIsLoading(true);
      try {
        const userId = await LoginService.getCurrentUserId();
        setCurrentUserId(userId);

        // 유저 ID 확보 후 데이터 로드
        await fetchData();
      } catch (error) {
        toast.error("데이터를 불러오는데 실패했습니다.");
      } finally {
        setIsLoading(false);
      }
    };
    initPage();
  }, []);

  const fetchData = async () => {
    try {
      const data = await DocumentsManagementService.getAllGroupsWithDetails();
      setWoomoonjeongData(data || []);
    } catch (error) {
      console.error(error);
    }
  };

  // --- 삭제 타이머 익스텐션 ---
  useEffect(() => {
    if (deletePending) {
      const timer = setTimeout(() => setDeletePending(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [deletePending]);

  // --- 핸들러 로직 ---
  const toggleGroup = (groupId: string) => {
    setExpandedGroups((prev) => {
      const next = new Set(prev);
      next.has(groupId) ? next.delete(groupId) : next.add(groupId);
      return next;
    });
  };

  const handleSaveFieldName = async (
    // groupId: string,
    fieldId: string,
    newName: string
  ) => {
    if (!newName.trim()) return;
    try {
      await DocumentsManagementService.updateFieldName({
        fieldId,
        newName: newName.trim(),
      });
      await fetchData(); // 데이터 갱신
      toast.info("필드 이름이 수정되었습니다.");
    } catch (error) {
      toast.error("이름 수정에 실패했습니다.");
    }
  };

  const handleDeleteAction = async (
    e: React.MouseEvent,
    type: "group" | "field" | "pin",
    id: string
  ) => {
    e.preventDefault();
    e.stopPropagation();

    if (deletePending?.type === type && deletePending?.id === id) {
      try {
        await DocumentsManagementService.deleteItem({ type, id });
        toast.success(`${type.toUpperCase()} 삭제 완료`);
        setDeletePending(null);
        await fetchData(); // 데이터 갱신
      } catch (error) {
        toast.error("삭제 중 오류가 발생했습니다.");
      }
    } else {
      setDeletePending({ type, id });
    }
  };

  const handleEditPin = (pinId: string) => {
    for (const group of woomoonjeongData) {
      for (const field of group.fields) {
        const pin = field.pins.find((p: any) => (p.pin_id || p.id) === pinId);
        if (pin) {
          setEditingPin({ pin, group, field });
          return;
        }
      }
    }
  };

  // --- 필터링 및 통계 계산 ---
  const filteredGroups = useMemo(() => {
    return woomoonjeongData.filter((group) => {
      const gName = group.group_name || group.name;
      const gDesc = group.group_description || group.description;

      if (selectedGroupType !== "all" && gName !== selectedGroupType)
        return false;
      if (!searchQuery) return true;

      const q = searchQuery.toLowerCase();
      return (
        gDesc.toLowerCase().includes(q) ||
        group.fields.some(
          (f: any) =>
            (f.field_name || f.name).toLowerCase().includes(q) ||
            f.pins.some((p: any) =>
              (p.pin_title || p.title).toLowerCase().includes(q)
            )
        )
      );
    });
  }, [woomoonjeongData, selectedGroupType, searchQuery]);

  const stats = useMemo(() => {
    const totalFields = woomoonjeongData.reduce(
      (acc, g) => acc + (g.fields?.length || 0),
      0
    );
    const totalPins = woomoonjeongData.reduce(
      (acc, g) =>
        acc +
        (g.fields?.reduce(
          (fa: number, f: any) => fa + (f.pins?.length || 0),
          0
        ) || 0),
      0
    );
    return { totalFields, totalPins };
  }, [woomoonjeongData]);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen gap-4">
        <Loader2 className="w-10 h-10 text-purple-600 animate-spin" />
        <p className="text-gray-500 font-medium">
          데이터를 불러오는 중입니다...
        </p>
      </div>
    );
  }

  return (
    <div
      className="min-h-screen p-8 bg-gray-50"
      onClick={() => setDeletePending(null)}
    >
      <div className="mx-auto space-y-6 max-w-7xl">
        <ManagementHeader
          onCreateDocument={() => setIsCreateDocumentModalOpen(true)}
          onCreateField={() => setIsCreateFieldModalOpen(true)}
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          <div className="space-y-6 lg:col-span-3">
            <DocumentFilterBar
              selectedGroupType={selectedGroupType}
              onSelectType={setSelectedGroupType}
              searchQuery={searchQuery}
              onSearchChange={setSearchQuery}
            />

            <div className="p-6 bg-white border border-purple-100 shadow-sm rounded-xl">
              <h2 className="mb-6 text-lg font-semibold text-gray-800">
                My Documents
              </h2>
              <div className="space-y-4">
                {filteredGroups.map((group) => {
                  const gId = group.group_id || group.id;
                  const gName = group.group_name || group.name;
                  const gDesc = group.group_description || group.description;

                  return (
                    <div
                      key={gId}
                      className="overflow-hidden border border-gray-200 rounded-lg"
                    >
                      <div className="flex items-center justify-between p-4 bg-gray-50">
                        <div
                          className="flex items-center flex-1 gap-3 cursor-pointer"
                          onClick={() => toggleGroup(gId)}
                        >
                          {expandedGroups.has(gId) ? (
                            <ChevronDown className="w-4 h-4" />
                          ) : (
                            <ChevronRight className="w-4 h-4" />
                          )}
                          <span
                            className={`px-3 py-1 text-sm rounded-full border ${
                              fieldTypeColors[
                                gName as keyof typeof fieldTypeColors
                              ] || "border-gray-200"
                            }`}
                          >
                            {gName}
                          </span>
                          <h3 className="font-medium">{gDesc}</h3>
                        </div>
                        <button
                          onClick={(e) => handleDeleteAction(e, "group", gId)}
                          className={`p-1 ${
                            deletePending?.type === "group" &&
                            deletePending?.id === gId
                              ? "text-red-600"
                              : "text-gray-400"
                          }`}
                        >
                          {deletePending?.type === "group" &&
                          deletePending?.id === gId ? (
                            <Check className="w-4 h-4" />
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </button>
                      </div>

                      {expandedGroups.has(gId) && (
                        <div className="p-4 space-y-3 bg-white">
                          {group.fields?.map((field: any) => (
                            <FieldItem
                              key={field.field_id || field.id}
                              field={field}
                              group={group}
                              isExpanded={expandedFields.has(
                                field.field_id || field.id
                              )}
                              onToggle={() =>
                                setExpandedFields((prev) => {
                                  const next = new Set(prev);
                                  const fId = field.field_id || field.id;
                                  next.has(fId)
                                    ? next.delete(fId)
                                    : next.add(fId);
                                  return next;
                                })
                              }
                              onSaveName={handleSaveFieldName}
                              onDeleteAction={handleDeleteAction}
                              deletePending={deletePending}
                              onEditPin={handleEditPin}
                            />
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
                {filteredGroups.length === 0 && (
                  <div className="py-12 text-center text-gray-400">
                    <FileText className="mx-auto mb-2" />
                    No documents found
                  </div>
                )}
              </div>
            </div>
          </div>

          <ManagementSidebar
            data={woomoonjeongData}
            totalFields={stats.totalFields}
            totalPins={stats.totalPins}
          />
        </div>
      </div>

      <CreateCustomFieldModal
        isOpen={isCreateFieldModalOpen}
        onClose={() => setIsCreateFieldModalOpen(false)}
        onAdd={fetchData}
      />
      <CreateCustomDocumentModal
        isOpen={isCreateDocumentModalOpen}
        onClose={() => setIsCreateDocumentModalOpen(false)}
        onAdd={fetchData}
      />
      {editingPin && (
        <EditDocumentModal
          isOpen={!!editingPin}
          onClose={() => setEditingPin(null)}
          pin={editingPin.pin}
          onAdd={fetchData}
        />
      )}
    </div>
  );
}

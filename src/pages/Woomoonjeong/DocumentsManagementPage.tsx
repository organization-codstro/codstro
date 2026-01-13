import React, { useEffect, useState, useMemo } from "react";
import { toast } from "react-toastify";
import {
  ChevronDown,
  ChevronRight,
  FileText,
  Trash2,
  Check,
} from "lucide-react";

// 데이터 및 타입
import {
  woomoonjeongData as initialData,
  fieldTypeColors,
} from "../../data/woomoonjeong/woomoonjeongData";
import { Field, Group, Pin } from "../../types/pages/Woomoonjeong/woomoonjeong";

// 기존 모달 컴포넌트
import CreateCustomFieldModal from "../../components/Woomoonjeong/DocumentsManagementPage/Modal/CreateCustomFieldModal";
import CreateCustomDocumentModal from "../../components/Woomoonjeong/DocumentsManagementPage/Modal/CreateDocumentModal";
import EditDocumentModal from "../../components/Woomoonjeong/DocumentsManagementPage/Modal/EditDocumentModal";
import ManagementHeader from "../../components/Woomoonjeong/DocumentsManagementPage/ManagementHeader";
import DocumentFilterBar from "../../components/Woomoonjeong/DocumentsManagementPage/DocumentFilterBar";
import FieldItem from "../../components/Woomoonjeong/DocumentsManagementPage/FieldItem";
import ManagementSidebar from "../../components/Woomoonjeong/DocumentsManagementPage/ManagementSidebar";

export default function DocumentsManagementPagePage() {
  // --- 상태 관리 ---
  const [woomoonjeongData, setWoomoonjeongData] = useState<Group[]>(
    initialData as unknown as Group[]
  );
  const [expandedGroups, setExpandedGroups] = useState<Set<number>>(
    new Set([1])
  );
  const [expandedFields, setExpandedFields] = useState<Set<number>>(
    new Set([1])
  );
  const [selectedGroupType, setSelectedGroupType] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");

  // 모달 및 편집 상태
  const [isCreateFieldModalOpen, setIsCreateFieldModalOpen] = useState(false);
  const [isCreateDocumentModalOpen, setIsCreateDocumentModalOpen] =
    useState(false);
  const [editingPin, setEditingPin] = useState<{
    pin: Pin;
    group: Group;
    field: Field;
  } | null>(null);
  const [deletePending, setDeletePending] = useState<{
    type: "group" | "field" | "pin";
    id: number;
  } | null>(null);

  // --- 삭제 타이머 익스텐션 ---
  useEffect(() => {
    if (deletePending) {
      const timer = setTimeout(() => setDeletePending(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [deletePending]);

  // --- 핸들러 로직 ---
  const toggleGroup = (groupId: number) => {
    setExpandedGroups((prev) => {
      const next = new Set(prev);
      next.has(groupId) ? next.delete(groupId) : next.add(groupId);
      return next;
    });
  };

  const handleSaveFieldName = (
    groupId: number,
    fieldId: number,
    newName: string
  ) => {
    if (!newName.trim()) return;
    setWoomoonjeongData((prev) =>
      prev.map((group) =>
        group.id === groupId
          ? {
              ...group,
              fields: group.fields.map((f) =>
                f.id === fieldId ? { ...f, name: newName.trim() } : f
              ),
            }
          : group
      )
    );
    toast.info("필드 이름이 수정되었습니다.");
  };

  const handleDeleteAction = (
    e: React.MouseEvent,
    type: "group" | "field" | "pin",
    id: number
  ) => {
    e.preventDefault();
    e.stopPropagation();

    if (deletePending?.type === type && deletePending?.id === id) {
      // 실제 삭제 로직
      if (type === "group")
        setWoomoonjeongData((prev) => prev.filter((g) => g.id !== id));
      else if (type === "field")
        setWoomoonjeongData((prev) =>
          prev.map((g) => ({
            ...g,
            fields: g.fields.filter((f) => f.id !== id),
          }))
        );
      else if (type === "pin")
        setWoomoonjeongData((prev) =>
          prev.map((g) => ({
            ...g,
            fields: g.fields.map((f) => ({
              ...f,
              pins: f.pins.filter((p) => p.id !== id),
            })),
          }))
        );

      toast.success(`${type.toUpperCase()} 삭제 완료`);
      setDeletePending(null);
    } else {
      setDeletePending({ type, id });
    }
  };

  const handleEditPin = (pinId: number) => {
    for (const group of woomoonjeongData) {
      for (const field of group.fields) {
        const pin = field.pins.find((p) => p.id === pinId);
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
      if (selectedGroupType !== "all" && group.name !== selectedGroupType)
        return false;
      if (!searchQuery) return true;
      const q = searchQuery.toLowerCase();
      return (
        group.description.toLowerCase().includes(q) ||
        group.fields.some(
          (f) =>
            f.name.toLowerCase().includes(q) ||
            f.pins.some((p) => p.title.toLowerCase().includes(q))
        )
      );
    });
  }, [woomoonjeongData, selectedGroupType, searchQuery]);

  const stats = useMemo(() => {
    const totalFields = woomoonjeongData.reduce(
      (acc, g) => acc + g.fields.length,
      0
    );
    const totalPins = woomoonjeongData.reduce(
      (acc, g) => acc + g.fields.reduce((fa, f) => fa + f.pins.length, 0),
      0
    );
    return { totalFields, totalPins };
  }, [woomoonjeongData]);

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
                {filteredGroups.map((group) => (
                  <div
                    key={group.id}
                    className="overflow-hidden border border-gray-200 rounded-lg"
                  >
                    {/* Group Header */}
                    <div className="flex items-center justify-between p-4 bg-gray-50">
                      <div
                        className="flex items-center flex-1 gap-3 cursor-pointer"
                        onClick={() => toggleGroup(group.id)}
                      >
                        {expandedGroups.has(group.id) ? (
                          <ChevronDown className="w-4 h-4" />
                        ) : (
                          <ChevronRight className="w-4 h-4" />
                        )}
                        <span
                          className={`px-3 py-1 text-sm rounded-full border ${
                            fieldTypeColors[group.name]
                          }`}
                        >
                          {group.name}
                        </span>
                        <h3 className="font-medium">{group.description}</h3>
                      </div>
                      <button
                        onClick={(e) =>
                          handleDeleteAction(e, "group", group.id)
                        }
                        className={`p-1 ${
                          deletePending?.type === "group" &&
                          deletePending?.id === group.id
                            ? "text-red-600"
                            : "text-gray-400"
                        }`}
                      >
                        {deletePending?.type === "group" &&
                        deletePending?.id === group.id ? (
                          <Check className="w-4 h-4" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>

                    {/* Group Content */}
                    {expandedGroups.has(group.id) && (
                      <div className="p-4 space-y-3 bg-white">
                        {group.fields.map((field) => (
                          <FieldItem
                            key={field.id}
                            field={field}
                            group={group}
                            isExpanded={expandedFields.has(field.id)}
                            onToggle={() =>
                              setExpandedFields((prev) => {
                                const next = new Set(prev);
                                next.has(field.id)
                                  ? next.delete(field.id)
                                  : next.add(field.id);
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
                ))}
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

      {/* Modals */}
      <CreateCustomFieldModal
        isOpen={isCreateFieldModalOpen}
        onClose={() => setIsCreateFieldModalOpen(false)}
        onAdd={() => {}}
      />
      <CreateCustomDocumentModal
        isOpen={isCreateDocumentModalOpen}
        onClose={() => setIsCreateDocumentModalOpen(false)}
        onAdd={() => {}}
      />
      {editingPin && (
        <EditDocumentModal
          isOpen={!!editingPin}
          onClose={() => setEditingPin(null)}
          pin={editingPin.pin}
          onAdd={() => {}}
        />
      )}
    </div>
  );
}

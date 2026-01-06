import React, { useEffect, useState } from "react";
import {
  Plus,
  ChevronDown,
  ChevronRight,
  ExternalLink,
  Tag,
  Filter,
  Search,
  CreditCard as Edit3,
  Trash2,
  FileText,
  Save,
  X,
  Check,
} from "lucide-react";
import {
  woomoonjeongData as initialWoomoonjeongData,
  fieldTypeColors,
} from "../../data/woomoonjeong/woomoonjeongData";
import { Field, Group, Pin } from "../../types/Woomoonjeong/woomoonjeong";
//유저가 생성하는 필드 생성 모달
import CreateCustomFieldModal from "../../components/Woomoonjeong/DocumentsManagement/CreateCustomFieldModal";
//문서 추가 모달
import CreateCustomDocumentModal from "../../components/Woomoonjeong/DocumentsManagement/CreateDocumentModal";
//수정 모달
import EditDocumentModal from "../../components/Woomoonjeong/DocumentsManagement/EditDocumentModal";
import { toast, ToastContainer } from "react-toastify";

const DocumentsManagement: React.FC = () => {
  // 인터페이스 구조에 따라 데이터를 Group[] 타입으로 관리합니다.
  const [woomoonjeongData, setWoomoonjeongData] = useState<Group[]>(
    initialWoomoonjeongData as unknown as Group[]
  );

  const [expandedGroups, setExpandedGroups] = useState<Set<number>>(
    new Set([1])
  );
  const [expandedFields, setExpandedFields] = useState<Set<number>>(
    new Set([1])
  );

  const [selectedGroupType, setSelectedGroupType] = useState<
    "all" | "web" | "app" | "server" | "game" | "security" | "work" | "other"
  >("all");

  const [searchQuery, setSearchQuery] = useState("");

  // 수정 대상이 Group에서 Field로 변경됨 (Field 인터페이스에 name이 있기 때문)
  const [editingFieldId, setEditingFieldId] = useState<number | null>(null);
  const [editingFieldName, setEditingFieldName] = useState<string>("");
  //field 생성 모달
  const [isCreateFieldModalOpen, setIsCreateFieldModalOpen] = useState(false);
  //문서 생성 모달
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

  useEffect(() => {
    if (deletePending) {
      const timer = setTimeout(() => setDeletePending(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [deletePending]);

  const toggleGroup = (groupId: number) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(groupId)) {
      newExpanded.delete(groupId);
    } else {
      newExpanded.add(groupId);
    }
    setExpandedGroups(newExpanded);
  };

  const toggleField = (fieldId: number) => {
    const newExpanded = new Set(expandedFields);
    if (newExpanded.has(fieldId)) {
      newExpanded.delete(fieldId);
    } else {
      newExpanded.add(fieldId);
    }
    setExpandedFields(newExpanded);
  };

  const editField = (field: Field) => {
    setEditingFieldId(field.id);
    setEditingFieldName(field.name);
  };

  const saveFieldName = (groupId: number, fieldId: number) => {
    if (editingFieldName.trim()) {
      setWoomoonjeongData((prev) =>
        prev.map((group) => {
          if (group.id === groupId) {
            return {
              ...group,
              fields: group.fields.map((field) =>
                field.id === fieldId
                  ? { ...field, name: editingFieldName.trim() }
                  : field
              ),
            };
          }
          return group;
        })
      );
    }
    setEditingFieldId(null);
    setEditingFieldName("");
  };

  const cancelEditField = () => {
    setEditingFieldId(null);
    setEditingFieldName("");
  };

  const deleteGroup = (groupId: number) => {
    if (
      confirm("이 그룹을 삭제하시겠습니까? 모든 필드와 핀이 함께 삭제됩니다.")
    ) {
      console.log("Delete group:", groupId);
    }
  };

  const deleteField = (fieldId: number) => {
    if (confirm("이 필드를 삭제하시겠습니까? 모든 핀이 함께 삭제됩니다.")) {
      console.log("Delete field:", fieldId);
    }
  };

  const deletePin = (pinId: number) => {
    if (confirm("이 핀을 삭제하시겠습니까?")) {
      console.log("Delete pin:", pinId);
    }
  };

  const editPin = (pinId: number) => {
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

  const filteredGroups = woomoonjeongData.filter((group) => {
    // 1. Group Type 필터링
    if (selectedGroupType !== "all" && group.name !== selectedGroupType)
      return false;

    // 2. 검색어 필터링 (Group description, Field name, Pin title/tags 검색)
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const groupMatch = group.description.toLowerCase().includes(q);

      const fieldMatch = group.fields.some(
        (field) =>
          field.name.toLowerCase().includes(q) ||
          field.description.toLowerCase().includes(q)
      );

      const pinMatch = group.fields.some((field) =>
        field.pins.some(
          (pin) =>
            pin.title.toLowerCase().includes(q) ||
            pin.description.toLowerCase().includes(q) ||
            pin.tags.some((tag) => tag.toLowerCase().includes(q))
        )
      );

      return groupMatch || fieldMatch || pinMatch;
    }

    return true;
  });

  const getTotalPinsCount = () => {
    return woomoonjeongData.reduce(
      (total, group) =>
        total +
        group.fields.reduce(
          (fieldTotal, field) => fieldTotal + field.pins.length,
          0
        ),
      0
    );
  };

  const getTotalFieldsCount = () => {
    return woomoonjeongData.reduce(
      (total, group) => total + group.fields.length,
      0
    );
  };

  // 통합 삭제 핸들러
  const handleDeleteAction = (
    e: React.MouseEvent,
    type: "group" | "field" | "pin",
    id: number
  ) => {
    e.preventDefault();
    e.stopPropagation();

    // 2차 클릭: 이미 대기 중인 ID를 다시 누른 경우 -> 실제 삭제
    if (deletePending?.type === type && deletePending?.id === id) {
      if (type === "group") {
        setWoomoonjeongData((prev) => prev.filter((g) => g.id !== id));
        toast.success("그룹이 삭제되었습니다.");
      } else if (type === "field") {
        setWoomoonjeongData((prev) =>
          prev.map((g) => ({
            ...g,
            fields: g.fields.filter((f) => f.id !== id),
          }))
        );
        toast.success("필드가 삭제되었습니다.");
      } else if (type === "pin") {
        setWoomoonjeongData((prev) =>
          prev.map((g) => ({
            ...g,
            fields: g.fields.map((f) => ({
              ...f,
              pins: f.pins.filter((p) => p.id !== id),
            })),
          }))
        );
        toast.success("문서가 삭제되었습니다.");
      }
      setDeletePending(null); // 상태 초기화
    } else {
      // 1차 클릭: 삭제 대기 상태로 변경
      setDeletePending({ type, id });
    }
  };

  return (
    <div className="p-8 bg-gray-50" onClick={() => setDeletePending(null)}>
      <ToastContainer position="top-right" autoClose={2000} />
      <div className="mx-auto space-y-6 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Documents Management
            </h1>
            <p className="text-gray-600">
              Organize your learning documents by groups and fields
            </p>
          </div>
          <div className="flex items-center justify-between gap-4">
            <button
              onClick={() => setIsCreateDocumentModalOpen(true)}
              className="px-4 py-2 bg-[#587CF0] text-white rounded-lg font-medium hover:bg-[#4a6de8] transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add document
            </button>
            <button
              onClick={() => setIsCreateFieldModalOpen(true)}
              className="px-4 py-2 bg-[#587CF0] text-white rounded-lg font-medium hover:bg-[#4a6de8] transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              Add Field
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
          {/* Main Content */}
          <div className="space-y-6 lg:col-span-3">
            {/* Filters */}
            <div className="p-6 bg-white border border-purple-100 shadow-sm rounded-xl">
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <Filter className="w-4 h-4 text-gray-500" />
                  <span className="text-sm font-medium text-gray-700">
                    Group Type:
                  </span>
                  {(
                    [
                      "all",
                      "web",
                      "app",
                      "server",
                      "game",
                      "security",
                      "work",
                      "other",
                    ] as const
                  ).map((type) => (
                    <button
                      key={type}
                      onClick={() => setSelectedGroupType(type)}
                      className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                        selectedGroupType === type
                          ? "bg-[#587CF0] text-white"
                          : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                      }`}
                    >
                      {type}
                    </button>
                  ))}
                </div>

                <div className="flex items-center gap-2">
                  <Search className="w-4 h-4 text-gray-500" />
                  <input
                    type="text"
                    placeholder="Search documents..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="px-3 py-1 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#587CF0] focus:border-transparent outline-none"
                  />
                </div>
              </div>
            </div>

            {/* Document Organization */}
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
                    {/* Group Header (Top Level) */}
                    <div className="flex items-center justify-between p-4 transition-colors bg-gray-50 hover:bg-gray-100">
                      <div
                        className="flex items-center flex-1 gap-3 cursor-pointer"
                        onClick={() => toggleGroup(group.id)}
                      >
                        {expandedGroups.has(group.id) ? (
                          <ChevronDown className="w-4 h-4 text-gray-500" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-gray-500" />
                        )}
                        <div className="flex items-center gap-3">
                          <span
                            className={`px-3 py-1 text-sm rounded-full border ${
                              fieldTypeColors[group.name]
                            }`}
                          >
                            {group.name}
                          </span>
                          <h3 className="font-medium text-gray-800">
                            {group.description}
                          </h3>
                        </div>
                      </div>

                      <div className="flex items-center gap-4">
                        <span className="text-sm text-gray-500">
                          {group.fields.length} fields
                        </span>
                        <button
                          onClick={(e) =>
                            handleDeleteAction(e, "group", group.id)
                          }
                          className={`p-1 transition-all duration-200 ${
                            deletePending?.type === "group" &&
                            deletePending?.id === group.id
                              ? "text-red-600 scale-110" // 대기 중일 때 빨간색으로 강조
                              : "text-gray-400 hover:text-red-500"
                          }`}
                        >
                          {deletePending?.type === "group" &&
                          deletePending?.id === group.id ? (
                            <Check className="w-4 h-4" /> // 대기 중일 땐 체크 아이콘
                          ) : (
                            <Trash2 className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    </div>

                    {/* Group Content (Fields Level) */}
                    {expandedGroups.has(group.id) && (
                      <div className="p-4 space-y-3 bg-white">
                        {group.fields.map((field) => (
                          <div
                            key={field.id}
                            className="pl-4 ml-4 border-l-2 border-gray-100"
                          >
                            {/* Field Header */}
                            <div className="flex items-center justify-between p-2 rounded hover:bg-gray-50">
                              <div className="flex items-center flex-1 gap-2">
                                <div
                                  className="flex items-center gap-2 cursor-pointer"
                                  onClick={() => toggleField(field.id)}
                                >
                                  {expandedFields.has(field.id) ? (
                                    <ChevronDown className="w-3 h-3 text-gray-400" />
                                  ) : (
                                    <ChevronRight className="w-3 h-3 text-gray-400" />
                                  )}
                                </div>
                                {editingFieldId === field.id ? (
                                  <div className="flex items-center flex-1 gap-2">
                                    <input
                                      type="text"
                                      value={editingFieldName}
                                      onChange={(e) =>
                                        setEditingFieldName(e.target.value)
                                      }
                                      onKeyDown={(e) => {
                                        if (e.key === "Enter") {
                                          saveFieldName(group.id, field.id);
                                        } else if (e.key === "Escape") {
                                          cancelEditField();
                                        }
                                      }}
                                      className="flex-1 px-2 py-1 text-sm font-medium text-gray-700 border border-blue-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                                      autoFocus
                                      onClick={(e) => e.stopPropagation()}
                                    />
                                    <button
                                      onClick={() =>
                                        saveFieldName(group.id, field.id)
                                      }
                                      className="p-1 text-green-600 rounded hover:bg-green-50"
                                    >
                                      <Save className="w-3 h-3" />
                                    </button>
                                    <button
                                      onClick={cancelEditField}
                                      className="p-1 text-gray-600 rounded hover:bg-gray-100"
                                    >
                                      <X className="w-3 h-3" />
                                    </button>
                                  </div>
                                ) : (
                                  <h4
                                    className="flex-1 font-medium text-gray-700 cursor-pointer"
                                    onClick={() => toggleField(field.id)}
                                  >
                                    {field.name}
                                  </h4>
                                )}
                              </div>

                              <div className="flex items-center gap-1">
                                <span className="mr-2 text-xs text-gray-500">
                                  {field.pins.length} pins
                                </span>
                                {!editingFieldId && (
                                  <>
                                    <button
                                      onClick={() => editField(field)}
                                      className="p-1 text-gray-400 transition-colors hover:text-blue-500"
                                    >
                                      <Edit3 className="w-3 h-3" />
                                    </button>
                                    <button
                                      onClick={(e) =>
                                        handleDeleteAction(e, "field", field.id)
                                      }
                                      className={`p-1 transition-all ${
                                        deletePending?.type === "field" &&
                                        deletePending?.id === field.id
                                          ? "text-red-600 scale-125"
                                          : "text-gray-400 hover:text-red-500"
                                      }`}
                                    >
                                      {deletePending?.type === "field" &&
                                      deletePending?.id === field.id ? (
                                        <Check className="w-3 h-3" />
                                      ) : (
                                        <Trash2 className="w-3 h-3" />
                                      )}
                                    </button>
                                  </>
                                )}
                              </div>
                            </div>

                            {/* Field Pins (Lowest Level) */}
                            {expandedFields.has(field.id) && (
                              <div className="mt-2 ml-4 space-y-2">
                                {field.pins.map((pin) => (
                                  <a
                                    key={pin.id}
                                    href={pin.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-between p-3 transition-shadow bg-white border border-gray-100 rounded-lg cursor-pointer hover:shadow-sm"
                                  >
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2 mb-1">
                                        <FileText className="w-4 h-4 text-gray-400" />
                                        <h5 className="font-medium text-gray-800">
                                          {pin.title}
                                        </h5>
                                      </div>
                                      <p className="mb-2 text-sm text-gray-600 line-clamp-1">
                                        {pin.description}
                                      </p>
                                      <div className="flex items-center gap-2">
                                        {pin.tags.map((tag) => (
                                          <span
                                            key={tag}
                                            className="flex items-center gap-1 px-2 py-0.5 text-[11px] text-gray-600 bg-gray-100 rounded"
                                          >
                                            <Tag className="w-2 h-2" />
                                            {tag}
                                          </span>
                                        ))}
                                      </div>
                                    </div>

                                    <div className="flex items-center gap-2 ml-4">
                                      <button
                                        onClick={(e) => {
                                          e.preventDefault();
                                          e.stopPropagation();
                                          editPin(pin.id);
                                        }}
                                        className="p-1 text-gray-400 transition-colors hover:text-blue-500"
                                      >
                                        <Edit3 className="w-3 h-3" />
                                      </button>
                                      <button
                                        onClick={(e) =>
                                          handleDeleteAction(e, "pin", pin.id)
                                        }
                                        className={`p-1 transition-all ${
                                          deletePending?.type === "pin" &&
                                          deletePending?.id === pin.id
                                            ? "text-red-600 scale-125"
                                            : "text-gray-400 hover:text-red-500"
                                        }`}
                                      >
                                        {deletePending?.type === "pin" &&
                                        deletePending?.id === pin.id ? (
                                          <Check className="w-3 h-3" />
                                        ) : (
                                          <Trash2 className="w-3 h-3" />
                                        )}
                                      </button>
                                      <ExternalLink className="w-3 h-3 text-gray-400" />
                                    </div>
                                  </a>
                                ))}
                                {field.pins.length === 0 && (
                                  <p className="py-2 text-xs italic text-center text-gray-400">
                                    No pins in this field
                                  </p>
                                )}
                              </div>
                            )}
                          </div>
                        ))}
                        {group.fields.length === 0 && (
                          <p className="py-2 text-sm text-center text-gray-500">
                            No fields in this group
                          </p>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {filteredGroups.length === 0 && (
                <div className="py-12 text-center">
                  <FileText className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <h3 className="mb-2 text-lg font-medium text-gray-800">
                    No documents found
                  </h3>
                  <p className="text-gray-600">
                    Try adjusting your filters or create a new group
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="p-6 bg-white border border-purple-100 shadow-sm rounded-xl">
              <h3 className="mb-4 font-semibold text-gray-800">Overview</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Groups</span>
                  <span className="font-medium text-gray-800">
                    {woomoonjeongData.length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Fields</span>
                  <span className="font-medium text-gray-800">
                    {getTotalFieldsCount()}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Pins</span>
                  <span className="font-medium text-gray-800">
                    {getTotalPinsCount()}
                  </span>
                </div>
              </div>
            </div>

            <div className="p-6 bg-white border border-purple-100 shadow-sm rounded-xl">
              <h3 className="mb-4 font-semibold text-gray-800">Group Types</h3>
              <div className="space-y-2">
                {[
                  "web",
                  "app",
                  "server",
                  "game",
                  "security",
                  "work",
                  "other",
                ].map((type) => (
                  <div key={type} className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span
                        className={`w-3 h-3 rounded-full ${
                          type === "web"
                            ? "bg-red-400"
                            : type === "app"
                            ? "bg-orange-400"
                            : type === "server"
                            ? "bg-yellow-400"
                            : type === "game"
                            ? "bg-green-400"
                            : type === "security"
                            ? "bg-blue-400"
                            : type === "work"
                            ? "bg-indigo-400"
                            : "bg-purple-400"
                        }`}
                      ></span>
                      <span className="text-sm text-gray-600 capitalize">
                        {type}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-gray-800">
                      {woomoonjeongData.filter((g) => g.name === type).length}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <CreateCustomFieldModal
        isOpen={isCreateFieldModalOpen}
        onClose={() => setIsCreateFieldModalOpen(false)}
        onAdd={(groupType) => {
          console.log("선택된 group type:", groupType);
          setIsCreateFieldModalOpen(false);
        }}
      />

      <CreateCustomDocumentModal
        isOpen={isCreateDocumentModalOpen}
        onClose={() => setIsCreateDocumentModalOpen(false)}
        onAdd={(documentInfo) => {
          console.log("생성된 문서 정보:", documentInfo);
          setIsCreateDocumentModalOpen(false);
        }}
      />

      {editingPin && (
        <EditDocumentModal
          isOpen={!!editingPin}
          onClose={() => setEditingPin(null)}
          pin={editingPin.pin}
          onAdd={(documentInfo) => {
            console.log("수정된 문서 정보:", documentInfo);
            setIsCreateDocumentModalOpen(false);
          }}
        />
      )}
    </div>
  );
};

export default DocumentsManagement;

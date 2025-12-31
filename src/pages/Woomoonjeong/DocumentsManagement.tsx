import React, { useState } from "react";
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
  FolderPlus,
  FileText,
} from "lucide-react";
import {
  woomoonjeongData,
  fieldTypeColors,
  Field,
  Group,
  Pin,
} from "../../data/woomoonjeong/woomoonjeongData";

const DocumentsManagement: React.FC = () => {
  const [expandedFields, setExpandedFields] = useState<Set<string>>(
    new Set(["1"])
  );
  const [expandedGroups, setExpandedGroups] = useState<Set<string>>(
    new Set(["1-1"])
  );
  const [selectedFieldType, setSelectedFieldType] = useState<
    "all" | "web" | "app" | "server" | "game" | "security" | "work" | "other"
  >("all");
  const [searchQuery, setSearchQuery] = useState("");

  const toggleField = (fieldId: string) => {
    const newExpanded = new Set(expandedFields);
    if (newExpanded.has(fieldId)) {
      newExpanded.delete(fieldId);
    } else {
      newExpanded.add(fieldId);
    }
    setExpandedFields(newExpanded);
  };

  const toggleGroup = (groupId: string) => {
    const newExpanded = new Set(expandedGroups);
    if (newExpanded.has(groupId)) {
      newExpanded.delete(groupId);
    } else {
      newExpanded.add(groupId);
    }
    setExpandedGroups(newExpanded);
  };

  const addField = () => {
    // In real app, this would open a modal or navigate to add field page
    console.log("Add new field");
  };

  const addGroup = (fieldId: string) => {
    // In real app, this would open a modal to add group
    console.log("Add group to field:", fieldId);
  };

  const addPin = (groupId: string) => {
    // In real app, this would open a modal to add pin
    console.log("Add pin to group:", groupId);
  };

  const editField = (field: Field) => {
    console.log("Edit field:", field.name);
  };

  const deleteField = (fieldId: string) => {
    if (
      confirm("이 분야를 삭제하시겠습니까? 모든 그룹과 핀이 함께 삭제됩니다.")
    ) {
      console.log("Delete field:", fieldId);
    }
  };

  const editGroup = (group: Group) => {
    console.log("Edit group:", group.name);
  };

  const deleteGroup = (groupId: string) => {
    if (confirm("이 그룹을 삭제하시겠습니까? 모든 핀이 함께 삭제됩니다.")) {
      console.log("Delete group:", groupId);
    }
  };

  const editPin = (pin: Pin) => {
    console.log("Edit pin:", pin.title);
  };

  const deletePin = (pinId: string) => {
    if (confirm("이 핀을 삭제하시겠습니까?")) {
      console.log("Delete pin:", pinId);
    }
  };

  const filteredFields = woomoonjeongData.filter((field) => {
    // Filter by field type
    if (selectedFieldType !== "all" && field.type !== selectedFieldType)
      return false;

    // Filter by search query
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      const fieldMatch =
        field.name.toLowerCase().includes(searchLower) ||
        field.description.toLowerCase().includes(searchLower);
      const groupMatch = field.groups.some(
        (group) =>
          group.name.toLowerCase().includes(searchLower) ||
          group.description.toLowerCase().includes(searchLower)
      );
      const pinMatch = field.groups.some((group) =>
        group.pins.some(
          (pin) =>
            pin.title.toLowerCase().includes(searchLower) ||
            pin.description.toLowerCase().includes(searchLower) ||
            pin.tags.some((tag) => tag.toLowerCase().includes(searchLower))
        )
      );

      if (!fieldMatch && !groupMatch && !pinMatch) return false;
    }

    return true;
  });

  const getTotalPinsCount = () => {
    return woomoonjeongData.reduce(
      (total, field) =>
        total +
        field.groups.reduce(
          (groupTotal, group) => groupTotal + group.pins.length,
          0
        ),
      0
    );
  };

  const getTotalGroupsCount = () => {
    return woomoonjeongData.reduce(
      (total, field) => total + field.groups.length,
      0
    );
  };

  return (
    <div className="p-8 bg-gray-50">
      <div className="mx-auto space-y-6 max-w-7xl">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">
              Documents Management
            </h1>
            <p className="text-gray-600">
              Organize your learning documents by fields and groups
            </p>
          </div>
          <button
            onClick={addField}
            className="px-4 py-2 bg-[#587CF0] text-white rounded-lg font-medium hover:bg-[#4a6de8] transition-colors flex items-center gap-2"
          >
            <Plus className="w-4 h-4" />
            Add Field
          </button>
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
                    Field Type:
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
                      onClick={() => setSelectedFieldType(type)}
                      className={`px-3 py-1 text-sm rounded-lg transition-colors ${
                        selectedFieldType === type
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
                    className="px-3 py-1 border border-gray-200 rounded-lg focus:ring-2 focus:ring-[#587CF0] focus:border-transparent"
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
                {filteredFields.map((field) => (
                  <div
                    key={field.id}
                    className="overflow-hidden border border-gray-200 rounded-lg"
                  >
                    {/* Field Header */}
                    <div className="flex items-center justify-between p-4 transition-colors bg-gray-50 hover:bg-gray-100">
                      <div
                        className="flex items-center flex-1 gap-3 cursor-pointer"
                        onClick={() => toggleField(field.id)}
                      >
                        {expandedFields.has(field.id) ? (
                          <ChevronDown className="w-4 h-4 text-gray-500" />
                        ) : (
                          <ChevronRight className="w-4 h-4 text-gray-500" />
                        )}
                        <div className="flex items-center gap-3">
                          <span
                            className={`px-3 py-1 text-sm rounded-full border ${
                              fieldTypeColors[field.type]
                            }`}
                          >
                            {field.type}
                          </span>
                          <h3 className="font-medium text-gray-800">
                            {field.name}
                          </h3>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <span className="text-sm text-gray-500">
                          {field.groups.reduce(
                            (total, group) => total + group.pins.length,
                            0
                          )}{" "}
                          pins
                        </span>
                        <button
                          onClick={() => addGroup(field.id)}
                          className="p-1 text-gray-400 transition-colors hover:text-blue-500"
                          title="Add Group"
                        >
                          <FolderPlus className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => editField(field)}
                          className="p-1 text-gray-400 transition-colors hover:text-blue-500"
                          title="Edit Field"
                        >
                          <Edit3 className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => deleteField(field.id)}
                          className="p-1 text-gray-400 transition-colors hover:text-red-500"
                          title="Delete Field"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>

                    {/* Field Content */}
                    {expandedFields.has(field.id) && (
                      <div className="p-4 space-y-3">
                        {field.groups.map((group) => (
                          <div
                            key={group.id}
                            className="pl-4 ml-4 border-l-2 border-gray-200"
                          >
                            {/* Group Header */}
                            <div className="flex items-center justify-between p-2 rounded hover:bg-gray-50">
                              <div
                                className="flex items-center flex-1 gap-2 cursor-pointer"
                                onClick={() => toggleGroup(group.id)}
                              >
                                {expandedGroups.has(group.id) ? (
                                  <ChevronDown className="w-3 h-3 text-gray-400" />
                                ) : (
                                  <ChevronRight className="w-3 h-3 text-gray-400" />
                                )}
                                <h4 className="font-medium text-gray-700">
                                  {group.name}
                                </h4>
                              </div>

                              <div className="flex items-center gap-1">
                                <span className="text-xs text-gray-500">
                                  {group.pins.length} pins
                                </span>
                                <button
                                  onClick={() => addPin(group.id)}
                                  className="p-1 text-gray-400 transition-colors hover:text-blue-500"
                                  title="Add Pin"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                                <button
                                  onClick={() => editGroup(group)}
                                  className="p-1 text-gray-400 transition-colors hover:text-blue-500"
                                  title="Edit Group"
                                >
                                  <Edit3 className="w-3 h-3" />
                                </button>
                                <button
                                  onClick={() => deleteGroup(group.id)}
                                  className="p-1 text-gray-400 transition-colors hover:text-red-500"
                                  title="Delete Group"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </div>
                            </div>

                            {/* Group Pins */}
                            {expandedGroups.has(group.id) && (
                              <div className="mt-2 ml-4 space-y-2">
                                {group.pins.map((pin) => (
                                  <div
                                    key={pin.id}
                                    className="flex items-center justify-between p-3 transition-shadow bg-white border border-gray-100 rounded-lg hover:shadow-sm"
                                  >
                                    <div className="flex-1">
                                      <div className="flex items-center gap-2 mb-1">
                                        <FileText className="w-4 h-4 text-gray-400" />
                                        <h5 className="font-medium text-gray-800">
                                          {pin.title}
                                        </h5>
                                      </div>
                                      <p className="mb-2 text-sm text-gray-600">
                                        {pin.description}
                                      </p>
                                      <div className="flex items-center gap-2">
                                        {pin.tags.map((tag) => (
                                          <span
                                            key={tag}
                                            className="flex items-center gap-1 px-2 py-1 text-xs text-gray-600 bg-gray-100 rounded"
                                          >
                                            <Tag className="w-2 h-2" />
                                            {tag}
                                          </span>
                                        ))}
                                      </div>
                                    </div>

                                    <div className="flex items-center gap-1 ml-4">
                                      <button
                                        onClick={() => editPin(pin)}
                                        className="p-1 text-gray-400 transition-colors hover:text-blue-500"
                                        title="Edit Pin"
                                      >
                                        <Edit3 className="w-3 h-3" />
                                      </button>
                                      <button
                                        onClick={() => deletePin(pin.id)}
                                        className="p-1 text-gray-400 transition-colors hover:text-red-500"
                                        title="Delete Pin"
                                      >
                                        <Trash2 className="w-3 h-3" />
                                      </button>
                                      <a
                                        href={pin.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="p-1 text-gray-400 hover:text-[#587CF0] transition-colors"
                                        title="Open Link"
                                      >
                                        <ExternalLink className="w-3 h-3" />
                                      </a>
                                    </div>
                                  </div>
                                ))}

                                {group.pins.length === 0 && (
                                  <div className="py-6 text-center text-gray-500">
                                    <FileText className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                                    <p className="text-sm">
                                      No pins in this group
                                    </p>
                                    <button
                                      onClick={() => addPin(group.id)}
                                      className="text-xs text-[#587CF0] hover:underline mt-1"
                                    >
                                      Add your first pin
                                    </button>
                                  </div>
                                )}
                              </div>
                            )}
                          </div>
                        ))}

                        {field.groups.length === 0 && (
                          <div className="py-6 text-center text-gray-500">
                            <FolderPlus className="w-8 h-8 mx-auto mb-2 text-gray-300" />
                            <p className="text-sm">No groups in this field</p>
                            <button
                              onClick={() => addGroup(field.id)}
                              className="text-xs text-[#587CF0] hover:underline mt-1"
                            >
                              Add your first group
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {filteredFields.length === 0 && (
                <div className="py-12 text-center">
                  <FileText className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <h3 className="mb-2 text-lg font-medium text-gray-800">
                    No documents found
                  </h3>
                  <p className="text-gray-600">
                    Try adjusting your filters or create a new field
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Quick Stats */}
            <div className="p-6 bg-white border border-purple-100 shadow-sm rounded-xl">
              <h3 className="mb-4 font-semibold text-gray-800">Overview</h3>
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Fields</span>
                  <span className="font-medium text-gray-800">
                    {woomoonjeongData.length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">Total Groups</span>
                  <span className="font-medium text-gray-800">
                    {getTotalGroupsCount()}
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

            {/* Field Types */}
            <div className="p-6 bg-white border border-purple-100 shadow-sm rounded-xl">
              <h3 className="mb-4 font-semibold text-gray-800">Field Types</h3>
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
                      {woomoonjeongData.filter((f) => f.type === type).length}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocumentsManagement;

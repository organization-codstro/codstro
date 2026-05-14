import React, { useState } from "react";
import {
  ChevronDown,
  ChevronRight,
  Save,
  X,
  Edit3,
  Trash2,
  Check,
} from "lucide-react";
import { PinItem } from "./PinItem";
import { FieldItemProps } from "../../../types/pages/Woomoonjeong/DocumentsManagementPage/FieldItem";

export const FieldItem: React.FC<FieldItemProps> = ({
  field,
  group,
  isExpanded,
  onToggle,
  onSaveName,
  onDeleteAction,
  deletePending,
  onEditPin,
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [tempName, setTempName] = useState(field.field_name);

  const handleSave = () => {
    onSaveName(group.group_id, field.field_id, tempName);
    setIsEditing(false);
  };

  return (
    <div className="pl-4 ml-4 border-l-2 border-gray-100">
      <div className="flex items-center justify-between p-2 rounded hover:bg-gray-50">
        <div className="flex items-center flex-1 gap-2">
          <div
            className="cursor-pointer"
            onClick={(e) => {
              e.stopPropagation();
              onToggle();
            }}
          >
            {isExpanded ? (
              <ChevronDown className="w-3 h-3 text-gray-400" />
            ) : (
              <ChevronRight className="w-3 h-3 text-gray-400" />
            )}
          </div>
          {isEditing ? (
            <div className="flex items-center flex-1 gap-2">
              <input
                value={tempName}
                onChange={(e) => setTempName(e.target.value)}
                className="flex-1 px-2 py-1 text-sm border border-blue-300 rounded outline-none"
                autoFocus
              />
              <button onClick={handleSave} className="text-green-600">
                <Save className="w-3 h-3" />
              </button>
              <button onClick={() => setIsEditing(false)}>
                <X className="w-3 h-3" />
              </button>
            </div>
          ) : (
            <h4
              className="flex-1 font-medium text-gray-700 cursor-pointer"
              onClick={(e) => {
                e.stopPropagation();
                onToggle();
              }}
            >
              {field.field_name}
            </h4>
          )}
        </div>
        <div className="flex items-center gap-1">
          <span className="mr-2 text-xs text-gray-500">
            {field.pins.length} pins
          </span>
          {!isEditing && (
            <>
              <button
                onClick={() => setIsEditing(true)}
                className="text-gray-400 hover:text-blue-500"
              >
                <Edit3 className="w-3 h-3" />
              </button>
              <button
                onClick={(e) => onDeleteAction(e, "field", field.field_id)}
                className={`p-1 ${
                  deletePending?.type === "field" &&
                  deletePending?.id === field.field_id
                    ? "text-red-600"
                    : "text-gray-400"
                }`}
              >
                {deletePending?.type === "field" &&
                deletePending?.id === field.field_id ? (
                  <Check className="w-3 h-3" />
                ) : (
                  <Trash2 className="w-3 h-3" />
                )}
              </button>
            </>
          )}
        </div>
      </div>
      {isExpanded && (
        <div className="mt-2 ml-4 space-y-2">
          {field.pins.map((pin) => (
            <PinItem
              key={pin.created_at}
              pin={pin}
              isDeletePending={
                deletePending?.type === "pin" &&
                deletePending?.id === pin.pin_id
              }
              onEdit={(e) => {
                e.preventDefault();
                onEditPin(pin.pin_id);
              }}
              onDelete={(e) => onDeleteAction(e, "pin", pin.pin_id)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

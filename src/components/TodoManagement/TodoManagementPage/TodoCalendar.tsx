import React from "react";
import {
  Calendar as CalendarIcon,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { TodoCalendarProps } from "../../../types/pages/TodoManagement/TodoManagementPage/TodoCalendar";

export const TodoCalendar: React.FC<TodoCalendarProps> = ({
  calendarDate,
  selectedDate,
  onNavigate,
  onSelectDate,
  getTodoCount,
  formatDate,
}) => {
  const renderDays = () => {
    const daysInMonth = new Date(
      calendarDate.getFullYear(),
      calendarDate.getMonth() + 1,
      0,
    ).getDate();
    const firstDay = new Date(
      calendarDate.getFullYear(),
      calendarDate.getMonth(),
      1,
    ).getDay();
    const days = [];

    for (let i = 0; i < firstDay; i++) {
      days.push(<div key={`empty-${i}`} className="h-8" />);
    }

    for (let day = 1; day <= daysInMonth; day++) {
      const date = new Date(
        calendarDate.getFullYear(),
        calendarDate.getMonth(),
        day,
      );
      const isSelected = formatDate(date) === selectedDate;
      const isToday = formatDate(date) === formatDate(new Date());
      const count = getTodoCount(formatDate(date));

      days.push(
        <div
          key={day}
          onClick={() => onSelectDate(formatDate(date))}
          className={`h-8 w-8 flex items-center justify-center text-sm cursor-pointer rounded-lg relative
          ${
            isSelected
              ? "bg-[#587CF0] text-white"
              : isToday
                ? "bg-blue-100 text-blue-700"
                : "hover:bg-gray-100"
          }`}
        >
          {day}
          {count > 0 && (
            <div
              className={`absolute -top-1 -right-1 w-4 h-4 rounded-full text-[10px] flex items-center justify-center
              ${
                isSelected ? "bg-white text-[#587CF0]" : "bg-red-500 text-white"
              }`}
            >
              {count}
            </div>
          )}
        </div>,
      );
    }
    return days;
  };

  return (
    <div className="p-6 bg-white border border-purple-100 rounded-xl">
      <div className="flex items-center justify-between mb-4">
        <h3 className="flex items-center gap-2 font-semibold text-gray-800">
          <CalendarIcon className="w-4 h-4 text-[#587CF0]" /> Calendar
        </h3>
        <div className="flex items-center gap-2">
          <button onClick={() => onNavigate("prev")}>
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="w-24 text-sm font-medium text-center">
            {calendarDate.toLocaleDateString("en-US", {
              month: "short",
              year: "numeric",
            })}
          </span>
          <button onClick={() => onNavigate("next")}>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
      <div className="grid grid-cols-7 gap-1 mb-2 text-xs font-medium text-center text-gray-500">
        {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((d) => (
          <div key={d}>{d}</div>
        ))}
      </div>
      <div className="grid grid-cols-7 gap-1">{renderDays()}</div>
    </div>
  );
};

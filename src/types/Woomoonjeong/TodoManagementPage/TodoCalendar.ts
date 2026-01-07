export interface TodoCalendarProps {
  calendarDate: Date;
  selectedDate: Date;
  onNavigate: (direction: "prev" | "next") => void;
  onSelectDate: (date: Date) => void;
  getTodoCount: (date: Date) => number;
}

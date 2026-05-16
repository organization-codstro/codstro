export interface TodoCalendarProps {
  calendarDate: Date;
  selectedDate: string;
  onNavigate: (direction: "prev" | "next") => void;
  onSelectDate: (date: string) => void;
  getTodoCount: (date: string) => number;
  formatDate: (date: Date) => string;
}

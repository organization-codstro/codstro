// MajorEncyclopediaPage 페이지 아이콘 매핑 테이블 (예시: 실제 경로에 맞게 수정 필요)
import { Cpu, Code, Palette, BarChart, Settings } from "lucide-react"; // 또는 기존에 사용하던 아이콘 라이브러리

export const ICON_MAP: Record<string, any> = {
  컴퓨터공학: <Cpu />,
  소프트웨어: <Code />,
  디자인: <Palette />,
  경영학: <BarChart />,
  기계공학: <Settings />,
};

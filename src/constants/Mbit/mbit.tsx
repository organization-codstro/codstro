//MBTI 타입별 아이콘 및 컬러 매핑 테이블
import { Users, Terminal, Layout } from "lucide-react";

export const MBTI_THEME: Record<string, { icon: any; color: string }> = {
  PASD: {
    icon: <Terminal className="w-6 h-6 text-white" />,
    color: "from-blue-500 to-indigo-600",
  },
  IETH: {
    icon: <Layout className="w-6 h-6 text-white" />,
    color: "from-purple-500 to-pink-600",
  },
  // ... 나머지 14개 타입도 동일한 방식으로 추가 가능
  DEFAULT: {
    icon: <Users className="w-6 h-6 text-white" />,
    color: "from-gray-400 to-gray-600",
  },
};

// MajorEncyclopediaPage 페이지 아이콘 매핑 테이블
import { Cpu, Code, Palette, BarChart, Settings } from "lucide-react";

export const ICON_MAP: Record<string, any> = {
  컴퓨터공학: <Cpu />,
  소프트웨어: <Code />,
  디자인: <Palette />,
  경영학: <BarChart />,
  기계공학: <Settings />,
};

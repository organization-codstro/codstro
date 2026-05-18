//MBTI 타입별 아이콘 및 컬러 매핑 테이블
import React from "react";
import { Users, Terminal, Layout } from "lucide-react";
import { Cpu, Code, Palette, BarChart, Settings } from "lucide-react";

export const MBTI_THEME: Record<
  string,
  { icon: React.ReactElement; color: string }
> = {
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
export const ICON_MAP: Record<string, React.ReactElement> = {
  컴퓨터공학: <Cpu />,
  소프트웨어: <Code />,
  디자인: <Palette />,
  경영학: <BarChart />,
  기계공학: <Settings />,
};

//mbit 축
export const AXIS_LABELS: Record<
  string,
  { name: string; a: string; b: string }
> = {
  "E/P": { name: "개발 참여", a: "주도형", b: "참여형" },
  "C/R": { name: "리스크 태도", a: "도전형", b: "안정형" },
  "L/V": { name: "사고 방식", a: "논리형", b: "직관형" },
  "B/A": { name: "개발 접근", a: "실행형", b: "설계형" },
};

//검사 문항
export const LABELS: Record<number, string> = {
  5: "매우 그렇다",
  4: "그렇다",
  3: "보통이다",
  2: "아니다",
  1: "매우 아니다",
};

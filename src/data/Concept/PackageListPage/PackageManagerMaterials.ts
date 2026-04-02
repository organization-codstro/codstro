import { PackageManagerMaterial } from "../../../types/pages/Concept/PackageDetailPage/PackageManagerMaterials";

export const packageManagerMaterials: PackageManagerMaterial[] = [
  {
    id: "npm-guide",
    name: "NPM (Node Package Manager) ",
    description:
      "Node.js의 기본 패키지 매니저인 NPM의 사용법 및 Best Practices",
    content: `# NPM 가이드

## NPM이란?
NPM은 Node Package Manager의 약자로, JavaScript 패키지를 관리하는 기본 도구입니다.

## 주요 기능
- 패키지 설치 및 관리
- 버전 관리
- 스크립트 실행

## 자주 사용하는 명령어
- \`npm install\` - 패키지 설치
- \`npm update\` - 패키지 업데이트
- \`npm uninstall\` - 패키지 제거`,
    category: ["패키지 매니저", "JavaScript", "Node.js"],
    documentUrl: "https://docs.npmjs.com/",
    representativeImageUrl:
      "https://static.npmjs.com/338e4905a2684ca96e08c7780fc68412.png",
    imageUrls: [
      "https://static.npmjs.com/338e4905a2684ca96e08c7780fc68412.png",
    ],
    isUnderstood: false,
    relatedMaterials: ["yarn-guide", "pnpm-guide"],
  },
  {
    id: "yarn-guide",
    name: "Yarn",
    description: "Facebook에서 개발한 고성능 패키지 매니저 Yarn의 사용법",
    content: `# Yarn 패키지 매니저

## Yarn의 특징
- 빠른 설치 속도
- 안정적인 의존성 관리
- 오프라인 모드 지원

## NPM과의 차이점
Yarn은 더 빠르고 안정적인 패키지 관리 경험을 제공합니다.`,
    category: ["패키지 매니저", "JavaScript"],
    documentUrl: "https://yarnpkg.com/",
    representativeImageUrl: "https://yarnpkg.com/assets/yarn-kitten-full.png",
    imageUrls: ["https://yarnpkg.com/assets/yarn-kitten-full.png"],
    isUnderstood: false,
    relatedMaterials: ["npm-guide"],
  },
  {
    id: "pnpm-guide",
    name: "PNPM",
    description:
      "performant npm - 디스크 공간을 효율적으로 사용하는 패키지 매니저",
    content: `# PNPM 가이드

## PNPM의 장점
- 디스크 공간 절약
- 빠른 설치 속도
- Mono-repo 지원

## 설치 방법
\`npm install -g pnpm\``,
    category: ["패키지 매니저", "JavaScript", "고급"],
    documentUrl: "https://pnpm.io/",
    representativeImageUrl: "https://pnpm.io/img/pnpm-no-background.png",
    imageUrls: ["https://pnpm.io/img/pnpm-no-background.png"],
    isUnderstood: false,
    relatedMaterials: ["npm-guide", "yarn-guide"],
  },
];

export const packageManagerMaterial = packageManagerMaterials[0];

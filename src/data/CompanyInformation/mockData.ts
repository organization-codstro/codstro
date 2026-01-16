import {
  Company,
  CompanyMatch,
  CompanyQna,
  CompanyUserQna,
  CompanyUserMatchRecord,
} from "../../types/pages/CompanyInformation/company";

export const mockCompanies: Company[] = [
  {
    company_id: "1",
    company_name: "TechFlow Inc.",
    company_industry: "Web Development & Cloud Services",
    company_description:
      "Leading provider of cloud-based solutions for modern web applications.",
    company_website: "https://techflow.example.com",
    company_values: "Innovation, Collaboration, Growth",
    company_created_at: "2024-01-15",
    company_update_at: "2024-12-20",
  },
  {
    company_id: "2",
    company_name: "DataStream Labs",
    company_industry: "Data Analytics & AI",
    company_description:
      "Specializing in big data analytics and machine learning solutions.",
    company_website: "https://datastream.example.com",
    company_values: "Data-Driven, Excellence, Integrity",
    company_created_at: "2024-02-20",
    company_update_at: "2024-12-18",
  },
  {
    company_id: "3",
    company_name: "CodeCraft Studios",
    company_industry: "Mobile App Development",
    company_description:
      "Creating beautiful and functional mobile applications for iOS and Android.",
    company_website: "https://codecraft.example.com",
    company_values: "Quality, User-Centric, Innovation",
    company_created_at: "2024-03-10",
    company_update_at: "2024-12-22",
  },
  {
    company_id: "4",
    company_name: "CloudBase Solutions",
    company_industry: "DevOps & Infrastructure",
    company_description:
      "Providing enterprise-grade DevOps tools and infrastructure solutions.",
    company_website: "https://cloudbase.example.com",
    company_values: "Reliability, Automation, Security",
    company_created_at: "2024-04-05",
    company_update_at: "2024-12-19",
  },
  {
    company_id: "5",
    company_name: "PixelWave Design",
    company_industry: "UI/UX & Frontend Development",
    company_description:
      "Expert team focused on creating stunning user interfaces and experiences.",
    company_website: "https://pixelwave.example.com",
    company_values: "Creativity, Attention to Detail, Empathy",
    company_created_at: "2024-05-12",
    company_update_at: "2024-12-21",
  },
];

export const mockMatches: Record<string, CompanyMatch> = {
  "1": {
    company_user_matche_id: "1",
    match_rate: 87.5,
    company_user_matche_suggestions:
      "# Areas for Improvement\n\n1. **Cloud Architecture**: Consider obtaining AWS Solutions Architect certification\n2. **Microservices**: Gain more hands-on experience with containerization (Docker/Kubernetes)\n3. **System Design**: Practice designing scalable distributed systems",
    company_user_matche_reason:
      "# Match Analysis\n\n## Strengths\n\n- **Strong Frontend Skills**: Your React and TypeScript experience aligns perfectly with their tech stack\n- **Problem-Solving**: Your algorithmic thinking matches their development approach\n- **Team Collaboration**: Your communication skills fit their collaborative culture\n\n## Good Fits\n\n- Modern web development practices\n- Agile methodology experience\n- Continuous learning mindset\n\n## Areas to Develop\n\n- Backend architecture knowledge\n- Cloud platform experience\n- Large-scale system design",
    company_user_matche_created_date: "2024-12-23",
    company_id: "1",
    user_id: "1",
  },
  "2": {
    company_user_matche_id: "2",
    match_rate: 72.3,
    company_user_matche_suggestions:
      "# Areas for Improvement\n\n1. **Data Science**: Strengthen Python skills, especially pandas and numpy\n2. **Machine Learning**: Study ML fundamentals and popular frameworks (TensorFlow, PyTorch)\n3. **Statistics**: Enhance statistical analysis capabilities",
    company_user_matche_reason:
      "# Match Analysis\n\n## Strengths\n\n- **Analytical Thinking**: Your problem-solving approach suits data-oriented work\n- **Programming Foundation**: Solid coding fundamentals\n- **Quick Learner**: Demonstrated ability to pick up new technologies\n\n## Good Fits\n\n- Logical reasoning skills\n- Interest in technology trends\n- Self-motivated learning\n\n## Areas to Develop\n\n- Data science fundamentals\n- Python ecosystem proficiency\n- Statistical knowledge",
    company_user_matche_created_date: "2024-12-23",
    company_id: "2",
    user_id: "1",
  },
  "3": {
    company_user_matche_id: "3",
    match_rate: 91.2,
    company_user_matche_suggestions:
      "# Areas for Improvement\n\n1. **iOS Development**: Gain experience with Swift and SwiftUI\n2. **Cross-Platform**: Explore React Native or Flutter\n3. **Mobile Design**: Study mobile-specific UX patterns",
    company_user_matche_reason:
      "# Match Analysis\n\n## Strengths\n\n- **Modern Frontend**: Excellent React skills translate well to React Native\n- **UI Sensitivity**: Strong design sense for user interfaces\n- **Component Architecture**: Understanding of modular development\n\n## Good Fits\n\n- Component-based thinking\n- User-focused development\n- Clean code practices\n\n## Areas to Develop\n\n- Mobile platform specifics\n- Native development experience\n- Mobile performance optimization",
    company_user_matche_created_date: "2024-12-23",
    company_id: "3",
    user_id: "1",
  },
  "4": {
    company_user_matche_id: "4",
    match_rate: 65.8,
    company_user_matche_suggestions:
      "# Areas for Improvement\n\n1. **DevOps Tools**: Learn CI/CD pipelines (Jenkins, GitHub Actions)\n2. **Infrastructure as Code**: Study Terraform or CloudFormation\n3. **Container Orchestration**: Gain Kubernetes expertise",
    company_user_matche_reason:
      "# Match Analysis\n\n## Strengths\n\n- **Version Control**: Solid Git experience\n- **Problem Solving**: Good debugging skills\n- **Learning Attitude**: Willingness to explore infrastructure\n\n## Good Fits\n\n- Technical curiosity\n- Systematic thinking\n- Tool familiarity\n\n## Areas to Develop\n\n- DevOps methodology\n- Cloud infrastructure knowledge\n- Automation skills",
    company_user_matche_created_date: "2024-12-23",
    company_id: "4",
    user_id: "1",
  },
  "5": {
    company_user_matche_id: "5",
    match_rate: 94.7,
    company_user_matche_suggestions:
      "# Areas for Improvement\n\n1. **Design Tools**: Practice with Figma and Adobe Creative Suite\n2. **Animation**: Learn CSS animations and GSAP\n3. **Accessibility**: Deepen knowledge of WCAG guidelines",
    company_user_matche_reason:
      "# Match Analysis\n\n## Strengths\n\n- **Frontend Mastery**: Exceptional skills in modern frontend development\n- **Design Eye**: Natural sense for aesthetics and UX\n- **Attention to Detail**: Careful implementation of UI components\n\n## Good Fits\n\n- Perfect tech stack alignment\n- Strong visual design sense\n- User empathy\n\n## Areas to Develop\n\n- Professional design tools\n- Advanced animations\n- Accessibility best practices",
    company_user_matche_created_date: "2024-12-23",
    company_id: "5",
    user_id: "1",
  },
};

export const mockQnas: Record<string, CompanyQna[]> = {
  "1": [
    {
      company_qna_id: " 1-1",
      company_qna_question:
        "Describe a challenging technical problem you solved and how you approached it.",
      company_qna_answer: null,
      company_qna_question_reason:
        "Tests problem-solving ability and technical depth",
      company_qna_created_date: "2024-12-23",
      company_id: "1",
    },
    {
      company_qna_id: "1-2",
      company_qna_question:
        "How do you ensure code quality and maintainability in your projects?",
      company_qna_answer: null,
      company_qna_question_reason:
        "Evaluates best practices and code standards awareness",
      company_qna_created_date: "2024-12-23",
      company_id: "1",
    },
    {
      company_qna_id: "1-3",
      company_qna_question:
        "Tell me about a time you worked effectively in a team to deliver a project.",
      company_qna_answer: null,
      company_qna_question_reason:
        "Assesses collaboration and communication skills",
      company_qna_created_date: "2024-12-23",
      company_id: "1",
    },
  ],
  "2": [
    {
      company_qna_id: "2-1",
      company_qna_question:
        "Explain how you would approach analyzing a large dataset to extract meaningful insights.",
      company_qna_answer: null,
      company_qna_question_reason:
        "Tests analytical thinking and data methodology",
      company_qna_created_date: "2024-12-23",
      company_id: "2",
    },
    {
      company_qna_id: "2-2",
      company_qna_question:
        "What is your experience with machine learning algorithms and when would you use them?",
      company_qna_answer: null,
      company_qna_question_reason:
        "Evaluates ML knowledge and practical application",
      company_qna_created_date: "2024-12-23",
      company_id: "2",
    },
    {
      company_qna_id: "2-3",
      company_qna_question:
        "How do you stay updated with the latest trends in data science and AI?",
      company_qna_answer: null,
      company_qna_question_reason:
        "Assesses continuous learning and industry awareness",
      company_qna_created_date: "2024-12-23",
      company_id: "2",
    },
  ],
  "3": [
    {
      company_qna_id: "3-1",
      company_qna_question:
        "What considerations do you take into account when designing a mobile user interface?",
      company_qna_answer: null,
      company_qna_question_reason: "Tests mobile-specific design understanding",
      company_qna_created_date: "2024-12-23",
      company_id: "3",
    },
    {
      company_qna_id: "3-2",
      company_qna_question:
        "Describe your experience with mobile app performance optimization.",
      company_qna_answer: null,
      company_qna_question_reason:
        "Evaluates technical mobile development skills",
      company_qna_created_date: "2024-12-23",
      company_id: "3",
    },
    {
      company_qna_id: "3-3",
      company_qna_question:
        "How do you handle different screen sizes and device capabilities in your apps?",
      company_qna_answer: null,
      company_qna_question_reason:
        "Assesses responsive design and platform awareness",
      company_qna_created_date: "2024-12-23",
      company_id: "3",
    },
  ],
  "4": [
    {
      company_qna_id: "4-1",
      company_qna_question:
        "Explain your understanding of CI/CD and how you would implement it.",
      company_qna_answer: null,
      company_qna_question_reason: "Tests DevOps fundamentals knowledge",
      company_qna_created_date: "2024-12-23",
      company_id: "4",
    },
    {
      company_qna_id: "4-2",
      company_qna_question:
        "How would you approach migrating a monolithic application to microservices?",
      company_qna_answer: null,
      company_qna_question_reason:
        "Evaluates system architecture understanding",
      company_qna_created_date: "2024-12-23",
      company_id: "4",
    },
    {
      company_qna_id: "4-3",
      company_qna_question:
        "What strategies do you use to ensure high availability and disaster recovery?",
      company_qna_answer: null,
      company_qna_question_reason:
        "Assesses infrastructure reliability knowledge",
      company_qna_created_date: "2024-12-23",
      company_id: "4",
    },
  ],
  "5": [
    {
      company_qna_id: "5-1",
      company_qna_question:
        "Walk me through your process for turning a design mockup into production code.",
      company_qna_answer: null,
      company_qna_question_reason:
        "Tests design-to-code workflow understanding",
      company_qna_created_date: "2024-12-23",
      company_id: "5",
    },
    {
      company_qna_id: "5-2",
      company_qna_question:
        "How do you balance aesthetic design with performance and accessibility?",
      company_qna_answer: null,
      company_qna_question_reason: "Evaluates holistic frontend thinking",
      company_qna_created_date: "2024-12-23",
      company_id: "5",
    },
    {
      company_qna_id: "5-3",
      company_qna_question:
        "Describe a time when you received critical feedback on your design and how you handled it.",
      company_qna_answer: null,
      company_qna_question_reason: "Assesses collaboration and growth mindset",
      company_qna_created_date: "2024-12-23",
      company_id: "5",
    },
  ],
};

export const mockBookmarkedCompanyIds = ["1", "3", "5"];

export const mockUserInterviews: CompanyUserQna[] = [
  {
    id: "1",
    user_id: "1",
    company_user_qna_answer:
      "I solved a performance bottleneck in our React application by implementing lazy loading and code splitting, which reduced the initial bundle size by 40%.",
    company_qna_question:
      "Describe a challenging technical problem you solved and how you approached it.",
    company_user_qna_evaluation:
      "매우 구체적이고 실무 경험이 드러나는 답변입니다. STAR 기법을 잘 활용했습니다.",
    company_user_qna_create_date: "2024-12-20",
    company_qna_id: "1",
  },
  {
    id: "2",
    user_id: "1",
    company_user_qna_answer:
      "I ensure code quality through code reviews, unit tests, and following SOLID principles. I also use ESLint and TypeScript for type safety.",
    company_qna_question:
      "How do you ensure code quality and maintainability in your projects?",
    company_user_qna_evaluation:
      "좋은 답변입니다. 더 구체적인 프로젝트 예시를 추가하면 더 좋을 것 같습니다.",
    company_user_qna_create_date: "2024-12-20",
    company_qna_id: "2",
  },
  {
    id: "3",
    user_id: "1",
    company_user_qna_answer:
      "In my previous project, I worked with a team to deliver a mobile app. I communicated regularly with the backend team and participated in daily standups.",
    company_qna_question:
      "Tell me about a time you worked effectively in a team to deliver a project.",
    company_user_qna_evaluation: "팀 작업 경험이 잘 드러났습니다.",
    company_user_qna_create_date: "2024-12-19",
    company_qna_id: "3",
  },
  {
    id: "4",
    user_id: "1",
    company_user_qna_answer:
      "I would start by understanding the data structure and creating visualizations to identify patterns and outliers.",
    company_qna_question:
      "Explain how you would approach analyzing a large dataset to extract meaningful insights.",
    company_user_qna_evaluation: "접근 방식이 체계적입니다.",
    company_user_qna_create_date: "2024-12-18",
    company_qna_id: "4",
  },
  {
    id: "5",
    user_id: "1",
    company_user_qna_answer:
      "I have experience with basic machine learning concepts and have used scikit-learn for classification tasks in university projects.",
    company_qna_question:
      "What is your experience with machine learning algorithms and when would you use them?",
    company_user_qna_evaluation:
      "기초 지식은 있으나 더 깊이 있는 경험이 필요합니다.",
    company_user_qna_create_date: "2024-12-17",
    company_qna_id: "5",
  },
];

export const mockUserMatchingHistory: CompanyUserMatchRecord[] = [
  {
    company_user_matche_id: "1",
    company_user_matche_name: "TechFlow Inc. - 2024-12-23",
    match_rate: 87.5,
    company_user_matche_suggestions:
      "# Areas for Improvement\n\n1. **Cloud Architecture**: Consider obtaining AWS Solutions Architect certification",
    company_user_matche_reason:
      "# Match Analysis\n\n## Strengths\n\n- Strong Frontend Skills",
    company_user_matche_created_date: "2024-12-23",
    company_id: "1",
    user_id: "1",
  },
  {
    company_user_matche_id: "2",
    company_user_matche_name: "PixelWave Design - 2024-12-22",
    match_rate: 94.7,
    company_user_matche_suggestions:
      "# Areas for Improvement\n\n1. **Design Tools**: Practice with Figma",
    company_user_matche_reason:
      "# Match Analysis\n\n## Strengths\n\n- Frontend Mastery",
    company_user_matche_created_date: "2024-12-22",
    company_id: "5",
    user_id: "1",
  },
  {
    company_user_matche_id: "3",
    company_user_matche_name: "CodeCraft Studios - 2024-12-21",
    match_rate: 91.2,
    company_user_matche_suggestions:
      "# Areas for Improvement\n\n1. **iOS Development**: Gain experience with Swift",
    company_user_matche_reason:
      "# Match Analysis\n\n## Strengths\n\n- Modern Frontend",
    company_user_matche_created_date: "2024-12-21",
    company_id: "3",
    user_id: "1",
  },
  {
    company_user_matche_id: "4",
    company_user_matche_name: "DataStream Labs - 2024-12-20",
    match_rate: 72.3,
    company_user_matche_suggestions:
      "# Areas for Improvement\n\n1. **Data Science**: Strengthen Python skills",
    company_user_matche_reason:
      "# Match Analysis\n\n## Strengths\n\n- Analytical Thinking",
    company_user_matche_created_date: "2024-12-20",
    company_id: "2",
    user_id: "1",
  },
  {
    company_user_matche_id: "5",
    company_user_matche_name: "CloudBase Solutions - 2024-12-19",
    match_rate: 65.8,
    company_user_matche_suggestions:
      "# Areas for Improvement\n\n1. **DevOps Tools**: Learn CI/CD pipelines",
    company_user_matche_reason:
      "# Match Analysis\n\n## Strengths\n\n- Version Control",
    company_user_matche_created_date: "2024-12-19",
    company_id: "4",
    user_id: "1",
  },
];

// AI 피드백 생성 로직 (분리 가능)
export const generateMockFeedback = (userAnswer: string) => {
  return `# 답변 분석\n\n## 강점\n- **구체성**: ${
    userAnswer.length > 100 ? "충분히 상세한" : "간단하지만 명확한"
  } 답변입니다.`;
};

export const tools = [
  {
    id: "1",
    name: "VS Code",
    category: "IDE",
    tags: ["Editor", "Microsoft", "Extensions"],
    description: "Free, open-source code editor with powerful features",
  },
  {
    id: "2",
    name: "Git",
    category: "Version Control",
    tags: ["VCS", "Collaboration", "GitHub"],
    description: "Distributed version control system",
  },
  {
    id: "3",
    name: "Docker",
    category: "Containerization",
    tags: ["Container", "DevOps", "Deployment"],
    description: "Platform for developing, shipping, and running applications",
  },
  {
    id: "4",
    name: "Postman",
    category: "API Testing",
    tags: ["API", "Testing", "Development"],
    description: "API development and testing platform",
  },
  {
    id: "5",
    name: "IntelliJ IDEA",
    category: "IDE",
    tags: ["Java", "JetBrains", "Enterprise"],
    description: "Integrated development environment for Java",
  },
  {
    id: "6",
    name: "npm",
    category: "Package Manager",
    tags: ["JavaScript", "Dependencies", "Node.js"],
    description: "Package manager for JavaScript",
  },
];

export const tool = {
  id: "1",
  name: "VS Code",
  category: "IDE",
  tags: ["Editor", "Microsoft", "Extensions"],
  officialSite: "https://code.visualstudio.com",
  description:
    "Visual Studio Code is a lightweight but powerful source code editor which runs on your desktop.",
  content: `# What is VS Code?

Visual Studio Code is a free, open-source code editor developed by Microsoft. It has become one of the most popular development tools due to its speed, flexibility, and extensive extension ecosystem.

## Key Features

### IntelliSense
Smart code completions based on variable types, function definitions, and imported modules.

### Debugging
Debug code directly from the editor. Launch or attach to running apps and debug with breakpoints, call stacks, and an interactive console.

### Built-in Git
Review diffs, stage files, and make commits right from the editor. Push and pull from any hosted Git service.

### Extensions
Extend VS Code with extensions - add languages, debuggers, and tools to support your development workflow.

## Popular Extensions

\`\`\`
- ESLint: JavaScript linting
- Prettier: Code formatter
- GitLens: Enhanced Git capabilities
- Live Server: Local development server
- Python: Python language support
\`\`\`

## Keyboard Shortcuts

\`\`\`
Ctrl+P: Quick file open
Ctrl+Shift+P: Command palette
Ctrl+\`: Toggle terminal
Ctrl+B: Toggle sidebar
F5: Start debugging
\`\`\`

## When to Use VS Code?

- Web development (JavaScript, TypeScript, HTML, CSS)
- Python development
- General-purpose programming
- Working with Git repositories
- Remote development (SSH, containers)`,
  relatedConcepts: [
    { id: "2", name: "Git", type: "tool" },
    { id: "3", name: "ESLint", type: "tool" },
    { id: "4", name: "TypeScript", type: "library" },
    { id: "5", name: "Debugging", type: "concept" },
  ],
};

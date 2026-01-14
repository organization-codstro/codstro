import { Personality } from "../../types/pages/Mbit/Mbit";

export const personalities: Personality[] = [
  {
    id: "1",
    type: "PASD",
    name: "The Architect",
    description:
      "Methodical planner who builds robust systems with careful analysis.",
    detailedDescription:
      "The Architect is a careful planner who believes in thorough analysis before implementation. You excel at designing robust, scalable systems that stand the test of time. Your methodical approach ensures that every component is well-thought-out and properly documented.",
    strengths: [
      "Excellent system design skills",
      "Thorough documentation",
      "Strategic long-term thinking",
      "Strong analytical abilities",
      "Attention to detail",
    ],
    weaknesses: [
      "May over-plan before starting",
      "Can be slow to adapt to changes",
      "Prefers working alone over collaboration",
      "May struggle with tight deadlines",
    ],
    workStyle:
      "You prefer quiet, focused work sessions where you can dive deep into complex problems. You thrive when given time to plan and design before implementation.",
    idealProjects: [
      "Large-scale system architecture",
      "Database schema design",
      "API design and documentation",
      "Enterprise software solutions",
    ],
    famousDevelopers: [
      "Linus Torvalds (Linux creator)",
      "Donald Knuth (Computer scientist)",
    ],
  },
  {
    id: "2",
    type: "PASH",
    name: "The Innovator",
    description:
      "Strategic thinker who learns by doing and creates elegant solutions.",
    detailedDescription:
      "The Innovator combines strategic planning with hands-on experimentation. You are not afraid to try new approaches and learn from doing. Your ability to balance planning with practical exploration leads to creative, elegant solutions.",
    strengths: [
      "Creative problem-solving",
      "Quick learner",
      "Adaptable to new technologies",
      "Balances planning with action",
      "Innovative thinking",
    ],
    weaknesses: [
      "May jump between ideas too quickly",
      "Can overlook established best practices",
      "May prefer novelty over stability",
      "Sometimes reinvents the wheel",
    ],
    workStyle:
      "You enjoy experimenting with new technologies while maintaining a strategic vision. You work best when you can prototype ideas quickly and iterate.",
    idealProjects: [
      "Proof-of-concept development",
      "New technology adoption",
      "R&D projects",
      "Startup MVPs",
    ],
    famousDevelopers: [
      "John Carmack (Game developer)",
      "Guido van Rossum (Python creator)",
    ],
  },
  {
    id: "3",
    type: "PATD",
    name: "The Leader",
    description:
      "Organized team player who reads docs and guides collaborative efforts.",
    detailedDescription:
      "The Leader excels at organizing teams and guiding collaborative efforts. You combine thorough knowledge with strong communication skills, making you an effective technical leader. Your documentation-first approach ensures everyone is on the same page.",
    strengths: [
      "Excellent communication",
      "Strong organizational skills",
      "Effective at mentoring",
      "Good at documentation",
      "Team coordination",
    ],
    weaknesses: [
      "May spend too much time in meetings",
      "Can struggle with solo deep work",
      "May over-document",
      "Sometimes prioritizes team over deadlines",
    ],
    workStyle:
      "You thrive in collaborative environments and excel at coordinating team efforts. You prefer clear documentation and structured workflows.",
    idealProjects: [
      "Team-based development",
      "Open source projects",
      "Developer tools and platforms",
      "Technical leadership roles",
    ],
    famousDevelopers: [
      "Evan You (Vue.js creator)",
      "Dan Abramov (Redux creator)",
    ],
  },
  {
    id: "4",
    type: "PATH",
    name: "The Mentor",
    description: "Collaborative planner who teaches through hands-on examples.",
    detailedDescription:
      "The Mentor loves sharing knowledge and teaching others through practical examples. You plan your teaching approach carefully, ensuring that others learn by doing. Your patience and clarity make you an invaluable team member.",
    strengths: [
      "Excellent teaching ability",
      "Patient and supportive",
      "Creates great learning materials",
      "Builds strong teams",
      "Practical communication",
    ],
    weaknesses: [
      "May spend too much time helping others",
      "Can slow down personal progress",
      "May avoid conflict",
      "Sometimes too accommodating",
    ],
    workStyle:
      "You love pair programming and collaborative learning. You work best when you can share knowledge and learn together with others.",
    idealProjects: [
      "Educational platforms",
      "Developer training programs",
      "Onboarding systems",
      "Documentation and tutorials",
    ],
    famousDevelopers: [
      "Kent C. Dodds (Testing advocate)",
      "Wes Bos (Educator)",
    ],
  },
  {
    id: "5",
    type: "PESD",
    name: "The Analyzer",
    description:
      "Logical problem-solver who debugs systematically and independently.",
    detailedDescription:
      "The Analyzer approaches problems with logic and systematic thinking. Your experimental debugging approach, combined with solo work preferences, makes you excellent at solving complex technical challenges methodically.",
    strengths: [
      "Excellent debugging skills",
      "Systematic problem-solving",
      "Independent worker",
      "Logical thinking",
      "Thorough testing",
    ],
    weaknesses: [
      "May isolate from team",
      "Can over-analyze problems",
      "May struggle with ambiguity",
      "Sometimes misses the bigger picture",
    ],
    workStyle:
      "You prefer working independently on challenging problems. You thrive when given space to analyze and experiment systematically.",
    idealProjects: [
      "Bug investigation and fixes",
      "Performance optimization",
      "Security audits",
      "Code quality improvements",
    ],
    famousDevelopers: [
      "Fabrice Bellard (QEMU creator)",
      "Rich Hickey (Clojure creator)",
    ],
  },
  {
    id: "6",
    type: "PESH",
    name: "The Explorer",
    description: "Curious learner who analyzes by experimenting and testing.",
    detailedDescription:
      "The Explorer combines analytical thinking with experimental learning. You love trying new approaches and learning through hands-on experience. Your curiosity drives you to explore different solutions systematically.",
    strengths: [
      "Highly curious and motivated",
      "Quick to try new solutions",
      "Good at exploring edge cases",
      "Thorough testing approach",
      "Learns rapidly",
    ],
    weaknesses: [
      "May experiment too much",
      "Can create unstable solutions",
      "May ignore documentation",
      "Sometimes lacks focus",
    ],
    workStyle:
      "You enjoy exploring different solutions through hands-on experimentation. You work best with freedom to try various approaches.",
    idealProjects: [
      "Testing and QA",
      "Exploratory development",
      "Tool evaluation",
      "Performance testing",
    ],
    famousDevelopers: [
      "Ryan Dahl (Node.js creator)",
      "Jordan Walke (React creator)",
    ],
  },
  {
    id: "7",
    type: "PETD",
    name: "The Organizer",
    description: "Team-focused planner who documents and structures projects.",
    detailedDescription:
      "The Organizer excels at creating structure and organization in team projects. You combine experimental problem-solving with strong team collaboration, ensuring projects are well-documented and properly structured.",
    strengths: [
      "Excellent project organization",
      "Strong team collaboration",
      "Good documentation habits",
      "Process improvement",
      "Risk management",
    ],
    weaknesses: [
      "May over-structure projects",
      "Can be inflexible",
      "May slow down rapid development",
      "Sometimes bureaucratic",
    ],
    workStyle:
      "You thrive in structured team environments. You work best when establishing processes and ensuring everyone follows best practices.",
    idealProjects: [
      "Project management tools",
      "CI/CD pipeline setup",
      "Team workflow optimization",
      "DevOps automation",
    ],
    famousDevelopers: [
      "Mitchell Hashimoto (HashiCorp founder)",
      "Solomon Hykes (Docker creator)",
    ],
  },
  {
    id: "8",
    type: "PETH",
    name: "The Facilitator",
    description: "Social planner who learns through team collaboration.",
    detailedDescription:
      "The Facilitator brings people together and ensures smooth collaboration. You plan carefully while learning hands-on with your team, creating an environment where everyone can contribute effectively.",
    strengths: [
      "Excellent facilitation skills",
      "Builds team cohesion",
      "Conflict resolution",
      "Inclusive leadership",
      "Collaborative learning",
    ],
    weaknesses: [
      "May avoid difficult decisions",
      "Can be too consensus-driven",
      "May sacrifice efficiency for harmony",
      "Sometimes too accommodating",
    ],
    workStyle:
      "You excel at bringing teams together and facilitating collaboration. You work best in agile, team-based environments.",
    idealProjects: [
      "Agile team projects",
      "Cross-functional initiatives",
      "Community building",
      "Collaborative platforms",
    ],
    famousDevelopers: [
      "Jeff Atwood (Stack Overflow co-founder)",
      "DHH (Ruby on Rails creator)",
    ],
  },
  {
    id: "9",
    type: "IASD",
    name: "The Hacker",
    description:
      "Independent coder who dives in and solves problems intuitively.",
    detailedDescription:
      "The Hacker jumps straight into code and figures things out through intuition and experience. You work best alone, systematically debugging and building solutions without extensive upfront planning.",
    strengths: [
      "Quick implementation",
      "Strong intuition",
      "Self-sufficient",
      "Pragmatic solutions",
      "Efficient debugging",
    ],
    weaknesses: [
      "May skip documentation",
      "Can create technical debt",
      "May resist collaboration",
      "Sometimes hasty decisions",
    ],
    workStyle:
      "You prefer diving straight into code and working independently. You thrive on quick iterations and practical problem-solving.",
    idealProjects: [
      "Rapid prototyping",
      "Solo projects",
      "Quick fixes and patches",
      "Script automation",
    ],
    famousDevelopers: [
      "George Hotz (Hacker)",
      "Salvatore Sanfilippo (Redis creator)",
    ],
  },
  {
    id: "10",
    type: "IASH",
    name: "The Craftsperson",
    description: "Hands-on builder who learns by creating and iterating.",
    detailedDescription:
      "The Craftsperson believes in learning through creation. You jump into projects and build iteratively, refining your work through hands-on experience. Your practical approach leads to well-crafted solutions.",
    strengths: [
      "Practical skills",
      "Iterative improvement",
      "Hands-on learning",
      "Quality craftsmanship",
      "Self-motivated",
    ],
    weaknesses: [
      "May lack big-picture view",
      "Can over-iterate",
      "May resist planning",
      "Sometimes isolates from team",
    ],
    workStyle:
      "You learn best by building things yourself. You prefer hands-on work with immediate feedback and visible results.",
    idealProjects: [
      "Product development",
      "Feature implementation",
      "UI/UX work",
      "Creative coding projects",
    ],
    famousDevelopers: [
      "Pieter Levels (Indie maker)",
      "Rasmus Lerdorf (PHP creator)",
    ],
  },
  {
    id: "11",
    type: "IATD",
    name: "The Pragmatist",
    description: "Action-oriented team member who learns from documentation.",
    detailedDescription:
      "The Pragmatist combines action with research. You jump into work quickly but also value documentation and team input. Your balanced approach makes you a reliable team contributor.",
    strengths: [
      "Balanced approach",
      "Good team player",
      "Values documentation",
      "Action-oriented",
      "Practical solutions",
    ],
    weaknesses: [
      "May lack innovation",
      "Can be too conventional",
      "May avoid risks",
      "Sometimes too focused on execution",
    ],
    workStyle:
      "You balance quick action with proper research. You work well in team settings while maintaining productivity.",
    idealProjects: [
      "Standard feature development",
      "Maintenance projects",
      "Team collaboration",
      "Established product work",
    ],
    famousDevelopers: [
      "Jeremy Ashkenas (CoffeeScript creator)",
      "TJ Holowaychuk (Express.js creator)",
    ],
  },
  {
    id: "12",
    type: "IATH",
    name: "The Collaborator",
    description: "Team player who jumps into projects and learns together.",
    detailedDescription:
      "The Collaborator thrives in team environments, learning and building together with others. You jump into projects enthusiastically and grow through collaborative experience.",
    strengths: [
      "Strong collaboration",
      "Enthusiastic learner",
      "Good communicator",
      "Team motivation",
      "Adaptable",
    ],
    weaknesses: [
      "May depend too much on others",
      "Can lack independent work skills",
      "May avoid solo challenges",
      "Sometimes unfocused",
    ],
    workStyle:
      "You thrive in collaborative environments. You work best when learning and building together with teammates.",
    idealProjects: [
      "Team hackathons",
      "Pair programming projects",
      "Collaborative tools",
      "Community projects",
    ],
    famousDevelopers: [
      "Chris Wanstrath (GitHub co-founder)",
      "Tom Preston-Werner (GitHub co-founder)",
    ],
  },
  {
    id: "13",
    type: "IESD",
    name: "The Experimenter",
    description: "Trial-and-error coder who works best independently.",
    detailedDescription:
      "The Experimenter learns through extensive trial and error. Working independently, you systematically try different approaches until finding what works. Your persistence leads to creative solutions.",
    strengths: [
      "Persistent problem solver",
      "Creative approaches",
      "Independent",
      "Thorough testing",
      "Learns from failure",
    ],
    weaknesses: [
      "Can be inefficient",
      "May create messy code",
      "Resists asking for help",
      "Sometimes stubborn",
    ],
    workStyle:
      "You prefer working alone and experimenting freely. You thrive when given time to explore different solutions.",
    idealProjects: [
      "Research projects",
      "Algorithm optimization",
      "Experimental features",
      "Performance testing",
    ],
    famousDevelopers: [
      "Anders Hejlsberg (TypeScript creator)",
      "Chris Lattner (Swift creator)",
    ],
  },
  {
    id: "14",
    type: "IESH",
    name: "The Tinkerer",
    description: "Hands-on learner who experiments until finding solutions.",
    detailedDescription:
      "The Tinkerer loves hands-on experimentation. You jump straight into trying things, learning through constant iteration and experimentation. Your playful approach often leads to unexpected solutions.",
    strengths: [
      "Creative experimentation",
      "Quick to try new things",
      "Playful approach",
      "Finds unconventional solutions",
      "Resilient",
    ],
    weaknesses: [
      "May lack direction",
      "Can waste time",
      "May create unstable code",
      "Sometimes inconsistent",
    ],
    workStyle:
      "You love tinkering with code and trying different approaches. You work best with freedom to experiment and iterate.",
    idealProjects: [
      "Side projects",
      "Prototypes",
      "Creative coding",
      "Game development",
    ],
    famousDevelopers: ["Notch (Minecraft creator)", "_why (Ruby developer)"],
  },
  {
    id: "15",
    type: "IETD",
    name: "The Coordinator",
    description: "Team-focused doer who balances action with structure.",
    detailedDescription:
      "The Coordinator jumps into action while maintaining team coordination. You balance quick execution with proper structure, making you effective in fast-paced team environments.",
    strengths: [
      "Quick execution",
      "Team coordination",
      "Balanced approach",
      "Adaptable",
      "Reliable",
    ],
    weaknesses: [
      "May struggle with planning",
      "Can be reactive",
      "May miss details",
      "Sometimes spreads too thin",
    ],
    workStyle:
      "You thrive in fast-paced team environments. You work best when coordinating quick action with team collaboration.",
    idealProjects: [
      "Agile sprints",
      "Rapid development",
      "Crisis management",
      "Team coordination",
    ],
    famousDevelopers: [
      "Scott Hanselman (Developer advocate)",
      "Sarah Drasner (Developer experience)",
    ],
  },
  {
    id: "16",
    type: "IETH",
    name: "The Enthusiast",
    description: "Energetic team member who learns through doing together.",
    detailedDescription:
      "The Enthusiast brings energy and enthusiasm to team projects. You love jumping into work with others, learning through shared experiences and collaborative doing.",
    strengths: [
      "High energy",
      "Motivates others",
      "Quick learner",
      "Collaborative spirit",
      "Positive attitude",
    ],
    weaknesses: [
      "May lack focus",
      "Can be impulsive",
      "May avoid deep work",
      "Sometimes superficial",
    ],
    workStyle:
      "You bring energy to team projects and love collaborative work. You thrive in dynamic, social work environments.",
    idealProjects: [
      "Team hackathons",
      "Community events",
      "Startup environments",
      "Creative collaborations",
    ],
    famousDevelopers: [
      "Cassidy Williams (Developer advocate)",
      "Addy Osmani (Developer relations)",
    ],
  },
];

import { PersonalityDetail } from "../../types/pages/Mbit/Mbit";

export const personalities: PersonalityDetail[] = [
  {
    id: "1",
    name: "The Architect",
    code: "PASD",
    participation:
      "Methodical planner who builds robust systems with careful analysis.",
    risks:
      "May over-plan before starting, can be slow to adapt to changes, and may struggle with tight deadlines.",
    thought:
      "The Architect is a careful planner who believes in thorough analysis before implementation. You excel at designing robust, scalable systems that stand the test of time.",
    approach:
      "Your methodical approach ensures that every component is well-thought-out and properly documented. You prefer quiet, focused work sessions where you can dive deep into complex problems.",
    recommendedJob:
      "Large-scale system architecture, Database schema design, API design and documentation, Enterprise software solutions",
    recommendedReason:
      "Your excellent system design skills, thorough documentation habits, and strategic long-term thinking make you ideal for complex architectural work. You have strong analytical abilities and attention to detail that are crucial for enterprise-level development.",
    collaborativeStyle:
      "Prefers working alone over collaboration. You thrive when given time to plan and design before implementation, working best in quiet environments.",
    strengths:
      "Excellent system design skills, Thorough documentation, Strategic long-term thinking, Strong analytical abilities, Attention to detail",
    weaknesses:
      "May over-plan before starting, Can be slow to adapt to changes, Prefers working alone over collaboration, May struggle with tight deadlines",
    strathManagement:
      "Focus on balancing planning time with execution. Set time limits for design phases and embrace iterative development. Practice adapting to changing requirements.",
    morningGreetings:
      "Good morning! Ready to architect something amazing today? Remember, even the best systems start with a single line of code.",
    nightGreetings:
      "Great work today, Architect! Your careful planning today will save countless hours tomorrow. Rest well, your systems will be waiting.",
    createdAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "The Innovator",
    code: "PASH",
    participation:
      "Strategic thinker who learns by doing and creates elegant solutions.",
    risks:
      "May jump between ideas too quickly, can overlook established best practices, and sometimes reinvents the wheel.",
    thought:
      "The Innovator combines strategic planning with hands-on experimentation. You are not afraid to try new approaches and learn from doing.",
    approach:
      "Your ability to balance planning with practical exploration leads to creative, elegant solutions. You enjoy experimenting with new technologies while maintaining a strategic vision.",
    recommendedJob:
      "Proof-of-concept development, New technology adoption, R&D projects, Startup MVPs",
    recommendedReason:
      "Your creative problem-solving abilities and quick learning make you perfect for innovative projects. You're adaptable to new technologies and can balance planning with action, which is ideal for cutting-edge development work.",
    collaborativeStyle:
      "You work best when you can prototype ideas quickly and iterate. You enjoy sharing innovative ideas while maintaining independence in execution.",
    strengths:
      "Creative problem-solving, Quick learner, Adaptable to new technologies, Balances planning with action, Innovative thinking",
    weaknesses:
      "May jump between ideas too quickly, Can overlook established best practices, May prefer novelty over stability, Sometimes reinvents the wheel",
    strathManagement:
      "Channel your innovation by completing one project before starting another. Document your experiments and learn from established patterns before innovating.",
    morningGreetings:
      "Good morning, Innovator! What new idea will you bring to life today? The future is yours to create!",
    nightGreetings:
      "Another day of innovation complete! Your creative solutions today are shaping tomorrow's standards. Dream up more brilliance!",
    createdAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "The Leader",
    code: "PATD",
    participation:
      "Organized team player who reads docs and guides collaborative efforts.",
    risks:
      "May spend too much time in meetings, can struggle with solo deep work, and may over-document.",
    thought:
      "The Leader excels at organizing teams and guiding collaborative efforts. You combine thorough knowledge with strong communication skills, making you an effective technical leader.",
    approach:
      "Your documentation-first approach ensures everyone is on the same page. You thrive in collaborative environments and excel at coordinating team efforts with clear documentation and structured workflows.",
    recommendedJob:
      "Team-based development, Open source projects, Developer tools and platforms, Technical leadership roles",
    recommendedReason:
      "Your excellent communication and strong organizational skills make you a natural leader. You're effective at mentoring, good at documentation, and excel at team coordination - all essential for leadership positions.",
    collaborativeStyle:
      "You thrive in collaborative environments and excel at coordinating team efforts. You prefer clear documentation and structured workflows, making you an effective team coordinator.",
    strengths:
      "Excellent communication, Strong organizational skills, Effective at mentoring, Good at documentation, Team coordination",
    weaknesses:
      "May spend too much time in meetings, Can struggle with solo deep work, May over-document, Sometimes prioritizes team over deadlines",
    strathManagement:
      "Balance team time with focused individual work. Set meeting limits and reserve time for deep work. Know when documentation is sufficient.",
    morningGreetings:
      "Good morning, Leader! Your team is counting on your guidance today. Lead with clarity and purpose!",
    nightGreetings:
      "Well led today! Your team is stronger because of your guidance and support. Tomorrow awaits your leadership!",
    createdAt: new Date().toISOString(),
  },
  {
    id: "4",
    name: "The Mentor",
    code: "PATH",
    participation:
      "Collaborative planner who teaches through hands-on examples.",
    risks:
      "May spend too much time helping others, can slow down personal progress, and may avoid conflict.",
    thought:
      "The Mentor loves sharing knowledge and teaching others through practical examples. You plan your teaching approach carefully, ensuring that others learn by doing.",
    approach:
      "Your patience and clarity make you an invaluable team member. You love pair programming and collaborative learning, working best when you can share knowledge and learn together with others.",
    recommendedJob:
      "Educational platforms, Developer training programs, Onboarding systems, Documentation and tutorials",
    recommendedReason:
      "Your excellent teaching ability and patient, supportive nature make you perfect for educational roles. You create great learning materials and build strong teams through practical communication.",
    collaborativeStyle:
      "You love pair programming and collaborative learning. You work best when you can share knowledge and learn together with others, creating a supportive team environment.",
    strengths:
      "Excellent teaching ability, Patient and supportive, Creates great learning materials, Builds strong teams, Practical communication",
    weaknesses:
      "May spend too much time helping others, Can slow down personal progress, May avoid conflict, Sometimes too accommodating",
    strathManagement:
      "Set boundaries on mentoring time to maintain your own growth. Learn to say no when necessary and embrace constructive conflict when it helps the team.",
    morningGreetings:
      "Good morning, Mentor! Someone will learn something valuable from you today. Share your knowledge generously!",
    nightGreetings:
      "Another day of empowering others! The knowledge you shared today will ripple forward. Rest well, teacher!",
    createdAt: new Date().toISOString(),
  },
  {
    id: "5",
    name: "The Analyzer",
    code: "PESD",
    participation:
      "Logical problem-solver who debugs systematically and independently.",
    risks:
      "May isolate from team, can over-analyze problems, and may struggle with ambiguity.",
    thought:
      "The Analyzer approaches problems with logic and systematic thinking. Your experimental debugging approach, combined with solo work preferences, makes you excellent at solving complex technical challenges methodically.",
    approach:
      "You prefer working independently on challenging problems. You thrive when given space to analyze and experiment systematically, using thorough testing to ensure quality.",
    recommendedJob:
      "Bug investigation and fixes, Performance optimization, Security audits, Code quality improvements",
    recommendedReason:
      "Your excellent debugging skills and systematic problem-solving make you ideal for complex technical challenges. Your logical thinking and thorough testing approach ensure high-quality, reliable solutions.",
    collaborativeStyle:
      "You prefer working independently on challenging problems. You thrive when given space to analyze and experiment systematically without interruptions.",
    strengths:
      "Excellent debugging skills, Systematic problem-solving, Independent worker, Logical thinking, Thorough testing",
    weaknesses:
      "May isolate from team, Can over-analyze problems, May struggle with ambiguity, Sometimes misses the bigger picture",
    strathManagement:
      "Balance solo work with regular team check-ins. Set time limits on analysis phases and embrace 'good enough' solutions when perfect isn't necessary.",
    morningGreetings:
      "Good morning, Analyzer! There's a complex problem out there waiting for your logical mind. Let's solve it systematically!",
    nightGreetings:
      "Excellent analysis today! Your systematic approach uncovered insights others missed. Your logic will guide you tomorrow too!",
    createdAt: new Date().toISOString(),
  },
  {
    id: "6",
    name: "The Explorer",
    code: "PESH",
    participation: "Curious learner who analyzes by experimenting and testing.",
    risks:
      "May experiment too much, can create unstable solutions, and may ignore documentation.",
    thought:
      "The Explorer combines analytical thinking with experimental learning. You love trying new approaches and learning through hands-on experience.",
    approach:
      "Your curiosity drives you to explore different solutions systematically. You enjoy exploring different solutions through hands-on experimentation with freedom to try various approaches.",
    recommendedJob:
      "Testing and QA, Exploratory development, Tool evaluation, Performance testing",
    recommendedReason:
      "Your highly curious and motivated nature makes you perfect for exploration and testing roles. You're quick to try new solutions, good at exploring edge cases, and have a thorough testing approach that catches what others miss.",
    collaborativeStyle:
      "You work best with freedom to try various approaches. You enjoy exploring different solutions through hands-on experimentation while systematically documenting your findings.",
    strengths:
      "Highly curious and motivated, Quick to try new solutions, Good at exploring edge cases, Thorough testing approach, Learns rapidly",
    weaknesses:
      "May experiment too much, Can create unstable solutions, May ignore documentation, Sometimes lacks focus",
    strathManagement:
      "Set boundaries on exploration time and commit to documenting your experiments. Balance curiosity with stability by testing thoroughly before deploying.",
    morningGreetings:
      "Good morning, Explorer! What new territory will you discover today? Adventure awaits in every line of code!",
    nightGreetings:
      "Great exploring today! Your curiosity uncovered valuable insights. Rest well and prepare for tomorrow's discoveries!",
    createdAt: new Date().toISOString(),
  },
];

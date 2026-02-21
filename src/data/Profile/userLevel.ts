import { UserLevel } from "../../types/common/Profile";

export const USER_LEVELS: UserLevel[] = [
  {
    id: "hello-world",
    name: "hello world",
    description: "I didn't know this world was such a big world...",
    requiredPoints: 0,
  },
  {
    id: "int",
    name: "int",
    description: "Starting with numbers.",
    requiredPoints: 100,
  },
  {
    id: "float",
    name: "float",
    description: "A wider range.",
    requiredPoints: 1000,
  },
  {
    id: "double",
    name: "double",
    description: "Anywhere.",
    requiredPoints: 2000,
  },
  {
    id: "char",
    name: "char",
    description: "You cannot be defined by numbers alone.",
    requiredPoints: 3500,
  },
  {
    id: "string",
    name: "string",
    description: "Beyond a single character.",
    requiredPoints: 5000,
  },
  {
    id: "bool",
    name: "bool",
    description: "Beyond numbers and letters.",
    requiredPoints: 7500,
  },
  {
    id: "array",
    name: "Array",
    description: "Many become one.",
    requiredPoints: 10000,
  },
  {
    id: "list",
    name: "List",
    description: "Gather and transform.",
    requiredPoints: 15000,
  },
  {
    id: "overflow",
    name: "overflow",
    description: "You cannot be defined by anything.",
    requiredPoints: 20000,
  },
  {
    id: "map",
    name: "Map",
    description: "You and I become one.",
    requiredPoints: 25000,
  },
  {
    id: "set",
    name: "Set",
    description: "Gathered perfectly.",
    requiredPoints: 35000,
  },
  {
    id: "pointer",
    name: "*(pointer)",
    description: "Overcoming the hardest hurdle.",
    requiredPoints: 50000,
  },
  {
    id: "class",
    name: "class",
    description: "Just one more hurdle.",
    requiredPoints: 70000,
  },
  {
    id: "any",
    name: "Any",
    description: "Everything arrives.",
    requiredPoints: 10000,
  },
  {
    id: "ide",
    name: "IDE",
    description: "Protect us.",
    requiredPoints: 0,
    adminOnly: true,
  },
];

export const getUserLevelByPoints = (points: number): UserLevel => {
  const publicLevels = USER_LEVELS.filter((level) => !level.adminOnly);
  const sortedLevels = [...publicLevels].sort(
    (a, b) => b.requiredPoints - a.requiredPoints,
  );

  for (const level of sortedLevels) {
    if (points >= level.requiredPoints) {
      return level;
    }
  }

  return publicLevels[0];
};

export const getNextLevelByPoints = (points: number): UserLevel | null => {
  const publicLevels = USER_LEVELS.filter((level) => !level.adminOnly);
  const sortedLevels = [...publicLevels].sort(
    (a, b) => a.requiredPoints - b.requiredPoints,
  );

  for (const level of sortedLevels) {
    if (points < level.requiredPoints) {
      return level;
    }
  }

  return null;
};

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earned: boolean;
  earnedDate?: string;
  requirement: string;
}

export interface UserLevel {
  id: string;
  name: string;
  description: string;
  requiredPoints: number;
  adminOnly?: boolean;
}

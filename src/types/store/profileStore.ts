export interface UserProfile {
  name: string;
  email: string;
  profilePath: string | null;
}

export interface UserStore {
  profile: UserProfile | null;
  profileImageUrl: string | null;
  isLoading: boolean;
  fetchProfile: (userId: string) => Promise<void>;
}

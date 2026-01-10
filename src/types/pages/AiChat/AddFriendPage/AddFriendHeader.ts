export type ViewType = "my-friends" | "browse" | "search";

export interface HeaderProps {
  view: ViewType;
  setView: (view: ViewType) => void;
  onBack: () => void;
}

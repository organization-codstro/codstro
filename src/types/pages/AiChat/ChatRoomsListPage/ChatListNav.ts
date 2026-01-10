interface NavButton {
  label: string;
  onClick: () => void;
}

export interface ChatListNavProps {
  buttons: NavButton[];
}

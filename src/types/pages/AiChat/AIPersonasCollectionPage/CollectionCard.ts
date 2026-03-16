export interface CollectionCardProps {
  name: string;
  gender: string;
  oneLineIntroduction?: string;
  preferredFeatures: string;
  profileImagePath?: string;
  onClick: () => void;
  //CreateChatRoomPage 에서 사용 ; 이 카드가 선택 되었는지 확인하는것
  isSelected: boolean;
}

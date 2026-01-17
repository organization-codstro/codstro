/**
 * [프로필 아바타 컴포넌트 Props]
 * @property name 사용자 이름 (이미지 없을 시 첫 글자 표시용)
 * @property src 프로필 이미지 URL
 * @property size 아바타 크기 클래스 (Tailwind)
 * @property backgroundColor 배경색 (이미지 없을 시 적용)
 * @property onImageChange 이미지가 선택되었을 때 호출되는 콜백 함수
 */
export interface ProfileAvatarProps {
  name: string;
  src?: string;
  size?: string;
  backgroundColor?: string;
  onImageChange?: (file: File) => void;
}

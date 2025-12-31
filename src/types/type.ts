//사이드바 내비게이션 아이템 타입 정의
export interface NavigationItem {
  id: string;
  title: string;
  icon: string;
  route: string;
  children?: NavigationItem[];
}

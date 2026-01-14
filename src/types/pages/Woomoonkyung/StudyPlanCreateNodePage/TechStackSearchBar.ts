export type TechStackSearchBarProps = {
  /** 검색어 */
  value: string;

  /** 검색어 변경 */
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;

  /** 검색어 초기화 */
  onClear: () => void;
};

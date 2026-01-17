/**
 * [프로필 편집 액션 버튼 Props]
 * @property onCancel 취소 버튼 클릭 핸들러
 * @property onSave 저장 버튼 클릭 핸들러
 * @property disabled 버튼 비활성화 여부 (저장 중 상태 등)
 * @property saveLabel 저장 버튼 라벨 (기본값: Save Changes)
 * @property cancelLabel 취소 버튼 라벨 (기본값: Cancel)
 */
export interface EditActionButtonsProps {
  onCancel: () => void;
  onSave: () => void;
  disabled?: boolean;
  saveLabel?: string;
  cancelLabel?: string;
}

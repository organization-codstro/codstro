export type NodeEditFormFieldProps = {
  /** 라벨 텍스트 */
  label: string;

  /** input 타입 (textarea 포함) */
  type?: "text" | "date" | "textarea";

  /** 입력 값 */
  value: string;

  /** 값 변경 핸들러 */
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;

  /** placeholder */
  placeholder?: string;

  /** textarea rows */
  rows?: number;

  /** 에러 메시지 */
  error?: string | null;

  /** 필수 여부 */
  required?: boolean;
};

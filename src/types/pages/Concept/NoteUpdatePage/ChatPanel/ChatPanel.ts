import { UpdateChatMessage } from "../../../../common/Concepts";

export interface ChatPanelProps {
  chatOpen: boolean;
  messages: UpdateChatMessage[];
  inputValue: string;
  setInputValue: (value: string) => void;
  isLoading: boolean;
  onSend: () => void;
  pendingNote: string | null; // 편집 중인 노트 정보, 없을 수 있으므로 null 가능
  currentMarkdown: string; // 현재 에디터에 있는 마크다운 내용
  onAccept: () => void; // AI 제안 등 수락 처리 콜백
  onReject: () => void; // AI 제안 거부 처리 콜백
}

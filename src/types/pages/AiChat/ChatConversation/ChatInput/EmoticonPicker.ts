import { Emoticon } from "../../../../common/aiChat";

export interface EmoticonPickerProps {
  emoticons: Emoticon[];
  emoticonUrls: Record<string, string>;
  isLoading: boolean;
  page: number;
  totalPages: number;
  searchInput: string;
  selectedIndex: number | null;
  onSelect: (emoticon: Emoticon) => void;
  onClose: () => void;
  onPageChange: (page: number) => void;
  onSearchChange: (value: string) => void;
  searchInputRef: React.RefObject<HTMLInputElement>;
}

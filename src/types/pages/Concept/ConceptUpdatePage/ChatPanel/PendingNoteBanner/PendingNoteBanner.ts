export interface PendingConceptBannerProps {
  currentMarkdown: string;
  pendingConcept: string;
  onAccept: () => void;
  onReject: () => void;
}

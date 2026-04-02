export interface PendingNoteBannerProps{
    currentMarkdown: string;
    pendingNote: string;
    onAccept: () => void;
    onReject: () => void;
}
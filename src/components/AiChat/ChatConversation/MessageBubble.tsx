import { useEffect, useMemo, useState } from "react";
import { MessageBubbleProps } from "../../../types/pages/AiChat/ChatConversation/MessageBubble";
import { useImageStore } from "../../../store/ImageStore";
import { useEmoticonStore } from "../../../store/emoticonStore";
import { supabase } from "../../../db/supabase/supabase";
import { useNavigate } from "react-router-dom";
import { ChatConversationService } from "../../../api/AiChat/ChatConversationPage";
import {
  ChatMessageMetadataAttachment,
  LinkPreview,
} from "../../../types/common/AiChat";

const URL_REGEX = /(https?:\/\/[^\s<>"']+|www\.[^\s<>"']+)/gi;

const extractUrls = (text: string) => {
  const matches = text.match(URL_REGEX) ?? [];
  return [...new Set(matches.map((url) => url.replace(/[),.?!]+$/, "")))];
};

const getHostName = (url: string) => {
  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
};

const toLinkPreview = (
  attachment: ChatMessageMetadataAttachment,
): LinkPreview | null => {
  if (attachment.type !== "link" || !attachment.url) return null;

  return {
    url: attachment.url,
    title: attachment.title ?? null,
    description: attachment.description ?? null,
    siteName: attachment.siteName ?? null,
    imageUrl: attachment.imageUrl ?? null,
    imageStoragePath: attachment.imageStoragePath ?? null,
    faviconUrl: null,
    status: "ready",
  };
};

const isLocationAttachment = (
  attachment: ChatMessageMetadataAttachment,
): attachment is ChatMessageMetadataAttachment & {
  type: "location";
  kakaoMapUrl: string;
  placeName: string;
} =>
  attachment.type === "location" &&
  !!attachment.kakaoMapUrl &&
  !!attachment.placeName;

export const MessageBubble = ({
  message,
  onReply,
  personas = [],
  allMessages = [],
}: MessageBubbleProps) => {
  const navigate = useNavigate();
  const isUser = message.chat_message_sender_type === "USER";
  const getUrl = useImageStore((s) => s.getUrl);
  const getEmoticon = useEmoticonStore((s) => s.getEmoticon);
  const setEmoticons = useEmoticonStore((s) => s.setEmoticons);

  const aiPersona = personas.find(
    (p) => p.chat_room_ai_id === message.chat_message_sender_agent_id,
  );

  const senderName = isUser ? "You" : (aiPersona?.ai_persona_name ?? "AI");

  const replyOriginMessage = message.chat_message_reply_message_id
    ? allMessages.find(
        (m) => m.chat_message_id === message.chat_message_reply_message_id,
      )
    : null;

  const replyTargetPersona = personas.find(
    (p) => p.chat_room_ai_id === message.chat_message_reply_target_agent_id,
  );

  // AI 프로필 이미지
  const [profileImageUrl, setProfileImageUrl] = useState<string | null>(null);
  useEffect(() => {
    if (!isUser && aiPersona?.ai_persona_profile_image_path) {
      getUrl(aiPersona.ai_persona_profile_image_path).then((url) =>
        setProfileImageUrl(url ?? null),
      );
    }
  }, [aiPersona?.ai_persona_profile_image_path, isUser]);

  // 이모티콘 이미지
  const [emoticonUrl, setEmoticonUrl] = useState<string | null>(null);
  useEffect(() => {
    if (!message.emoticon_id) return;

    const loadEmoticon = async () => {
      // 1. store 캐시에서 먼저 확인
      let emoticon = getEmoticon(message.emoticon_id!);

      // 2. store에 없으면 DB에서 직접 조회 후 캐시에 저장
      if (!emoticon) {
        const { data } = await supabase
          .from("emoticons")
          .select("*")
          .eq("emoticon_id", message.emoticon_id)
          .single();

        if (data) {
          setEmoticons([data]);
          emoticon = data;
        }
      }

      if (emoticon) {
        const url = await getUrl(emoticon.emoticon_img_path);
        setEmoticonUrl(url ?? null);
      }
    };

    loadEmoticon();
  }, [message.emoticon_id]);

  const [attachmentUrls, setAttachmentUrls] = useState<string[]>([]);
  useEffect(() => {
    const paths = message.chat_message_file_content_path ?? [];
    if (paths.length === 0) {
      setAttachmentUrls([]);
      return;
    }

    let cancelled = false;
    Promise.all(paths.map((path) => getUrl(path))).then((urls) => {
      if (cancelled) return;
      setAttachmentUrls(urls.filter((url): url is string => Boolean(url)));
    });

    return () => {
      cancelled = true;
    };
  }, [message.chat_message_file_content_path, getUrl]);

  const metadataLinkPreviews = useMemo(
    () =>
      message.chat_message_metadata?.attachments
      .map(toLinkPreview)
        .filter((preview): preview is LinkPreview => Boolean(preview)) ?? [],
    [message.chat_message_metadata],
  );

  const contentUrls = useMemo(
    () => {
      const metadataLinkUrls = new Set(
        metadataLinkPreviews.map((preview) => preview.url),
      );
      return extractUrls(message.chat_message_content ?? "").filter(
        (url) => !metadataLinkUrls.has(url),
      );
    },
    [message.chat_message_content, metadataLinkPreviews],
  );
  const [contentLinkPreviews, setContentLinkPreviews] = useState<LinkPreview[]>(
    [],
  );

  useEffect(() => {
    if (contentUrls.length === 0) {
      setContentLinkPreviews([]);
      return;
    }

    let cancelled = false;
    Promise.allSettled(
      contentUrls.map((url) => ChatConversationService.createLinkPreview({ url })),
    ).then((results) => {
      if (cancelled) return;
      setContentLinkPreviews(
        results
          .map((result) => (result.status === "fulfilled" ? result.value : null))
          .filter((preview): preview is LinkPreview => Boolean(preview)),
      );
    });

    return () => {
      cancelled = true;
    };
  }, [contentUrls]);

  const linkPreviews = [...metadataLinkPreviews, ...contentLinkPreviews];
  const locationPreviews =
    message.chat_message_metadata?.attachments.filter(isLocationAttachment) ??
    [];

  return (
    <div
      className={`flex items-end gap-2 ${isUser ? "justify-end" : "justify-start"}`}
    >
      {/* AI 프로필 이미지 */}
      {!isUser && (
        <button
          type="button"
          className="flex-shrink-0 overflow-hidden bg-gray-200 rounded-full cursor-pointer w-14 h-14"
          onClick={() =>
            aiPersona?.ai_persona_id &&
            navigate(`/ai-chat/persona/${aiPersona.ai_persona_id}`)
          }
          aria-label={`${senderName} 프로필로 이동`}
        >
          {profileImageUrl ? (
            <img
              src={profileImageUrl}
              alt={senderName}
              className="object-cover w-full h-full"
            />
          ) : (
            <div className="flex items-center justify-center w-full h-full text-xs font-bold text-gray-500">
              {senderName.charAt(0)}
            </div>
          )}
        </button>
      )}

      <div className="max-w-md">
        {/* AI 이름 */}
        {!isUser && (
          <div className="pl-1 mb-1 text-xs font-semibold text-gray-500">
            {senderName}
          </div>
        )}

        <div
          className={`p-3 rounded-lg shadow-sm ${
            isUser ? "bg-blue-500 text-white" : "bg-white text-gray-800"
          }`}
        >
          {/* 답장 원본 미리보기 */}
          {replyOriginMessage && (
            <div className="p-2 mb-2 text-xs text-gray-600 bg-gray-100 border-l-2 border-blue-400 rounded">
              {replyTargetPersona && (
                <span className="mr-1 font-semibold text-blue-500">
                  @{replyTargetPersona.ai_persona_name}
                </span>
              )}
              <span className="line-clamp-2">
                {replyOriginMessage.chat_message_content ?? "(이모티콘 메시지)"}
              </span>
            </div>
          )}

          {/* 멘션 표시 */}
          {message.chat_message_mention_target_agent_id && (
            <div className="mb-1 text-xs text-blue-300">
              @
              {personas.find(
                (p) =>
                  p.chat_room_ai_id ===
                  message.chat_message_mention_target_agent_id,
              )?.ai_persona_name ?? "Unknown"}
            </div>
          )}

          {/* 이모티콘 - 텍스트와 함께 표시 */}
          {message.emoticon_id && (
            <div className="mb-2">
              {emoticonUrl ? (
                <img
                  src={emoticonUrl}
                  alt="emoticon"
                  className="object-contain w-24 h-24"
                />
              ) : (
                <div className="w-24 h-24 bg-gray-100 rounded-lg animate-pulse" />
              )}
            </div>
          )}

          {/* 텍스트 내용 - 이모티콘 유무와 관계없이 항상 표시 */}
          {message.chat_message_content && (
            <div className="break-words whitespace-pre-wrap">
              {message.chat_message_content}
            </div>
          )}

          {/* 텍스트도 이모티콘도 없을 때 */}
          {!message.emoticon_id && !message.chat_message_content && (
            <span className="italic text-gray-400">(내용 없음)</span>
          )}

          {/* 이미지 첨부 */}
          {attachmentUrls.length > 0 && (
            <div className="mt-2 space-y-2">
              {attachmentUrls.map((img, i) => (
                <img
                  key={i}
                  src={img}
                  alt={`첨부 이미지 ${i + 1}`}
                  className="object-cover rounded-lg max-h-60"
                />
              ))}
            </div>
          )}

          {/* 링크 미리보기 */}
          {linkPreviews.length > 0 && (
            <div className="mt-2 space-y-2">
              {linkPreviews.map((preview) => (
                <button
                  type="button"
                  key={preview.url}
                  onClick={() =>
                    window.open(preview.url, "_blank", "noopener,noreferrer")
                  }
                  className={`block w-full overflow-hidden text-left border rounded-lg transition-colors ${
                    isUser
                      ? "border-blue-300 bg-blue-50 text-gray-900 hover:bg-white"
                      : "border-gray-200 bg-gray-50 hover:bg-gray-100"
                  }`}
                >
                  {preview.imageUrl && (
                    <img
                      src={preview.imageUrl}
                      alt=""
                      className="object-cover w-full h-32 bg-gray-100"
                    />
                  )}
                  <div className="p-3">
                    <div className="text-xs font-medium text-gray-500 truncate">
                      {preview.siteName ?? getHostName(preview.url)}
                    </div>
                    <div className="mt-1 text-sm font-semibold text-gray-900 line-clamp-2">
                      {preview.title ?? preview.url}
                    </div>
                    {preview.description && (
                      <div className="mt-1 text-xs text-gray-600 line-clamp-2">
                        {preview.description}
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* 카카오 위치 미리보기 */}
          {locationPreviews.length > 0 && (
            <div className="mt-2 space-y-2">
              {locationPreviews.map((location) => (
                <button
                  type="button"
                  key={`${location.kakaoMapUrl}-${location.placeName}`}
                  onClick={() =>
                    window.open(
                      location.kakaoMapUrl,
                      "_blank",
                      "noopener,noreferrer",
                    )
                  }
                  className={`block w-full overflow-hidden text-left border rounded-lg transition-colors ${
                    isUser
                      ? "border-blue-300 bg-blue-50 text-gray-900 hover:bg-white"
                      : "border-gray-200 bg-gray-50 hover:bg-gray-100"
                  }`}
                >
                  <div className="relative flex h-28 items-center justify-center bg-[#f2f5f3]">
                    <div className="absolute inset-x-0 top-1/2 border-t border-[#d8e2dc]" />
                    <div className="absolute inset-y-0 left-1/2 border-l border-[#d8e2dc]" />
                    <div className="relative flex h-11 w-11 items-center justify-center rounded-full bg-[#fee500] shadow-sm">
                      <div className="h-4 w-4 rounded-full bg-[#3c1e1e]" />
                    </div>
                  </div>
                  <div className="p-3">
                    <div className="text-xs font-medium text-gray-500">
                      Kakao Map
                    </div>
                    <div className="mt-1 text-sm font-semibold text-gray-900 line-clamp-2">
                      {location.placeName}
                    </div>
                    {(location.roadAddressName || location.addressName) && (
                      <div className="mt-1 text-xs text-gray-600 line-clamp-2">
                        {location.roadAddressName ?? location.addressName}
                      </div>
                    )}
                  </div>
                </button>
              ))}
            </div>
          )}

          {/* 시간 + Reply */}
          <div className="flex items-center justify-between mt-2">
            <span
              className={`text-xs ${isUser ? "text-blue-100" : "text-gray-400"}`}
            >
              {message.created_at
                ? new Date(message.created_at).toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })
                : ""}
            </span>
            {onReply && (
              <button
                className={`text-xs ml-3 ${
                  isUser ? "text-blue-100" : "text-gray-400"
                } hover:underline`}
                onClick={() => onReply(message)}
              >
                Reply
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

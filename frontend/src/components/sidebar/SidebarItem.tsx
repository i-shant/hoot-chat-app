import type { Chat, PendingMessage } from "@/types";
import { useEffect } from "react";
import { useMutationState } from "@tanstack/react-query";
import { Link, useParams } from "react-router";
import { useStore } from "@/store/store";
import { useGetNotifications } from "@/hooks/notifications/useGetNotifications";
import { useMarkAsRead } from "@/hooks/notifications/useMarkAsRead";
import { useUser } from "@/hooks/auth/useUser";
import { cn, getFormattedTime } from "@/lib/utils";
import Avatar from "../Avatar";

type Props = {
  chat: Chat;
};

export default function SidebarItem({ chat }: Props) {
  const { chatId: chatIdParam } = useParams();

  const { data: authUser } = useUser();

  const onlineUsers = useStore((state) => state.onlineUsers);

  const { data: notifications } = useGetNotifications();

  const { mutate: markAsRead } = useMarkAsRead();

  const pendingMessages = useMutationState<PendingMessage>({
    filters: { mutationKey: ["createMessage"], status: "pending" },
    select: (mutation) => mutation.state.variables as PendingMessage,
  }).filter((pendingMessage) => pendingMessage.chatId === chat._id);

  const pendingNotifications = useMutationState({
    filters: { mutationKey: ["markAsRead"], status: "pending" },
    select: (mutation) => mutation.state.variables as string,
  });

  const otherUser = chat.members.find((user) => user._id !== authUser?._id);

  const active = chat && chat._id === chatIdParam;

  const isOnline = otherUser && onlineUsers.includes(otherUser._id);

  const hasNotifications =
    !pendingNotifications.includes(chat._id) && notifications?.has(chat._id);

  useEffect(() => {
    if (chatIdParam && notifications?.has(chatIdParam)) {
      markAsRead(chatIdParam);
    }
  }, [notifications, chatIdParam]);

  return (
    <li className="group">
      <Link
        to={`/chat/${chat._id}`}
        className={cn(
          "block ps-2 hover:bg-muted-foreground/10 focus-visible:bg-muted-foreground/10",
          active && "bg-muted-foreground/10"
        )}
      >
        <div className="flex items-center gap-2 group-last-of-type:mb-2">
          <Avatar name={otherUser?.name ?? ""} isOnline={isOnline} />
          <div className="h-20 flex-1 flex items-center gap-2 border-b ps-1 py-4 pe-3">
            <div className="flex-1">
              <h3 className="text-base line-clamp-1 mb-1">{otherUser?.name}</h3>
              <p className="text-sm text-muted-foreground line-clamp-1">
                {chat.typing ? (
                  <span className="text-green-400">Typing...</span>
                ) : pendingMessages?.length ? (
                  pendingMessages[pendingMessages.length - 1].content
                ) : (
                  chat.lastMessage && (
                    <span
                      className={cn(
                        hasNotifications && "font-semibold text-green-400"
                      )}
                    >
                      {chat.lastMessage.content}
                    </span>
                  )
                )}
              </p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">
                {chat.typing
                  ? null
                  : pendingMessages?.length
                  ? "Sending..."
                  : chat.lastMessage &&
                    getFormattedTime(chat.lastMessage.createdAt)}
              </p>
              <div>
                {hasNotifications && (
                  <div className="w-3 h-3 rounded-full bg-green-500 mx-auto mt-1">
                    <span className="sr-only">Notification</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </li>
  );
}

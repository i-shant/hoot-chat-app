import type { PendingMessage } from "@/types";
import { useEffect, useRef } from "react";
import { useMutationState } from "@tanstack/react-query";
import { useParams } from "react-router";
import { Check } from "lucide-react";
import { useUser } from "@/hooks/auth/useUser";
import { useGetMessages } from "@/hooks/messages/useGetMessages";
import { getFormattedTime } from "@/lib/utils";
import ChatSkeleton from "./ChatSkeleton";
import ChatBubble from "./ChatBubble";

export default function ChatMessages() {
  const { chatId } = useParams();

  const lastMessageRef = useRef<HTMLLIElement>(null);

  const { data: authUser } = useUser();

  const { data: messages, isLoading, isError } = useGetMessages(chatId!);

  const pendingMessages = useMutationState({
    filters: { mutationKey: ["createMessage"], status: "pending" },
    select: (mutation) => mutation.state.variables as PendingMessage,
  }).filter((pendingMessage) => pendingMessage.chatId === chatId);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, pendingMessages]);

  if (isLoading) {
    return <ChatSkeleton />;
  }

  if (isError) {
    return (
      <div className="h-full flex items-center justify-center">
        <h2 className="text-center text-xl font-medium text-gray-500">
          Something went wrong...
        </h2>
      </div>
    );
  }

  return (
    <>
      {messages?.length ? (
        <ul className="flex flex-col gap-4">
          {messages.map((message) => (
            <ChatBubble
              key={message._id}
              align={message.sender === authUser?._id ? "end" : "start"}
            >
              <div className="px-3.5 pt-3 pb-5 flex justify-between gap-4 relative">
                <p className="">{message.content}</p>
                <div className="mt-4 self-end text-muted-foreground absolute bottom-1 right-1.5 flex items-center gap-1">
                  <small className="text-xs text-nowrap">
                    {getFormattedTime(message.createdAt)}
                  </small>
                  <Check className="size-3.5" />
                </div>
              </div>
            </ChatBubble>
          ))}

          {pendingMessages?.map((pendingMessage) => (
            <ChatBubble
              key={pendingMessage.chatId}
              align="end"
              className="opacity-50"
            >
              <div className="px-3.5 pt-3 pb-5 flex justify-between gap-4 relative">
                <p>{pendingMessage.content}</p>
                <small className="mt-4 text-xs text-muted-foreground self-end text-nowrap absolute bottom-1 right-2.5">
                  Sending...
                </small>
              </div>
            </ChatBubble>
          ))}

          <li ref={lastMessageRef}></li>
        </ul>
      ) : (
        <div className="h-full flex items-center justify-center">
          <h2 className="text-center text-xl font-medium text-gray-500">
            No messages yet...
          </h2>
        </div>
      )}
    </>
  );
}

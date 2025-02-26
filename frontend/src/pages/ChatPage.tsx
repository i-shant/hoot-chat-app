import { useParams } from "react-router";
import { Loader } from "lucide-react";
import { useUser } from "@/hooks/auth/useUser";
import { useGetChatById } from "@/hooks/chats/useGetChatById";
import ChatForm from "@/components/chat/ChatForm";
import ChatHeader from "@/components/chat/ChatHeader";
import ChatMessages from "@/components/chat/ChatMessages";
import TypingIndicator from "@/components/TypingIndicator";

export default function ChatPage() {
  const { chatId = "" } = useParams();

  const { data: authUser } = useUser();

  const { data: chat, isLoading, isError } = useGetChatById(chatId);

  const otherUser = chat?.members.find((user) => user._id !== authUser?._id);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="animate-spin size-12" />
      </div>
    );
  }

  if (isError || !otherUser) {
    return (
      <div className="h-full flex items-center justify-center">
        <h2 className="text-lg text-muted-foreground">
          Something went wrong, try again...
        </h2>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <ChatHeader user={otherUser} />

      <div className="flex-1">
        <div className="py-3 px-4 flex flex-col gap-4 overflow-y-auto h-[calc(100vh-8rem)] custom-scrollbar">
          <ChatMessages />
          {chat?.typing && <TypingIndicator />}
        </div>
      </div>

      <ChatForm />
    </div>
  );
}

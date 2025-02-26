import { useEffect, useRef } from "react";
import { useNavigate, useParams } from "react-router";
import { Loader } from "lucide-react";
import { useGetUserById } from "@/hooks/users/useGetUserById";
import { useCreateMessage } from "@/hooks/messages/useCreateMessage";
import { useCreateChat } from "@/hooks/chats/useCreateChat";
import ChatHeader from "@/components/chat/ChatHeader";
import ChatFormUI from "@/components/chat/ChatFormUI";
import { useGetChats } from "@/hooks/chats/useGetChats";

export default function PreChatPage() {
  const { userId } = useParams();

  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();

  const { data: chats } = useGetChats();

  const { mutate: createMessage } = useCreateMessage();

  const { mutate: createChat } = useCreateChat();

  const { data: otherUser, isLoading, isError } = useGetUserById(userId!);

  useEffect(() => {
    const chat = chats?.find((chat) =>
      chat.members.some((member) => member._id === userId)
    );

    if (chat) {
      navigate(`/chat/${chat._id}`);
    }
  }, [chats, userId]);

  function handleSendMessage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;

    const formData = new FormData(form);

    const message = formData.get("message");

    if (!userId || !message) {
      return;
    }

    createChat(userId, {
      onSuccess: (data) => {
        const newChatId = data._id;
        return createMessage({ chatId: newChatId, content: message as string });
      },
    });

    // createMessage({ userId: userId, content: message as string });

    form.reset();
  }

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

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

      <div className="flex-1"></div>

      <ChatFormUI
        formRef={formRef}
        inputRef={inputRef}
        handleSendMessage={handleSendMessage}
      />
    </div>
  );
}

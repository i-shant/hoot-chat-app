import { useEffect, useRef } from "react";
import { useParams } from "react-router";
import { useStore } from "@/store/store";
import { useCreateMessage } from "@/hooks/messages/useCreateMessage";
import ChatFormUI from "./ChatFormUI";

export default function ChatForm() {
  const { chatId } = useParams();

  let timeoutId: NodeJS.Timeout | null = null;

  const formRef = useRef<HTMLFormElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const { mutate: createMessage } = useCreateMessage();

  const emit = useStore((state) => state.emit);

  function handleSendMessage(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;

    const formData = new FormData(form);

    const message = formData.get("message");

    if (!chatId || !message) {
      return;
    }

    createMessage({ chatId, content: message as string });

    form.reset();
  }

  function handleChange() {
    emit("typing:start", chatId);

    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    timeoutId = setTimeout(() => {
      emit("typing:stop", chatId);
    }, 1000);
  }

  useEffect(() => {
    if (formRef.current) {
      formRef.current.reset(); // Reset form when chat changes
    }

    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [chatId]);

  return (
    <ChatFormUI
      formRef={formRef}
      inputRef={inputRef}
      handleSendMessage={handleSendMessage}
      handleChange={handleChange}
    />
  );
}

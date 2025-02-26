import ChatMessageSkeleton from "./ChatMessageSkeleton";

export default function ChatSkeleton() {
  return Array(5)
    .fill(null)
    .map((_, i) => (
      <ChatMessageSkeleton key={i} align={i % 2 === 0 ? "start" : "end"} />
    ));
}

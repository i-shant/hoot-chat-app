import SidebarItem from "./SidebarItem";
import { useGetChats } from "@/hooks/chats/useGetChats";
import SidebarItemSkeleton from "./SidebarItemSkeleton";

export default function ChatList() {
  const { data: chats, isLoading, isError } = useGetChats();

  return (
    <div className="flex-1 h-[calc(100vh-4rem)] overflow-y-auto custom-scrollbar">
      {isLoading ? (
        <SidebarItemSkeleton />
      ) : isError ? (
        <div className="h-full flex items-center justify-center">
          <h2 className="text-lg text-muted-foreground">
            Something went wrong, try again...
          </h2>
        </div>
      ) : chats?.length ? (
        <ul className="overflow-y-auto">
          {chats.map((chat) => (
            <SidebarItem key={chat._id} chat={chat} />
          ))}
        </ul>
      ) : (
        <div className="h-full flex items-center justify-center">
          <h2 className="text-lg text-muted-foreground">No chats yet...</h2>
        </div>
      )}
    </div>
  );
}

import { cn } from "@/lib/utils";
import SidebarHeader from "./SidebarHeader";
import ChatList from "./ChatList";
import { useStore } from "@/store/store";

export default function Sidebar() {
  const isSidebarOpen = useStore((state) => state.isSidebarOpen);

  return (
    <>
      <aside
        className={cn(
          "z-20 bg-background/50 sm:bg-background shadow backdrop-filter backdrop-blur-md w-80 border-e h-full transition absolute sm:static -translate-x-full sm:translate-x-0",
          { "translate-x-0": isSidebarOpen }
        )}
      >
        <SidebarHeader />
        <ChatList />
      </aside>
    </>
  );
}

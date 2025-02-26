import type { User } from "@/types";
import { Ban, Menu } from "lucide-react";
import { useStore } from "@/store/store";
import Avatar from "../Avatar";
import { Button } from "../ui/button";
import { getFirstName } from "@/lib/utils";
import { toast } from "sonner";

type Props = {
  user: User;
};

export default function ChatHeader({ user }: Props) {
  const onlineUsers = useStore((state) => state.onlineUsers);
  const setSidebarOpen = useStore((state) => state.setSidebarOpen);

  const isOnline = onlineUsers.includes(user._id);

  function handleBlock() {
    // TODO: Add block user logic

    toast("Coming soon");
  }

  return (
    <header className="border-b h-16 flex items-center justify-center px-3">
      <div className="h-full w-full flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button
            variant="outline"
            size="icon"
            title="Close sidebar"
            onClick={() => setSidebarOpen(true)}
            className="sm:hidden"
          >
            <Menu />
          </Button>

          <Avatar name={user.name} isOnline={isOnline} />
          <h2 className="text-lg">{user.name}</h2>
        </div>
        <Button
          variant="ghost"
          size="icon"
          title={`Block ${getFirstName(user.name)}`}
          className="[&_svg]:size-5"
          onClick={handleBlock}
        >
          <span className="sr-only">Block {user.name}</span>
          <Ban className="text-red-400" />
        </Button>
      </div>
    </header>
  );
}

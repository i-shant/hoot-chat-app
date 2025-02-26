import { Menu, MessageCircle } from "lucide-react";
import { useUser } from "@/hooks/auth/useUser";
import { getFirstName } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useStore } from "@/store/store";

export default function WelcomePage() {
  const { data: authUser } = useUser();

  const setSidebarOpen = useStore((state) => state.setSidebarOpen);

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b h-16 flex items-center px-3 sm:hidden">
        <Button
          variant="outline"
          size="icon"
          title="Close sidebar"
          onClick={() => setSidebarOpen(true)}
        >
          <Menu />
        </Button>
      </header>
      <div className="flex-1 flex flex-col items-center justify-center space-y-4 text-center">
        <MessageCircle className="size-14 text-muted-foreground animate-bounce" />
        <h1 className="text-4xl">
          Welcome {authUser ? getFirstName(authUser.name) : ""}
        </h1>
        <p className="text-lg text-muted-foreground">
          Start a chat, make a <span className="font-bold">Hoot</span>!
        </p>
      </div>
    </div>
  );
}

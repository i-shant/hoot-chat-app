import { Link } from "react-router";
import { LogOut, X } from "lucide-react";
import { useLogout } from "@/hooks/auth/useLogout";
import { ModeToggle } from "../ModeToggle";
import { Button } from "../ui/button";
import AddUserDialog from "../add-user-dialog/AddUserDialog";
import { useStore } from "@/store/store";

export default function SidebarHeader() {
  const setSidebarOpen = useStore((state) => state.setSidebarOpen);

  const { mutate: logout, isPending: isLogoutPending } = useLogout();
  return (
    <div className="border-b h-16 flex items-center px-3">
      <div className="w-full flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          <Link to="/" className="p-2 rounded">
            Hoot
          </Link>
        </h2>
        <div className="flex items-center gap-2">
          <AddUserDialog />
          <ModeToggle />
          <Button
            variant="outline"
            size="icon"
            title="Logout"
            disabled={isLogoutPending}
            onClick={() => logout()}
          >
            <LogOut />
          </Button>
          <Button
            variant="destructive"
            size="icon"
            title="Close sidebar"
            onClick={() => setSidebarOpen(false)}
            className="sm:hidden"
          >
            <X className="text-white" />
          </Button>
        </div>
      </div>
    </div>
  );
}

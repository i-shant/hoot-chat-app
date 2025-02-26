import Sidebar from "@/components/sidebar/Sidebar";
import { useReactQuerySubscription } from "@/hooks/useReactQuerySubscription";
import { Outlet } from "react-router";

export default function HomePage() {
  useReactQuerySubscription();

  return (
    <div className="h-screen flex overflow-hidden">
      <Sidebar />
      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}

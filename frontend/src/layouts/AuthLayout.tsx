import { Navigate, Outlet } from "react-router";
import { useUser } from "../hooks/auth/useUser";
import { Loader } from "lucide-react";

export default function AuthLayout() {
  const { data: authUser, isLoading } = useUser();

  if (authUser) return <Navigate to="/" replace />;

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      {isLoading ? (
        <Loader className="animate-spin size-12" />
      ) : (
        <div className="w-full max-w-sm">
          <Outlet />
        </div>
      )}
    </div>
  );
}

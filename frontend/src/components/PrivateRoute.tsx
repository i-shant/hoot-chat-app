import { Navigate, Outlet } from "react-router";
import { useUser } from "../hooks/auth/useUser";
import { Loader } from "lucide-react";

export default function PrivateRoute() {
  const { data: authUser, isLoading } = useUser();

  if (isLoading)
    return (
      <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
        <Loader className="animate-spin size-12" />
      </div>
    );

  if (!authUser) return <Navigate to="/login" replace />;

  return <Outlet />;
}

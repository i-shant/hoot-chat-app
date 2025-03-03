import { useState } from "react";
import { Link } from "react-router";
import { toast } from "sonner";
import { Eye, EyeOff, Loader } from "lucide-react";
import { useLogin } from "@/hooks/auth/useLogin";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { mutate: login, isPending } = useLogin();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!email || !password) {
      toast.error("All fields are required!");
      return;
    }

    login({ email, password });
  }

  function handleGuestLogin() {
    const guestEmail = import.meta.env.VITE_GUEST_EMAIL;
    const guestPass = import.meta.env.VITE_GUEST_PASS;

    if (!guestEmail || !guestPass) {
      toast.error("Invalid Guest Email or Password!");
      return;
    }

    login({
      email: guestEmail,
      password: guestPass,
    });
  }

  return (
    <div className="flex flex-col gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Login</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit}>
            <div className="flex flex-col gap-6">
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="john@example.com"
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative flex items-center">
                  <Input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="absolute end-0"
                    onClick={() => setShowPassword((prev) => !prev)}
                  >
                    {showPassword ? <EyeOff /> : <Eye />}
                  </Button>
                </div>
              </div>
              <div className="w-full space-y-3">
                <Button type="submit" className="w-full" disabled={isPending}>
                  {isPending ? (
                    <Loader className="animate-spin" />
                  ) : (
                    <span>Login</span>
                  )}
                </Button>

                <Button
                  variant="secondary"
                  type="button"
                  className="w-full"
                  disabled={isPending}
                  onClick={handleGuestLogin}
                >
                  {isPending ? (
                    <Loader className="animate-spin" />
                  ) : (
                    <span>Guest Login</span>
                  )}
                </Button>
              </div>
            </div>
            <div className="mt-4 text-center text-sm">
              Don&apos;t have an account?{" "}
              <Link to="/signup" className="underline underline-offset-4">
                Sign up
              </Link>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

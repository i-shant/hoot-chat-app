import { useUser } from "@/hooks/auth/useUser";
import { Link } from "react-router";
import { ModeToggle } from "./ModeToggle";
import { Button } from "./ui/button";
import { LogOut } from "lucide-react";

export default function Navbar() {
  const { data: authUser } = useUser();

  return (
    <header className="border-b">
      <div className="max-w-7xl mx-auto py-4 px-2 flex items-center justify-between">
        <div className="text-xl sm:text-2xl font-bold">
          <Link to="/" className="px-2 sm:px-4 py-2 rounded text-primary">
            <span className="text-orange-500 text-2xl sm:text-3xl">H</span>
            oot
          </Link>
        </div>
        <div className="flex items-center gap-2 sm:gap-4">
          {!authUser && (
            <nav>
              <ul className="flex items-center">
                <li>
                  <Button
                    variant="link"
                    className="text-base font-normal px-2 sm:px-4"
                    asChild
                  >
                    <Link to="/login">Log In</Link>
                  </Button>
                </li>
                <li>
                  <Button
                    variant="link"
                    className="text-base font-normal px-2 sm:px-4"
                    asChild
                  >
                    <Link to="/signup">Sign Up</Link>
                  </Button>
                </li>
              </ul>
            </nav>
          )}
          <div className="flex items-center gap-4">
            <ModeToggle />
            {authUser && (
              <Button variant="outline" size="icon">
                <LogOut aria-hidden />
                <span className="sr-only">Log out</span>
              </Button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}

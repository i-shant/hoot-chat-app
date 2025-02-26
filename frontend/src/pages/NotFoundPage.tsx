import { Link } from "react-router";

export default function NotFoundPage() {
  return (
    <main className="flex flex-col items-center justify-center min-h-screen text-center text-muted-foreground p-4">
      <h1 className="text-4xl sm:text-5xl font-bold mb-4">404 Not Found</h1>
      <p className="text-lg sm:text-xl mb-4">
        Sorry, we couldn't find the page you're looking for.
      </p>
      <p className="sm:text-lg">
        Go back to the{" "}
        <Link to="/" className="underline underline-offset-4">
          home page
        </Link>
      </p>
    </main>
  );
}

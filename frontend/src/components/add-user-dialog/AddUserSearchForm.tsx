import { Search } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

type Props = {
  searchTerm: string;
  setSearchTerm: (searchTerm: string) => void;
  refetch: () => void;
};

export default function AddUserSearchForm({
  searchTerm,
  setSearchTerm,
  refetch,
}: Props) {
  function handleFindUser(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!searchTerm.trim()) return;

    refetch();
  }

  return (
    <div className="relative mb-4">
      <form onSubmit={handleFindUser}>
        <Label htmlFor="search-users" className="sr-only"></Label>
        <Input
          type="search"
          id="search-users"
          name="q"
          placeholder="Search users..."
          className="pl-8"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Search className="pointer-events-none absolute left-2 top-1/2 size-4 -translate-y-1/2 select-none opacity-50" />
      </form>
    </div>
  );
}

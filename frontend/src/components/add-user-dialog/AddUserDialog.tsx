import { useState } from "react";
import { Loader, Plus } from "lucide-react";
import { useStore } from "@/store/store";
import { useGetUsers } from "@/hooks/users/useGetUsers";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Button } from "../ui/button";
import AddUserSearchForm from "./AddUserSearchForm";
import AddUserDialogList from "./AddUserDialogList";

export default function AddUserDialog() {
  const [searchTerm, setSearchTerm] = useState("Ishant");

  const isAddUserDialogOpen = useStore((state) => state.isAddUserDialogOpen);
  const setAddUserDialogOpen = useStore((state) => state.setAddUserDialogOpen);

  const { data: users, isPending, isError, refetch } = useGetUsers(searchTerm);

  return (
    <Dialog open={isAddUserDialogOpen} onOpenChange={setAddUserDialogOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" size="icon" title="Add User">
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Find Users</DialogTitle>
          <DialogDescription>
            Add users to chat with from the list below.
          </DialogDescription>
        </DialogHeader>
        <div>
          <AddUserSearchForm
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            refetch={refetch}
          />
          <div className="h-96 overflow-hidden">
            {isPending ? (
              <div className="h-full flex items-center justify-center">
                <Loader className="animate-spin size-8" />
              </div>
            ) : isError ? (
              <div className="h-full flex items-center justify-center">
                <h2 className="text-lg text-muted-foreground">
                  Something went wrong, try again...
                </h2>
              </div>
            ) : users?.length ? (
              <AddUserDialogList users={users} />
            ) : (
              <div className="h-full flex items-center justify-center">
                <h2 className="text-lg text-muted-foreground">
                  Try searching for a user...
                </h2>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

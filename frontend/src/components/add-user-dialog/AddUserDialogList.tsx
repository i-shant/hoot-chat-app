import type { User } from "@/types";
import AddUserDialogItem from "./AddUserDialogItem";

type Props = {
  users: User[];
};

export default function AddUserDialogList({ users }: Props) {
  return (
    <ul className="h-full overflow-y-auto custom-scrollbar">
      {users?.map((user) => (
        <AddUserDialogItem key={user._id} user={user} />
      ))}
    </ul>
  );
}

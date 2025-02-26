import type { User } from "@/types";
import { useNavigate } from "react-router";
import { Send } from "lucide-react";
import { useStore } from "@/store/store";
import { useGetChats } from "@/hooks/chats/useGetChats";
import { Button } from "../ui/button";

type Props = {
  user: User;
};

export default function AddUserDialogItem({ user }: Props) {
  const navigate = useNavigate();

  const hideAddUserDialog = useStore((state) => state.hideAddUserDialog);

  const { data: chats } = useGetChats();

  function handleStartChat(userId: string) {
    const chatExists = chats?.find((chat) =>
      chat.members.some((member) => member._id === userId)
    );

    if (chatExists) navigate(`/chat/${chatExists._id}`);
    else navigate(`/chat/user/${userId}`);

    hideAddUserDialog();
  }

  return (
    <li className="border-b border-muted/50 last:border-b-0 py-2 last:pb-0">
      <div className="flex items-center justify-between gap-2 px-2">
        <h2>{user.name}</h2>
        <Button
          variant="outline"
          size="icon"
          onClick={() => handleStartChat(user._id)}
        >
          <Send />
        </Button>
      </div>
    </li>
  );
}

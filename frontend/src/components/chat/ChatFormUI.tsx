import { Send } from "lucide-react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

type Props = {
  formRef: React.RefObject<HTMLFormElement | null>;
  inputRef?: React.RefObject<HTMLInputElement | null>;
  handleSendMessage: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function ChatFormUI({
  formRef,
  inputRef,
  handleSendMessage,
  handleChange,
}: Props) {
  return (
    <form ref={formRef} onSubmit={handleSendMessage}>
      <div className="flex gap-2 px-3 pb-3 pt-1.5">
        <Label htmlFor="message" className="sr-only">
          Message
        </Label>
        <Input
          ref={inputRef}
          id="message"
          type="text"
          name="message"
          placeholder="Start typing..."
          required
          className="h-auto p-3"
          onChange={handleChange}
        />
        <button className="p-2 outline-0 text-muted-foreground transition hover:rotate-45 focus-visible:rotate-45 hover:text-inherit focus-visible:text-inherit">
          <Send className="size-5" />
        </button>
      </div>
    </form>
  );
}

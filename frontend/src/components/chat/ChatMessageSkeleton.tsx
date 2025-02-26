import { cn } from "@/lib/utils";
import { Skeleton } from "../ui/skeleton";

type Props = {
  align?: "start" | "end";
};

export default function ChatMessageSkeleton({ align = "start" }: Props) {
  return (
    <div
      className={cn(
        "md:w-1/2 lg:w-1/3 min-h-18 rounded-2xl rounded-tl-none bg-muted-foreground/20 p-4 pb-3 flex gap-4 border shadow",
        align === "end" && "w-full rounded-2xl rounded-tr-none self-end"
      )}
    >
      <Skeleton className="w-full h-5 bg-background/50"></Skeleton>
      <Skeleton className="w-14 h-5 bg-background/50 self-end"></Skeleton>
    </div>
  );
}

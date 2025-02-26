import { cn, getInitials } from "@/lib/utils";

type Props = {
  name: string;
  isOnline?: boolean;
};

export default function Avatar({ name, isOnline }: Props) {
  return (
    <div
      className={cn(
        "relative before:absolute before:w-2 before:h-2 before:rounded-full before:bottom-0.5 before:end-0.5 before:bg-red-400",
        isOnline && "before:bg-green-400"
      )}
    >
      <div className="flex size-11 shrink-0 overflow-hidden rounded-full shadow">
        <div className="flex h-full w-full items-center justify-center rounded-full bg-muted">
          {getInitials(name)}
        </div>
      </div>
    </div>
  );
}

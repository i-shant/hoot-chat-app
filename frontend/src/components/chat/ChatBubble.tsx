import { cn } from "@/lib/utils";

type Props = {
  align?: "start" | "end";
  className?: string;
  children: React.ReactNode;
};

export default function ChatBubble({
  align = "start",
  className,
  children,
}: Props) {
  return (
    <li
      className={cn(
        "bg-muted self-start rounded-2xl rounded-bl-none max-w-3/4 xl:max-w-1/2 2xl:max-w-lg min-w-52 relative before:w-0 before:h-0 before:-z-20 before:absolute before:-bottom-2 before:-left-0.5 before:border-8 before:border-transparent before:border-t-muted before:-rotate-[60deg]",
        align === "end" &&
          "self-end rounded-2xl rounded-br-none before:left-auto before:-right-0.5 before:rotate-[60deg]",
        className
      )}
    >
      {children}
    </li>
  );
}

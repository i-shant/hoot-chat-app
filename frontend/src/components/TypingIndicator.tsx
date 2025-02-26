export default function TypingIndicator() {
  return (
    <div className="flex items-center space-x-2">
      <div
        className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30"
        style={{
          animation: "typing 1s infinite",
        }}
      ></div>
      <div
        className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30"
        style={{
          animation: "typing 1s infinite 100ms",
        }}
      ></div>
      <div
        className="w-2.5 h-2.5 rounded-full bg-muted-foreground/30"
        style={{
          animation: "typing 1s infinite 200ms",
        }}
      ></div>
    </div>
  );
}

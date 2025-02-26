import { Skeleton } from "../ui/skeleton";

export default function SidebarItemSkeleton() {
  return (
    <ul className="overflow-y-auto">
      {Array(5)
        .fill(null)
        .map((_, i) => (
          <li key={i} className="group">
            <div className="block ps-2 hover:bg-muted-foreground/10 focus-visible:bg-muted-foreground/10">
              <div className="flex items-center gap-2 group-last-of-type:mb-2">
                <div className="relative flex size-11 shrink-0 overflow-hidden rounded-full shadow">
                  <Skeleton className="flex h-full w-full items-center justify-center rounded-full bg-muted"></Skeleton>
                </div>
                <div className="h-20 flex-1 flex items-center gap-2 border-b ps-1 py-4 pe-3">
                  <div className="flex-1">
                    <Skeleton className="h-5 text-base line-clamp-1 mb-2"></Skeleton>
                    <Skeleton className="h-5 text-sm text-muted-foreground line-clamp-1"></Skeleton>
                  </div>
                  <div>
                    <Skeleton className="w-14 h-5 text-sm text-muted-foreground"></Skeleton>
                  </div>
                </div>
              </div>
            </div>
          </li>
        ))}
    </ul>
  );
}

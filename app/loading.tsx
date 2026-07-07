import { Skeleton } from "@/components/ui/Skeleton";

export default function Loading() {
  return (
    <div className="mx-auto flex w-full max-w-md flex-1 flex-col">
      <div className="h-14 border-b border-slate-100 bg-white" />
      <div className="space-y-3 px-5 py-5">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="rounded-2xl border border-slate-100 bg-white p-4">
            <Skeleton className="h-4 w-2/3" />
            <Skeleton className="mt-2 h-3 w-1/3" />
            <div className="mt-3 flex justify-between">
              <Skeleton className="h-5 w-24 rounded-full" />
              <Skeleton className="h-8 w-12" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

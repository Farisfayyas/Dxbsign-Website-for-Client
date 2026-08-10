import { site } from "@/lib/site-config";

export function ClientHonorRoll({ boxed = false }: { boxed?: boolean }) {
  const grid = (
    <div className="grid grid-cols-1 gap-x-7 gap-y-0 sm:grid-cols-2 lg:grid-cols-3">
      {site.clients.map((c) => (
        <div key={c} className="border-b border-[oklch(30%_0.01_250)] py-3 text-[15px] font-semibold tracking-[0.01em] text-white">
          {c}
        </div>
      ))}
    </div>
  );

  if (!boxed) return grid;

  return <div className="bg-ink p-[clamp(28px,4vw,40px)]">{grid}</div>;
}

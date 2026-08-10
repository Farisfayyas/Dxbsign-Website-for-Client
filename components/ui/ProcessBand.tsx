import { Reveal } from "./Reveal";
import { processSteps } from "@/lib/site-config";

export function ProcessBand() {
  return (
    <Reveal>
      <div className="bg-ink px-[clamp(24px,5vw,56px)] py-[clamp(40px,6vw,72px)]">
        <h2 className="mb-8 text-[26px] font-bold text-white">How We Work</h2>
        <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-6">
          {processSteps.map((p) => (
            <div key={p.num} className="border-l-2 border-blue pl-[18px]">
              <div className="mb-2 font-serif text-xs font-semibold text-[oklch(65%_0.08_250)]">{p.num}</div>
              <div className="mb-1.5 text-base font-semibold text-white">{p.title}</div>
              <div className="text-[13px] leading-relaxed text-[oklch(70%_0.01_250)]">{p.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </Reveal>
  );
}

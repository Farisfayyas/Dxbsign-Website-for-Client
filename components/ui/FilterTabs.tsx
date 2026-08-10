"use client";

export function FilterTabs<K extends string>({
  tabs,
  active,
  onChange,
}: {
  tabs: { key: K; label: string }[];
  active: K;
  onChange: (key: K) => void;
}) {
  return (
    <div className="section-x flex flex-wrap gap-2.5 pt-8">
      {tabs.map((t) => {
        const isActive = t.key === active;
        return (
          <button
            key={t.key}
            type="button"
            onClick={() => onChange(t.key)}
            className={`border px-[18px] py-2.5 text-[13px] font-semibold transition-colors duration-200 ${
              isActive
                ? "border-ink bg-ink text-white"
                : "border-border-soft bg-white text-ink-soft hover:border-ink/40"
            }`}
          >
            {t.label}
          </button>
        );
      })}
    </div>
  );
}

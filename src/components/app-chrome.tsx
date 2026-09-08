import { Link, useRouterState } from "@tanstack/react-router";
import { Activity, Hospital, Stethoscope, UserRound } from "lucide-react";
import { cn } from "@/lib/cn";
import { useSetu } from "@/lib/store";

const NAV = [
  { to: "/patient", label: "Patient", icon: UserRound },
  { to: "/doctor", label: "Clinician", icon: Stethoscope },
  { to: "/hospital", label: "Hospital", icon: Hospital },
] as const;

export function BrandMark({ compact }: { compact?: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2.5 text-ink no-underline">
      <span className="flex size-8 items-center justify-center rounded-[10px] bg-primary text-primary-fg">
        <Activity className="size-4" strokeWidth={2.2} />
      </span>
      {!compact && (
        <span className="leading-tight">
          <span className="block font-display text-[17px] font-medium tracking-tight">Setu</span>
          <span className="block text-[11px] text-muted">ABDM follow-up layer</span>
        </span>
      )}
    </Link>
  );
}

export function RoleSwitch() {
  const path = useRouterState({ select: (s) => s.location.pathname });
  return (
    <nav
      className="flex rounded-[var(--radius-md)] border border-border bg-surface p-1"
      aria-label="Switch role"
    >
      {NAV.map((item) => {
        const active = path.startsWith(item.to);
        const Icon = item.icon;
        return (
          <Link
            key={item.to}
            to={item.to}
            className={cn(
              "flex h-9 items-center gap-1.5 rounded-[8px] px-3 text-sm no-underline transition-colors",
              active ? "bg-primary text-primary-fg" : "text-muted hover:text-ink",
            )}
          >
            <Icon className="size-3.5" />
            <span className="hidden sm:inline">{item.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

export function TopBar({ title, subtitle }: { title?: string; subtitle?: string }) {
  const reset = useSetu((s) => s.resetDemo);
  return (
    <header className="sticky top-0 z-20 border-b border-border bg-bg/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
        <BrandMark />
        <div className="hidden min-w-0 flex-1 md:block">
          {title && <p className="truncate text-sm font-medium text-ink">{title}</p>}
          {subtitle && <p className="truncate text-xs text-muted">{subtitle}</p>}
        </div>
        <div className="ml-auto flex items-center gap-2">
          <button
            type="button"
            onClick={reset}
            className="hidden h-9 rounded-[8px] px-3 text-xs text-muted hover:bg-surface-2 sm:inline"
          >
            Reset demo
          </button>
          <RoleSwitch />
        </div>
      </div>
    </header>
  );
}

export function HumanLoopNote() {
  return (
    <p className="rounded-[var(--radius-md)] border border-border bg-surface px-3 py-2 text-xs text-muted">
      AI listens, reads, and organizes. A doctor still decides everything.
    </p>
  );
}

import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Hospital, Mic, Stethoscope } from "lucide-react";
import { BrandMark } from "@/components/app-chrome";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  return (
    <main className="min-h-dvh bg-bg">
      <header className="mx-auto flex max-w-5xl items-center justify-between px-5 py-5">
        <BrandMark />
        <p className="hidden text-xs text-muted sm:block">Prototype on ABDM / ABHA</p>
      </header>

      <section className="mx-auto max-w-5xl px-5 pb-16 pt-6 sm:pt-14">
        <p className="text-xs font-medium uppercase tracking-[0.16em] text-primary">
          Portable follow-up layer
        </p>
        <h1 className="mt-3 max-w-2xl font-display text-4xl font-medium tracking-tight text-ink sm:text-5xl">
          AI listens between visits. A doctor still decides everything.
        </h1>
        <p className="mt-5 max-w-xl text-base text-muted">
          Setu is the listening layer on ABDM: voice check-ins, photographed reports, adherence
          reasons, and shortage signals — routed to a human, then written back to ABHA.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button asChild>
            <Link to="/patient">
              Open patient check-in <ArrowRight />
            </Link>
          </Button>
          <Button asChild variant="outline">
            <Link to="/doctor">Clinician queue</Link>
          </Button>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          <PortalCard
            to="/patient"
            icon={Mic}
            kicker="Patient"
            title="Voice-first check-in"
            copy="Thirty-second check-in. Reports appear only after a clinician releases them."
          />
          <PortalCard
            to="/doctor"
            icon={Stethoscope}
            kicker="Clinician"
            title="Parallel queues"
            copy="Doctor and team notified together. First to act claims the item. Nothing auto-releases."
          />
          <PortalCard
            to="/hospital"
            icon={Hospital}
            kicker="Hospital"
            title="Operations roll-up"
            copy="Queue health, adherence reasons, shortage early-warning, ABHA sync — same pipeline, one level up."
          />
        </div>

        <ol className="mt-12 grid gap-3 text-sm text-muted sm:grid-cols-3">
          <li className="rounded-[var(--radius-lg)] border border-border bg-surface p-4">
            <span className="font-mono text-xs text-subtle">01</span>
            <p className="mt-1 text-ink">Check in as Meera — miss a dose or photograph a lab slip.</p>
          </li>
          <li className="rounded-[var(--radius-lg)] border border-border bg-surface p-4">
            <span className="font-mono text-xs text-subtle">02</span>
            <p className="mt-1 text-ink">Open the clinician queue, claim, then release to the patient.</p>
          </li>
          <li className="rounded-[var(--radius-lg)] border border-border bg-surface p-4">
            <span className="font-mono text-xs text-subtle">03</span>
            <p className="mt-1 text-ink">Watch shortage tallies and hospital panels move with the same data.</p>
          </li>
        </ol>
      </section>
    </main>
  );
}

function PortalCard({
  to,
  icon: Icon,
  kicker,
  title,
  copy,
}: {
  to: "/patient" | "/doctor" | "/hospital";
  icon: typeof Mic;
  kicker: string;
  title: string;
  copy: string;
}) {
  return (
    <Link
      to={to}
      className="group flex flex-col rounded-[var(--radius-xl)] border border-border bg-surface p-5 no-underline transition-transform duration-200 hover:-translate-y-0.5"
    >
      <span className="flex size-10 items-center justify-center rounded-[12px] bg-primary-soft text-primary">
        <Icon className="size-5" />
      </span>
      <p className="mt-5 text-xs font-medium uppercase tracking-[0.14em] text-muted">{kicker}</p>
      <h2 className="mt-1 font-display text-xl font-medium text-ink">{title}</h2>
      <p className="mt-2 flex-1 text-sm text-muted">{copy}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">
        Enter <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}

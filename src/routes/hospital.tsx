import { createFileRoute } from "@tanstack/react-router";
import type { ReactNode } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { HumanLoopNote, TopBar } from "@/components/app-chrome";
import { buildHospitalCopy, isOpenStatus, shortageAlerts, useSetu } from "@/lib/store";
import { REASON_LABEL, type ReasonCode } from "@/lib/types";

export const Route = createFileRoute("/hospital")({ component: HospitalApp });

function HospitalApp() {
  const items = useSetu((s) => s.items);
  const shortages = useSetu((s) => s.shortages);
  const patients = useSetu((s) => s.patients);
  const onboarded = useSetu((s) => s.abhaOnboarded);
  const ok = useSetu((s) => s.abhaOk);
  const fail = useSetu((s) => s.abhaFail);
  const abha = { onboarded, ok, fail };

  const depts = ["Cardiology", "Endocrinology", "Obstetrics", "General medicine"];
  const queueHealth = depts.map((d) => {
    const open = items.filter((i) => i.department === d && isOpenStatus(i.status));
    const stale = open.filter((i) => Date.now() - +new Date(i.createdAt) > 4 * 3600_000);
    return { dept: d, open: open.length, stale: stale.length };
  });

  const reasonRows = (["forgot", "side_effects", "unavailable", "other"] as ReasonCode[]).map((code) => ({
    name: REASON_LABEL[code],
    n: items.filter((i) => i.reason === code).length,
  }));

  const followUps = patients.length;
  const completedish = items.filter((i) => i.status === "released").length;

  const alerts = shortageAlerts(shortages);
  const narrative = buildHospitalCopy({ items, shortages, abhaFail: abha.fail });

  const workload = depts.map((d) => ({
    dept: d,
    load: items.filter((i) => i.department === d && i.status !== "released").length,
  }));

  return (
    <div className="min-h-dvh bg-bg">
      <TopBar title="Hospital operations" subtitle="Same pipeline, aggregated one level higher" />
      <div className="mx-auto max-w-6xl space-y-4 px-4 py-5 pb-16">
        <HumanLoopNote />

        <section className="rounded-[var(--radius-xl)] border border-border bg-surface p-5">
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted">
            AI-generated summary — organizing known data, not a decision
          </p>
          <p className="mt-2 font-display text-xl leading-snug text-ink">{narrative}</p>
        </section>

        <div className="grid gap-4 md:grid-cols-2">
          <Panel title="Queue health" kicker="SLA-style acknowledgements">
            <ul className="space-y-2">
              {queueHealth.map((row) => (
                <li key={row.dept} className="flex items-center justify-between text-sm">
                  <span>{row.dept}</span>
                  <span className="tabular-nums text-muted">
                    {row.open} open
                    {row.stale > 0 ? <span className="ml-2 text-alert">{row.stale} stale</span> : null}
                  </span>
                </li>
              ))}
            </ul>
          </Panel>

          <Panel title="Follow-up compliance" kicker="Reason codes across all patients">
            <p className="mb-2 text-sm text-muted">
              {completedish} released items · {followUps} patients on the roster
            </p>
            <div className="h-40">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={reasonRows} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
                  <CartesianGrid stroke="var(--color-border)" vertical={false} />
                  <XAxis dataKey="name" tick={{ fontSize: 11, fill: "var(--color-muted)" }} />
                  <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: "var(--color-muted)" }} />
                  <Tooltip
                    contentStyle={{
                      background: "var(--color-surface)",
                      border: "1px solid var(--color-border)",
                      borderRadius: 8,
                      fontSize: 12,
                    }}
                  />
                  <Bar dataKey="n" fill="var(--color-primary)" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Panel>

          <Panel title="Shortage signal" kicker="From real patient “unavailable” reports">
            {alerts.length > 0 && (
              <p className="mb-2 rounded-[8px] bg-alert-soft px-2 py-1 text-sm text-alert">
                Threshold crossed: {alerts.map((a) => `${a.drug} (${a.count})`).join(", ")}
              </p>
            )}
            <ul className="space-y-2 text-sm">
              {shortages
                .slice()
                .sort((a, b) => b.count - a.count)
                .map((s) => (
                  <li key={`${s.drug}-${s.location}`} className="flex justify-between gap-2">
                    <span>
                      {s.drug}
                      <span className="block text-xs text-muted">{s.location}</span>
                    </span>
                    <span className="tabular-nums font-medium">{s.count}</span>
                  </li>
                ))}
            </ul>
          </Panel>

          <Panel title="ABDM / ABHA sync" kicker="Infrastructure health, not clinical">
            <dl className="grid grid-cols-3 gap-2 text-center">
              <Stat n={abha.onboarded} l="Onboarded" />
              <Stat n={abha.ok} l="Exchanges ok" />
              <Stat n={abha.fail} l="Failures" alert={abha.fail > 0} />
            </dl>
          </Panel>
        </div>

        <Panel title="Staff workload" kicker="Who is overloaded — planning, not per-item">
          <ul className="grid gap-2 sm:grid-cols-4">
            {workload.map((w) => (
              <li key={w.dept} className="rounded-[var(--radius-md)] bg-bg p-3">
                <p className="text-xs text-muted">{w.dept}</p>
                <p className="font-display text-2xl tabular-nums">{w.load}</p>
                <p className="text-xs text-muted">open items</p>
              </li>
            ))}
          </ul>
        </Panel>
      </div>
    </div>
  );
}

function Panel({ title, kicker, children }: { title: string; kicker: string; children: ReactNode }) {
  return (
    <section className="rounded-[var(--radius-xl)] border border-border bg-surface p-5">
      <h2 className="font-display text-xl">{title}</h2>
      <p className="mb-3 text-xs text-muted">{kicker}</p>
      {children}
    </section>
  );
}

function Stat({ n, l, alert }: { n: number; l: string; alert?: boolean }) {
  return (
    <div className="rounded-[var(--radius-md)] bg-bg p-3">
      <p className={`font-display text-2xl tabular-nums ${alert ? "text-alert" : ""}`}>{n}</p>
      <p className="text-xs text-muted">{l}</p>
    </div>
  );
}

import { createFileRoute } from "@tanstack/react-router";
import { formatDistanceToNow } from "date-fns";
import { useMemo, useState } from "react";
import { HumanLoopNote, TopBar } from "@/components/app-chrome";
import { PriorityBadge, StatusBadge } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { clinicians, isOpenStatus, useSetu } from "@/lib/store";
import { REASON_LABEL, type QueueItem } from "@/lib/types";
import { cn } from "@/lib/cn";

export const Route = createFileRoute("/doctor")({ component: DoctorApp });

function DoctorApp() {
  const items = useSetu((s) => s.items);
  const patients = useSetu((s) => s.patients);
  const doctorId = useSetu((s) => s.currentDoctorId);
  const doctor = clinicians.find((c) => c.id === doctorId)!;
  const [tab, setTab] = useState<"mine" | "team">("mine");
  const firstOpen = items.find((i) => isOpenStatus(i.status))?.id ?? items[0]?.id ?? null;
  const [selectedId, setSelectedId] = useState<string | null>(firstOpen);

  const mine = useMemo(
    () =>
      items.filter((i) => {
        const p = patients.find((x) => x.id === i.patientId);
        return p?.doctorId === doctorId || p?.department === doctor.department;
      }),
    [items, patients, doctorId, doctor.department],
  );
  const list = tab === "mine" ? mine : items;
  const selected = items.find((i) => i.id === selectedId) ?? list[0];
  const markSeen = useSetu((s) => s.markSeen);

  return (
    <div className="min-h-dvh bg-bg">
      <TopBar title={doctor.name} subtitle={`${doctor.department} · parallel notification`} />
      <div className="mx-auto grid max-w-6xl gap-4 px-4 py-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]">
        <section>
          <HumanLoopNote />
          <div className="mt-3 flex rounded-[var(--radius-md)] border border-border bg-surface p-1">
            {(
              [
                ["mine", "My queue"],
                ["team", "Team queue"],
              ] as const
            ).map(([key, label]) => (
              <button
                key={key}
                type="button"
                onClick={() => setTab(key)}
                className={cn(
                  "h-11 flex-1 rounded-[8px] text-sm",
                  tab === key ? "bg-primary text-primary-fg" : "text-muted",
                )}
              >
                {label}
              </button>
            ))}
          </div>
          <ul className="mt-3 space-y-2">
            {list.map((item) => {
              const p = patients.find((x) => x.id === item.patientId);
              const active = selected?.id === item.id;
              return (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedId(item.id);
                      markSeen(item.id);
                    }}
                    className={cn(
                      "min-h-11 w-full rounded-[var(--radius-lg)] border px-3 py-3 text-left",
                      active ? "border-primary bg-primary-soft" : "border-border bg-surface",
                    )}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-medium">{p?.name}</p>
                        <p className="text-xs text-muted">
                          {item.kind === "checkin" ? "Voice check-in" : "Lab report"} · {item.department}
                        </p>
                      </div>
                      <PriorityBadge value={item.priority} />
                    </div>
                    <div className="mt-2 flex min-w-0 items-center justify-between gap-2">
                      <StatusBadge value={item.status} />
                      <span className="truncate text-[11px] text-subtle">
                        {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
                      </span>
                    </div>
                    {item.claimedByName && (
                      <p className="mt-1 text-[11px] text-muted">Claimed by {item.claimedByName}</p>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </section>
        {selected ? (
          <CaseDetail item={selected} doctorId={doctorId} />
        ) : (
          <p className="text-sm text-muted">Queue is empty.</p>
        )}
      </div>
    </div>
  );
}

function CaseDetail({ item, doctorId }: { item: QueueItem; doctorId: string }) {
  const patients = useSetu((s) => s.patients);
  const allItems = useSetu((s) => s.items);
  const history = allItems.filter((i) => i.patientId === item.patientId);
  const claim = useSetu((s) => s.claim);
  const release = useSetu((s) => s.release);
  const escalate = useSetu((s) => s.escalate);
  const addNote = useSetu((s) => s.addNote);
  const scheduleFollowUp = useSetu((s) => s.scheduleFollowUp);
  const patient = patients.find((p) => p.id === item.patientId);
  if (!patient) return null;

  return (
    <article className="rounded-[var(--radius-xl)] border border-border bg-surface p-5">
      <div className="flex flex-wrap items-start justify-between gap-2">
        <div>
          <p className="text-xs uppercase tracking-[0.14em] text-muted">{item.department}</p>
          <h2 className="font-display text-2xl">{patient.name}</h2>
          <p className="text-sm text-muted">
            {patient.age}
            {patient.sex} · {patient.condition} · ABHA {patient.abhaId}
          </p>
        </div>
        <PriorityBadge value={item.priority} />
      </div>

      <dl className="mt-4 grid grid-cols-2 gap-2 text-sm">
        <div className="rounded-[var(--radius-sm)] bg-bg p-2">
          <dt className="text-xs text-muted">Type</dt>
          <dd>{item.kind === "checkin" ? "Voice check-in" : "Lab report"}</dd>
        </div>
        <div className="rounded-[var(--radius-sm)] bg-bg p-2">
          <dt className="text-xs text-muted">Reason</dt>
          <dd>{item.reason ? REASON_LABEL[item.reason] : "—"}</dd>
        </div>
      </dl>

      {item.transcript && (
        <blockquote className="mt-3 border-l-2 border-primary pl-3 text-sm italic">“{item.transcript}”</blockquote>
      )}

      {item.tests && (
        <table className="mt-3 w-full text-left text-sm">
          <thead className="text-xs text-muted">
            <tr>
              <th className="py-1 font-medium">Test</th>
              <th className="py-1 font-medium">Value</th>
              <th className="py-1 font-medium">Printed range</th>
            </tr>
          </thead>
          <tbody>
            {item.tests.map((t) => (
              <tr key={t.name} className={t.flagged ? "text-alert" : ""}>
                <td className="py-1">{t.name}</td>
                <td className="py-1 tabular-nums">
                  {t.value} {t.unit}
                </td>
                <td className="py-1 tabular-nums text-muted">{t.low != null ? `${t.low}–${t.high}` : "—"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      <div className="mt-4 rounded-[var(--radius-md)] bg-bg p-3">
        <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted">
          AI-generated summary — not a recommendation
        </p>
        <p className="mt-1 text-sm leading-relaxed">{item.summary}</p>
      </div>

      {item.notes.length > 0 && (
        <ul className="mt-3 space-y-1 text-xs text-muted">
          {item.notes.map((n) => (
            <li key={n}>· {n}</li>
          ))}
        </ul>
      )}

      <p className="mt-4 text-xs text-muted">
        Prior items for this patient: {history.length}. Seen and acknowledged are tracked separately — glancing does
        not close a case.
      </p>

      <div className="mt-4 flex flex-wrap gap-2">
        <Button size="sm" onClick={() => claim(item.id, doctorId)} disabled={!!item.claimedBy}>
          {item.claimedByName ? `Claimed by ${item.claimedByName}` : "Acknowledge / claim"}
        </Button>
        <Button size="sm" variant="secondary" onClick={() => release(item.id, doctorId)} disabled={item.released}>
          {item.released ? "Released to patient" : "Release to patient"}
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => addNote(item.id, "Requested alternative medicine / pharmacy workaround.")}
        >
          Request alternative
        </Button>
        <Button
          size="sm"
          variant="outline"
          onClick={() => scheduleFollowUp(item.patientId, "Follow-up brought forward · 7 days")}
        >
          Schedule follow-up
        </Button>
        <Button size="sm" variant="danger" onClick={() => escalate(item.id, doctorId)}>
          Escalate
        </Button>
      </div>
    </article>
  );
}

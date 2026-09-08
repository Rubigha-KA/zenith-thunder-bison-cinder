import { createFileRoute } from "@tanstack/react-router";
import { Camera, Check, ChevronLeft, Mic, Pill } from "lucide-react";
import { useMemo, useState } from "react";
import { HumanLoopNote, TopBar } from "@/components/app-chrome";
import { PatientStatusChip } from "@/components/status-badge";
import { Button } from "@/components/ui/button";
import { SAMPLE_REPORTS, SAMPLE_UTTERANCES } from "@/lib/seed";
import { usePatient, useSetu } from "@/lib/store";
import { REASON_LABEL, type Patient, type QueueItem, type ReasonCode } from "@/lib/types";
import { formatDistanceToNow } from "date-fns";

export const Route = createFileRoute("/patient")({ component: PatientApp });

type Flow = "home" | "voice" | "camera" | "sent";

function PatientApp() {
  const patient = usePatient();
  const allItems = useSetu((s) => s.items);
  const items = allItems.filter((i) => i.patientId === patient.id);
  const [flow, setFlow] = useState<Flow>("home");

  return (
    <div className="min-h-dvh bg-bg">
      <TopBar title={patient.name} subtitle={`${patient.condition} · ABHA ${patient.abhaId}`} />
      <div className="mx-auto max-w-md px-4 py-5 pb-16">
        {flow === "home" && <Home patient={patient} items={items} onGo={setFlow} />}
        {flow === "voice" && <VoiceFlow onBack={() => setFlow("home")} onDone={() => setFlow("sent")} />}
        {flow === "camera" && <CameraFlow onBack={() => setFlow("home")} onDone={() => setFlow("sent")} />}
        {flow === "sent" && <Sent onHome={() => setFlow("home")} />}
      </div>
    </div>
  );
}

function Home({
  patient,
  items,
  onGo,
}: {
  patient: Patient;
  items: QueueItem[];
  onGo: (f: Flow) => void;
}) {
  const released = items.filter((i) => i.kind === "report" && i.released);
  const timeline = [...items].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));

  return (
    <div className="space-y-4">
      <HumanLoopNote />
      <button
        type="button"
        onClick={() => onGo("voice")}
        className="flex w-full flex-col items-center rounded-[var(--radius-xl)] bg-primary px-6 py-8 text-primary-fg"
      >
        <span className="flex size-16 items-center justify-center rounded-full bg-primary-fg/10">
          <Mic className="size-7" />
        </span>
        <span className="mt-4 font-display text-2xl font-medium">How are you feeling?</span>
        <span className="mt-1 text-sm text-primary-fg/80">Voice check-in · under 30 seconds</span>
      </button>

      <div className="rounded-[var(--radius-lg)] border border-border bg-surface p-4">
        <p className="text-xs font-medium uppercase tracking-[0.12em] text-muted">Upcoming</p>
        <p className="mt-1 font-display text-lg text-ink">{patient.nextFollowUpLabel}</p>
        <p className="text-sm text-muted">
          {patient.doctorName} · {patient.department}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => onGo("camera")}
          className="flex min-h-28 flex-col items-start rounded-[var(--radius-lg)] border border-border bg-surface p-4 text-left"
        >
          <Camera className="size-5 text-primary" />
          <span className="mt-3 text-sm font-medium">Photograph report</span>
          <span className="text-xs text-muted">OCR on device, you confirm</span>
        </button>
        <div className="rounded-[var(--radius-lg)] border border-border bg-surface p-4">
          <Pill className="size-5 text-primary" />
          <p className="mt-3 text-sm font-medium">Today’s medicines</p>
          <p className="text-xs text-muted">{patient.meds.map((m) => m.name).join(" · ")}</p>
        </div>
      </div>

      {released.length > 0 && (
        <section>
          <h2 className="font-display text-lg">Released reports</h2>
          <ul className="mt-2 space-y-2">
            {released.map((r) => (
              <li key={r.id} className="rounded-[var(--radius-md)] border border-border bg-surface p-3">
                <div className="flex items-center justify-between gap-2">
                  <p className="text-sm font-medium">Lab report</p>
                  <PatientStatusChip value={r.status} />
                </div>
                <p className="mt-1 text-xs text-muted">Reviewed by {r.reviewerName}</p>
                <ul className="mt-2 space-y-0.5 text-sm">
                  {r.tests?.map((t) => (
                    <li key={t.name} className={t.flagged ? "text-alert" : "text-ink"}>
                      {t.name} {t.value} {t.unit}
                      {t.flagged ? " · outside printed range" : ""}
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section>
        <h2 className="font-display text-lg">Timeline</h2>
        {timeline.length === 0 ? (
          <p className="mt-2 text-sm text-muted">No check-ins yet.</p>
        ) : (
          <ol className="mt-2 space-y-2">
            {timeline.map((i) => (
              <li
                key={i.id}
                className="flex items-start justify-between gap-3 rounded-[var(--radius-md)] border border-border bg-surface px-3 py-2.5"
              >
                <div>
                  <p className="text-sm font-medium">
                    {i.kind === "checkin" ? (i.reason ? REASON_LABEL[i.reason] : "Check-in") : "Lab report"}
                  </p>
                  <p className="text-xs text-muted">
                    {formatDistanceToNow(new Date(i.createdAt), { addSuffix: true })}
                    {i.released ? "" : " · waiting on your care team"}
                  </p>
                </div>
                <PatientStatusChip value={i.status} />
              </li>
            ))}
          </ol>
        )}
      </section>
    </div>
  );
}

function VoiceFlow({ onBack, onDone }: { onBack: () => void; onDone: () => void }) {
  const submit = useSetu((s) => s.submitCheckIn);
  const patient = usePatient();
  const [listening, setListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [reason, setReason] = useState<ReasonCode | null>(null);
  const askWhy = reason !== null && reason !== "taken";

  function capture(text: string) {
    setTranscript(text);
    const lower = text.toLowerCase();
    if (lower.includes("took") || lower.startsWith("yes")) setReason("taken");
    else if (lower.includes("nause") || lower.includes("side")) setReason("side_effects");
    else if (lower.includes("pharmacy") || lower.includes("stock") || lower.includes("don't have"))
      setReason("unavailable");
    else if (lower.includes("forgot")) setReason("forgot");
    else setReason("other");
  }

  function listenDemo() {
    setListening(true);
    window.setTimeout(() => {
      setListening(false);
      capture(SAMPLE_UTTERANCES[3].text);
    }, 1100);
  }

  function send() {
    if (!transcript || !reason) return;
    submit({
      transcript,
      reason,
      medicine: reason === "unavailable" ? patient.meds[0]?.name : undefined,
    });
    onDone();
  }

  return (
    <div className="space-y-4">
      <button type="button" onClick={onBack} className="inline-flex min-h-11 items-center gap-1 text-sm text-muted">
        <ChevronLeft className="size-4" /> Home
      </button>
      <h1 className="font-display text-2xl">Did you take your medicine today?</h1>
      <p className="text-sm text-muted">Speak naturally. Classification stays on-device in the real app.</p>

      <button
        type="button"
        onClick={listenDemo}
        className="flex w-full flex-col items-center rounded-[var(--radius-xl)] border border-border bg-surface py-8"
      >
        <span
          className={`flex size-16 items-center justify-center rounded-full ${listening ? "bg-alert-soft text-alert" : "bg-primary-soft text-primary"}`}
        >
          <Mic className="size-7" />
        </span>
        <span className="mt-3 text-sm">{listening ? "Listening…" : "Tap to speak (demo)"}</span>
      </button>

      <p className="text-xs text-muted">Or pick a sample utterance</p>
      <div className="flex flex-wrap gap-2">
        {SAMPLE_UTTERANCES.map((u) => (
          <button
            key={u.label}
            type="button"
            onClick={() => capture(u.text)}
            className="h-11 rounded-full border border-border bg-surface px-3 text-sm"
          >
            {u.label}
          </button>
        ))}
      </div>

      {transcript && (
        <blockquote className="rounded-[var(--radius-md)] border border-border bg-surface p-3 text-sm italic text-ink">
          “{transcript}”
        </blockquote>
      )}

      {reason && (
        <div>
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-muted">Reason classified</p>
          <div className="mt-2 flex flex-wrap gap-2">
            {(["taken", "forgot", "side_effects", "unavailable", "other"] as ReasonCode[]).map((code) => (
              <button
                key={code}
                type="button"
                onClick={() => setReason(code)}
                className={`h-11 rounded-full px-3 text-sm ${reason === code ? "bg-primary text-primary-fg" : "border border-border bg-surface"}`}
              >
                {REASON_LABEL[code]}
              </button>
            ))}
          </div>
        </div>
      )}

      {askWhy && reason === "unavailable" && (
        <p className="text-sm text-muted">
          This will create a task for {patient.doctorName} and add to the {patient.meds[0]?.name} shortage tally
          in {patient.location}.
        </p>
      )}

      <Button className="w-full" disabled={!reason} onClick={send}>
        Send to care team
      </Button>
    </div>
  );
}

function CameraFlow({ onBack, onDone }: { onBack: () => void; onDone: () => void }) {
  const submit = useSetu((s) => s.submitReport);
  const [pick, setPick] = useState<(typeof SAMPLE_REPORTS)[number] | null>(null);
  const [confirmed, setConfirmed] = useState(false);
  const sample = useMemo(() => pick ?? SAMPLE_REPORTS[0], [pick]);

  function send() {
    if (!pick) return;
    submit({ ocrText: pick.ocrText, tests: pick.tests ?? [] });
    onDone();
  }

  return (
    <div className="space-y-4">
      <button type="button" onClick={onBack} className="inline-flex min-h-11 items-center gap-1 text-sm text-muted">
        <ChevronLeft className="size-4" /> Home
      </button>
      <h1 className="font-display text-2xl">Photograph a report</h1>
      <p className="text-sm text-muted">
        On-device OCR reads the slip. You confirm the text before it leaves the phone.
      </p>

      <div className="flex flex-wrap gap-2">
        {SAMPLE_REPORTS.map((r) => (
          <button
            key={r.label}
            type="button"
            onClick={() => {
              setPick(r);
              setConfirmed(false);
            }}
            className={`h-11 rounded-full px-3 text-sm ${pick?.label === r.label ? "bg-primary text-primary-fg" : "border border-border bg-surface"}`}
          >
            {r.label}
          </button>
        ))}
      </div>

      {pick && (
        <div className="rounded-[var(--radius-lg)] border border-border bg-surface p-4">
          <p className="text-xs font-medium uppercase tracking-[0.12em] text-muted">OCR preview</p>
          <p className="mt-2 font-mono text-xs leading-relaxed text-ink">{sample.ocrText}</p>
          <ul className="mt-3 space-y-1 text-sm">
            {sample.tests?.map((t) => (
              <li key={t.name} className={t.flagged ? "text-alert" : ""}>
                {t.name}: {t.value} {t.unit}
                {t.low != null ? ` (${t.low}–${t.high})` : ""}
                {t.flagged ? " · flagged vs printed range" : ""}
              </li>
            ))}
          </ul>
          <label className="mt-3 flex min-h-11 items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={confirmed}
              onChange={(e) => setConfirmed(e.target.checked)}
              className="size-4 accent-[var(--color-primary)]"
            />
            Text was read correctly
          </label>
        </div>
      )}

      <Button className="w-full" disabled={!pick || !confirmed} onClick={send}>
        Submit for review
      </Button>
    </div>
  );
}

function Sent({ onHome }: { onHome: () => void }) {
  return (
    <div className="flex flex-col items-center py-16 text-center">
      <span className="flex size-14 items-center justify-center rounded-full bg-ok-soft text-ok">
        <Check className="size-7" />
      </span>
      <h1 className="mt-4 font-display text-2xl">Sent to your care team</h1>
      <p className="mt-2 max-w-xs text-sm text-muted">
        Nothing is shown back to you until a person reviews it. Switch to Clinician to continue the demo.
      </p>
      <Button className="mt-6" onClick={onHome}>
        Back home
      </Button>
    </div>
  );
}

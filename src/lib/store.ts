import { create } from "zustand";
import {
  classifyReason,
  flagTests,
  hospitalNarrative,
  itemPriority,
  organizeSummary,
  routeDepartment,
} from "./engine";
import {
  DEMO_DOCTOR_ID,
  DEMO_PATIENT_ID,
  clinicians,
  patients,
  seedItems,
  seedShortages,
} from "./seed";
import type {
  ItemStatus,
  LabTest,
  Patient,
  QueueItem,
  ReasonCode,
  ShortageRow,
} from "./types";

const SHORTAGE_THRESHOLD = 3;

interface SetuState {
  patients: Patient[];
  items: QueueItem[];
  shortages: ShortageRow[];
  abhaOnboarded: number;
  abhaOk: number;
  abhaFail: number;
  currentPatientId: string;
  currentDoctorId: string;
  resetDemo: () => void;
  submitCheckIn: (input: { transcript: string; reason?: ReasonCode; medicine?: string }) => QueueItem;
  submitReport: (input: { ocrText: string; tests: LabTest[] }) => QueueItem;
  markSeen: (id: string) => void;
  claim: (id: string, clinicianId: string) => void;
  release: (id: string, clinicianId: string) => void;
  escalate: (id: string, clinicianId: string) => void;
  addNote: (id: string, note: string) => void;
  scheduleFollowUp: (patientId: string, label: string) => void;
}

function nid(prefix: string) {
  return `${prefix}-${Math.random().toString(36).slice(2, 8)}`;
}

function bumpShortage(rows: ShortageRow[], drug: string, location: string): ShortageRow[] {
  const i = rows.findIndex((r) => r.drug === drug && r.location === location);
  if (i === -1) return [...rows, { drug, location, count: 1, windowHours: 24 }];
  return rows.map((r, idx) => (idx === i ? { ...r, count: r.count + 1 } : r));
}

export const useSetu = create<SetuState>()((set, get) => ({
  patients,
  items: seedItems,
  shortages: seedShortages,
  abhaOnboarded: 48,
  abhaOk: 44,
  abhaFail: 2,
  currentPatientId: DEMO_PATIENT_ID,
  currentDoctorId: DEMO_DOCTOR_ID,
  resetDemo: () =>
    set({
      patients: structuredClone(patients),
      items: structuredClone(seedItems),
      shortages: structuredClone(seedShortages),
      abhaOnboarded: 48,
      abhaOk: 44,
      abhaFail: 2,
    }),
  submitCheckIn: ({ transcript, reason, medicine }) => {
    const patient = get().patients.find((p) => p.id === get().currentPatientId)!;
    const code = reason ?? classifyReason(transcript);
    const med = medicine ?? (code === "unavailable" ? patient.meds[0]?.name : undefined);
    const historyCount = get().items.filter((i) => i.patientId === patient.id && i.kind === "checkin").length;
    const item: QueueItem = {
      id: nid("q"),
      kind: "checkin",
      patientId: patient.id,
      createdAt: new Date().toISOString(),
      transcript,
      reason: code,
      medicine: med,
      department: patient.department,
      priority: itemPriority({ reason: code }),
      status: "new",
      released: false,
      notes: [],
      summary: organizeSummary({
        patientName: patient.name,
        kind: "checkin",
        reason: code,
        transcript,
        medicine: med,
        historyCount,
      }),
    };
    set((s) => ({
      items: [item, ...s.items],
      shortages: code === "unavailable" && med ? bumpShortage(s.shortages, med, patient.location) : s.shortages,
    }));
    return item;
  },
  submitReport: ({ ocrText, tests }) => {
    const patient = get().patients.find((p) => p.id === get().currentPatientId)!;
    const flagged = flagTests(tests);
    const dept = routeDepartment(flagged, patient.department);
    const item: QueueItem = {
      id: nid("q"),
      kind: "report",
      patientId: patient.id,
      createdAt: new Date().toISOString(),
      ocrText,
      tests: flagged,
      department: dept,
      priority: itemPriority({ tests: flagged }),
      status: "new",
      released: false,
      notes: [],
      summary: organizeSummary({
        patientName: patient.name,
        kind: "report",
        tests: flagged,
        historyCount: 0,
      }),
    };
    set((s) => ({ items: [item, ...s.items] }));
    return item;
  },
  markSeen: (id) =>
    set((s) => ({
      items: s.items.map((i) => (i.id === id && i.status === "new" ? { ...i, status: "seen" } : i)),
    })),
  claim: (id, clinicianId) => {
    const c = clinicians.find((x) => x.id === clinicianId);
    set((s) => ({
      items: s.items.map((i) =>
        i.id === id
          ? {
              ...i,
              status: i.status === "escalated" ? "escalated" : "acknowledged",
              claimedBy: clinicianId,
              claimedByName: c?.name,
            }
          : i,
      ),
    }));
  },
  release: (id, clinicianId) => {
    const c = clinicians.find((x) => x.id === clinicianId);
    set((s) => ({
      items: s.items.map((i) =>
        i.id === id
          ? {
              ...i,
              status: "released",
              released: true,
              claimedBy: i.claimedBy ?? clinicianId,
              claimedByName: i.claimedByName ?? c?.name,
              reviewerName: c?.name,
            }
          : i,
      ),
    }));
  },
  escalate: (id, clinicianId) => {
    const c = clinicians.find((x) => x.id === clinicianId);
    set((s) => ({
      items: s.items.map((i) =>
        i.id === id
          ? {
              ...i,
              status: "escalated",
              priority: "alert",
              claimedBy: clinicianId,
              claimedByName: c?.name,
              notes: [...i.notes, "Escalated with high-priority re-notify."],
            }
          : i,
      ),
    }));
  },
  addNote: (id, note) =>
    set((s) => ({
      items: s.items.map((i) => (i.id === id ? { ...i, notes: [...i.notes, note] } : i)),
    })),
  scheduleFollowUp: (patientId, label) =>
    set((s) => ({
      patients: s.patients.map((p) => (p.id === patientId ? { ...p, nextFollowUpLabel: label } : p)),
    })),
}));

export { clinicians, SHORTAGE_THRESHOLD };

export function shortageAlerts(rows: ShortageRow[]) {
  const byDrug = new Map<string, number>();
  for (const r of rows) byDrug.set(r.drug, (byDrug.get(r.drug) ?? 0) + r.count);
  return [...byDrug.entries()]
    .filter(([, n]) => n >= SHORTAGE_THRESHOLD)
    .map(([drug, count]) => ({ drug, count }));
}

export function buildHospitalCopy(state: Pick<SetuState, "items" | "shortages" | "abhaFail">) {
  const open = (dept: string) =>
    state.items.filter(
      (i) => i.department === dept && i.status !== "released" && i.status !== "acknowledged",
    ).length;
  const reasons = state.items.filter((i) => i.kind === "checkin" && i.reason && i.reason !== "taken");
  const unavail = reasons.filter((i) => i.reason === "unavailable").length;
  const alerts = shortageAlerts(state.shortages);
  return hospitalNarrative({
    cardioBacklog: open("Cardiology"),
    endoBacklog: open("Endocrinology"),
    unavailableShare: reasons.length ? unavail / reasons.length : 0,
    topDrug: alerts[0]?.drug ?? [...state.shortages].sort((a, b) => b.count - a.count)[0]?.drug,
    abhaFail: state.abhaFail,
  });
}

export function isOpenStatus(s: ItemStatus) {
  return s === "new" || s === "seen" || s === "acknowledged" || s === "escalated";
}

export function usePatient() {
  return useSetu((s) => s.patients.find((p) => p.id === s.currentPatientId)!);
}

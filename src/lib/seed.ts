import { organizeSummary } from "./engine";
import type { Clinician, Patient, QueueItem, ShortageRow } from "./types";

export const DEMO_PATIENT_ID = "p-meera";
export const DEMO_DOCTOR_ID = "c-sen";

export const clinicians: Clinician[] = [
  { id: "c-sen", name: "Dr. Kavya Sen", department: "Endocrinology", role: "doctor" },
  { id: "c-nair", name: "Dr. Arjun Nair", department: "Cardiology", role: "doctor" },
  { id: "c-team-endo", name: "Endo duty team", department: "Endocrinology", role: "team" },
  { id: "c-team-card", name: "Cardio duty team", department: "Cardiology", role: "team" },
];

export const patients: Patient[] = [
  {
    id: "p-meera",
    name: "Meera Iyer",
    age: 54,
    sex: "F",
    condition: "Type 2 diabetes",
    abhaId: "12-3456-7890-1234",
    doctorId: "c-sen",
    doctorName: "Dr. Kavya Sen",
    department: "Endocrinology",
    nextFollowUp: "2026-09-20",
    nextFollowUpLabel: "HbA1c check · 12 days",
    meds: [
      { name: "Metformin", dose: "500 mg twice daily" },
      { name: "Glimepiride", dose: "1 mg morning" },
    ],
    location: "Pune · Kothrud",
  },
  {
    id: "p-ravi",
    name: "Ravi Deshmukh",
    age: 61,
    sex: "M",
    condition: "Ischaemic heart disease",
    abhaId: "22-1188-4401-0091",
    doctorId: "c-nair",
    doctorName: "Dr. Arjun Nair",
    department: "Cardiology",
    nextFollowUp: "2026-09-12",
    nextFollowUpLabel: "Post-episode review · 4 days",
    meds: [
      { name: "Amlodipine", dose: "5 mg daily" },
      { name: "Aspirin", dose: "75 mg daily" },
    ],
    location: "Pune · Hadapsar",
  },
  {
    id: "p-anjali",
    name: "Anjali Kulkarni",
    age: 28,
    sex: "F",
    condition: "Antenatal care · 26 weeks",
    abhaId: "31-7002-1194-8820",
    doctorId: "c-sen",
    doctorName: "Dr. Kavya Sen",
    department: "Obstetrics",
    nextFollowUp: "2026-09-15",
    nextFollowUpLabel: "ANC visit · 7 days",
    meds: [{ name: "Iron + folic acid", dose: "once daily" }],
    location: "Pune · Aundh",
  },
  {
    id: "p-suresh",
    name: "Suresh Patil",
    age: 72,
    sex: "M",
    condition: "Hypertension · elderly review",
    abhaId: "18-0021-5566-4410",
    doctorId: "c-nair",
    doctorName: "Dr. Arjun Nair",
    department: "Cardiology",
    nextFollowUp: "2026-10-01",
    nextFollowUpLabel: "6-month checkup",
    meds: [{ name: "Amlodipine", dose: "5 mg daily" }],
    location: "Pune · Kothrud",
  },
];

const hoursAgo = (h: number) => new Date(Date.now() - h * 3600_000).toISOString();

function checkin(
  partial: Omit<QueueItem, "kind" | "notes" | "summary" | "released"> & {
    summary?: string;
    released?: boolean;
  },
): QueueItem {
  const patient = patients.find((p) => p.id === partial.patientId)!;
  const historyCount = 2;
  const released = partial.released ?? partial.status === "released";
  return {
    kind: "checkin",
    notes: [],
    summary:
      partial.summary ??
      organizeSummary({
        patientName: patient.name,
        kind: "checkin",
        reason: partial.reason,
        transcript: partial.transcript,
        medicine: partial.medicine,
        historyCount,
      }),
    ...partial,
    released,
  };
}



function report(
  partial: Omit<QueueItem, "kind" | "notes" | "summary"> & { summary?: string },
): QueueItem {
  const patient = patients.find((p) => p.id === partial.patientId)!;
  return {
    kind: "report",
    notes: [],
    summary:
      partial.summary ??
      organizeSummary({
        patientName: patient.name,
        kind: "report",
        tests: partial.tests,
        historyCount: 1,
      }),
    ...partial,
  };
}


export const seedItems: QueueItem[] = [
  checkin({
    id: "q-1",
    patientId: "p-ravi",
    createdAt: hoursAgo(2),
    transcript: "Pharmacy in Hadapsar said they don't have Amlodipine. I skipped today's tablet.",
    reason: "unavailable",
    medicine: "Amlodipine",
    department: "Cardiology",
    priority: "review",
    status: "new",
  }),
  checkin({
    id: "q-2",
    patientId: "p-suresh",
    createdAt: hoursAgo(5),
    transcript: "Couldn't find Amlodipine at the municipal pharmacy either.",
    reason: "unavailable",
    medicine: "Amlodipine",
    department: "Cardiology",
    priority: "review",
    status: "new",
  }),
  checkin({
    id: "q-3",
    patientId: "p-anjali",
    createdAt: hoursAgo(8),
    transcript: "I took the iron tablet after breakfast.",
    reason: "taken",
    department: "Obstetrics",
    priority: "routine",
    status: "acknowledged",
    claimedBy: "c-sen",
    claimedByName: "Dr. Kavya Sen",
    released: true,
    reviewerName: "Dr. Kavya Sen",
  }),
  checkin({
    id: "q-4",
    patientId: "p-ravi",
    createdAt: hoursAgo(30),
    transcript: "Forgot the evening aspirin because I slept early.",
    reason: "forgot",
    department: "Cardiology",
    priority: "routine",
    status: "released",
    claimedBy: "c-nair",
    claimedByName: "Dr. Arjun Nair",
    released: true,
    reviewerName: "Dr. Arjun Nair",
  }),
  report({
    id: "q-5",
    patientId: "p-meera",
    createdAt: hoursAgo(6),
    ocrText:
      "City Lab · Fasting glucose 142 mg/dL (70–100) · HbA1c 8.2 % (4.0–5.6) · Creatinine 0.9 mg/dL (0.6–1.2)",
    tests: [
      { name: "Fasting glucose", value: 142, unit: "mg/dL", low: 70, high: 100, flagged: true },
      { name: "HbA1c", value: 8.2, unit: "%", low: 4.0, high: 5.6, flagged: true },
      { name: "Creatinine", value: 0.9, unit: "mg/dL", low: 0.6, high: 1.2, flagged: false },
    ],
    department: "Endocrinology",
    priority: "alert",
    status: "new",
    released: false,
  }),
  report({
    id: "q-6",
    patientId: "p-ravi",
    createdAt: hoursAgo(40),
    ocrText: "Lipid panel · LDL 98 mg/dL (0–100) · HDL 46 mg/dL",
    tests: [
      { name: "LDL", value: 98, unit: "mg/dL", low: 0, high: 100, flagged: false },
      { name: "HDL", value: 46, unit: "mg/dL", low: 40, high: 90, flagged: false },
    ],
    department: "Cardiology",
    priority: "routine",
    status: "released",
    released: true,
    claimedBy: "c-nair",
    claimedByName: "Dr. Arjun Nair",
    reviewerName: "Dr. Arjun Nair",
  }),
];

export const seedShortages: ShortageRow[] = [
  { drug: "Amlodipine", location: "Pune · Hadapsar", count: 2, windowHours: 24 },
  { drug: "Amlodipine", location: "Pune · Kothrud", count: 1, windowHours: 24 },
  { drug: "Metformin", location: "Pune · Kothrud", count: 1, windowHours: 48 },
];

export const SAMPLE_UTTERANCES: { label: string; text: string }[] = [
  { label: "Took it", text: "Yes, I took both tablets after breakfast." },
  { label: "Forgot", text: "I forgot this morning because I left home early." },
  { label: "Side effects", text: "The medicine makes me feel nauseous so I skipped it." },
  { label: "No stock", text: "The pharmacy said they don't have Metformin in stock." },
];

export const SAMPLE_REPORTS: {
  label: string;
  ocrText: string;
  tests: QueueItem["tests"];
}[] = [
  {
    label: "HbA1c panel",
    ocrText:
      "City Lab Pune · Patient: Meera Iyer · Fasting glucose 118 mg/dL (70–100) · HbA1c 7.4 % (4.0–5.6) · Creatinine 0.8 mg/dL (0.6–1.2)",
    tests: [
      { name: "Fasting glucose", value: 118, unit: "mg/dL", low: 70, high: 100, flagged: true },
      { name: "HbA1c", value: 7.4, unit: "%", low: 4.0, high: 5.6, flagged: true },
      { name: "Creatinine", value: 0.8, unit: "mg/dL", low: 0.6, high: 1.2, flagged: false },
    ],
  },
  {
    label: "In-range glucose",
    ocrText: "Fasting glucose 92 mg/dL (70–100) · HbA1c 5.4 % (4.0–5.6)",
    tests: [
      { name: "Fasting glucose", value: 92, unit: "mg/dL", low: 70, high: 100, flagged: false },
      { name: "HbA1c", value: 5.4, unit: "%", low: 4.0, high: 5.6, flagged: false },
    ],
  },
];

export type ReasonCode =
  | "taken"
  | "forgot"
  | "side_effects"
  | "unavailable"
  | "other";

export type Priority = "routine" | "review" | "alert";
export type ItemStatus =
  | "new"
  | "seen"
  | "acknowledged"
  | "released"
  | "escalated";
export type ItemKind = "checkin" | "report";
export type Role = "patient" | "doctor" | "hospital";

export interface Patient {
  id: string;
  name: string;
  age: number;
  sex: string;
  condition: string;
  abhaId: string;
  doctorId: string;
  doctorName: string;
  department: string;
  nextFollowUp: string;
  nextFollowUpLabel: string;
  meds: { name: string; dose: string }[];
  location: string;
}

export interface Clinician {
  id: string;
  name: string;
  department: string;
  role: "doctor" | "team";
}

export interface LabTest {
  name: string;
  value: number | string;
  unit: string;
  low?: number;
  high?: number;
  flagged: boolean;
}

export interface QueueItem {
  id: string;
  kind: ItemKind;
  patientId: string;
  createdAt: string;
  transcript?: string;
  reason?: ReasonCode;
  medicine?: string;
  ocrText?: string;
  tests?: LabTest[];
  department: string;
  priority: Priority;
  status: ItemStatus;
  claimedBy?: string;
  claimedByName?: string;
  reviewerName?: string;
  released: boolean;
  summary: string;
  notes: string[];
}

export interface ShortageRow {
  drug: string;
  location: string;
  count: number;
  windowHours: number;
}

export const REASON_LABEL: Record<ReasonCode, string> = {
  taken: "Took medicine",
  forgot: "Forgot",
  side_effects: "Side effects",
  unavailable: "Medicine unavailable",
  other: "Other",
};

export const PRIORITY_LABEL: Record<Priority, string> = {
  routine: "Routine",
  review: "Needs review",
  alert: "High-priority",
};

export const STATUS_LABEL: Record<ItemStatus, string> = {
  new: "New",
  seen: "Seen",
  acknowledged: "Acknowledged",
  released: "Released",
  escalated: "Escalated",
};

export const PATIENT_STATUS: Record<ItemStatus | "pending", string> = {
  new: "Under review",
  seen: "Under review",
  acknowledged: "Your doctor is looking at this",
  released: "All clear",
  escalated: "Your doctor will call you",
  pending: "Under review",
};

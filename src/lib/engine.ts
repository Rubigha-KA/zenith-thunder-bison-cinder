import type { LabTest, Priority, ReasonCode } from "./types";

const REASON_RULES: { code: ReasonCode; keys: string[] }[] = [
  {
    code: "unavailable",
    keys: [
      "unavailable",
      "couldn",
      "could not",
      "out of stock",
      "pharmacy",
      "not available",
      "no stock",
      "empty",
      "find this medicine",
      "didn't have",
      "did not have",
    ],
  },
  {
    code: "side_effects",
    keys: [
      "side effect",
      "nause",
      "dizzy",
      "rash",
      "vomit",
      "stomach",
      "itch",
      "headache",
      "makes me",
    ],
  },
  {
    code: "forgot",
    keys: ["forgot", "forget", "missed", "left home", "slept", "late"],
  },
  { code: "taken", keys: ["took", "taken", "yes i", "had my", "after breakfast"] },
];

export function classifyReason(text: string): ReasonCode {
  const t = text.toLowerCase();
  for (const rule of REASON_RULES) {
    if (rule.keys.some((k) => t.includes(k))) return rule.code;
  }
  return "other";
}

export function flagTests(tests: LabTest[]): LabTest[] {
  return tests.map((test) => {
    if (typeof test.value !== "number" || test.low == null || test.high == null) {
      return test;
    }
    return { ...test, flagged: test.value < test.low || test.value > test.high };
  });
}

const DEPT_MAP: Record<string, string> = {
  hba1c: "Endocrinology",
  glucose: "Endocrinology",
  insulin: "Endocrinology",
  cholesterol: "Cardiology",
  ldl: "Cardiology",
  hdl: "Cardiology",
  troponin: "Cardiology",
  ecg: "Cardiology",
  creatinine: "Nephrology",
  hemoglobin: "General medicine",
  tsh: "Endocrinology",
  bp: "Cardiology",
};

export function routeDepartment(tests: LabTest[], fallback = "General medicine") {
  for (const test of tests) {
    const key = test.name.toLowerCase();
    for (const [needle, dept] of Object.entries(DEPT_MAP)) {
      if (key.includes(needle)) return dept;
    }
  }
  return fallback;
}

export function itemPriority(input: {
  reason?: ReasonCode;
  tests?: LabTest[];
}): Priority {
  if (input.tests?.some((t) => t.flagged)) return "alert";
  if (input.reason === "unavailable" || input.reason === "side_effects") {
    return "review";
  }
  return "routine";
}

export function organizeSummary(input: {
  patientName: string;
  kind: "checkin" | "report";
  reason?: ReasonCode;
  transcript?: string;
  medicine?: string;
  tests?: LabTest[];
  historyCount: number;
}): string {
  if (input.kind === "checkin") {
    const reasonBit =
      input.reason === "taken"
        ? "reported taking today's dose"
        : input.reason === "forgot"
          ? "missed a dose (forgot)"
          : input.reason === "side_effects"
            ? "stopped or skipped due to side effects"
            : input.reason === "unavailable"
              ? `could not obtain ${input.medicine ?? "the prescribed medicine"}`
              : "checked in with an unclassified reason";
    const quote = input.transcript ? ` Patient said: “${input.transcript}”.` : "";
    return `${input.patientName} ${reasonBit}.${quote} ${input.historyCount} prior check-in${input.historyCount === 1 ? "" : "s"} on file. This is a summary of collected fields — not a recommendation.`;
  }
  const flags = (input.tests ?? []).filter((t) => t.flagged);
  const list =
    flags.length === 0
      ? "All captured values sit within the printed reference ranges."
      : `Out-of-range: ${flags
          .map((t) => `${t.name} ${t.value} ${t.unit}`)
          .join("; ")}.`;
  return `Lab report from ${input.patientName}. ${list} Routed by test type. Human review required before release.`;
}

export function hospitalNarrative(stats: {
  cardioBacklog: number;
  endoBacklog: number;
  unavailableShare: number;
  topDrug?: string;
  abhaFail: number;
}): string {
  const parts = [
    `Cardiology queue backlog is ${stats.cardioBacklog} unacknowledged item${stats.cardioBacklog === 1 ? "" : "s"}; endocrinology has ${stats.endoBacklog}.`,
    stats.topDrug
      ? `${stats.topDrug} is the leading “unavailable” signal this window.`
      : "No drug has crossed the shortage threshold.",
    `Unavailable accounts for ${Math.round(stats.unavailableShare * 100)}% of missed-dose reasons.`,
    stats.abhaFail > 0
      ? `ABHA sync recorded ${stats.abhaFail} failed exchange${stats.abhaFail === 1 ? "" : "s"} — infrastructure, not clinical.`
      : "ABHA sync is clean.",
  ];
  return parts.join(" ");
}

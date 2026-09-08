import { b as require_jsx_runtime, d as useRouterState, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { d as Activity, o as Hospital, r as Stethoscope, t as UserRound } from "../_libs/lucide-react.mjs";
import { n as clsx } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { t as create } from "../_libs/zustand.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/app-chrome-P74YfNfr.js
var import_jsx_runtime = require_jsx_runtime();
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
var REASON_RULES = [
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
			"did not have"
		]
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
			"makes me"
		]
	},
	{
		code: "forgot",
		keys: [
			"forgot",
			"forget",
			"missed",
			"left home",
			"slept",
			"late"
		]
	},
	{
		code: "taken",
		keys: [
			"took",
			"taken",
			"yes i",
			"had my",
			"after breakfast"
		]
	}
];
function classifyReason(text) {
	const t = text.toLowerCase();
	for (const rule of REASON_RULES) if (rule.keys.some((k) => t.includes(k))) return rule.code;
	return "other";
}
function flagTests(tests) {
	return tests.map((test) => {
		if (typeof test.value !== "number" || test.low == null || test.high == null) return test;
		return {
			...test,
			flagged: test.value < test.low || test.value > test.high
		};
	});
}
var DEPT_MAP = {
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
	bp: "Cardiology"
};
function routeDepartment(tests, fallback = "General medicine") {
	for (const test of tests) {
		const key = test.name.toLowerCase();
		for (const [needle, dept] of Object.entries(DEPT_MAP)) if (key.includes(needle)) return dept;
	}
	return fallback;
}
function itemPriority(input) {
	if (input.tests?.some((t) => t.flagged)) return "alert";
	if (input.reason === "unavailable" || input.reason === "side_effects") return "review";
	return "routine";
}
function organizeSummary(input) {
	if (input.kind === "checkin") {
		const reasonBit = input.reason === "taken" ? "reported taking today's dose" : input.reason === "forgot" ? "missed a dose (forgot)" : input.reason === "side_effects" ? "stopped or skipped due to side effects" : input.reason === "unavailable" ? `could not obtain ${input.medicine ?? "the prescribed medicine"}` : "checked in with an unclassified reason";
		const quote = input.transcript ? ` Patient said: “${input.transcript}”.` : "";
		return `${input.patientName} ${reasonBit}.${quote} ${input.historyCount} prior check-in${input.historyCount === 1 ? "" : "s"} on file. This is a summary of collected fields — not a recommendation.`;
	}
	const flags = (input.tests ?? []).filter((t) => t.flagged);
	const list = flags.length === 0 ? "All captured values sit within the printed reference ranges." : `Out-of-range: ${flags.map((t) => `${t.name} ${t.value} ${t.unit}`).join("; ")}.`;
	return `Lab report from ${input.patientName}. ${list} Routed by test type. Human review required before release.`;
}
function hospitalNarrative(stats) {
	return [
		`Cardiology queue backlog is ${stats.cardioBacklog} unacknowledged item${stats.cardioBacklog === 1 ? "" : "s"}; endocrinology has ${stats.endoBacklog}.`,
		stats.topDrug ? `${stats.topDrug} is the leading “unavailable” signal this window.` : "No drug has crossed the shortage threshold.",
		`Unavailable accounts for ${Math.round(stats.unavailableShare * 100)}% of missed-dose reasons.`,
		stats.abhaFail > 0 ? `ABHA sync recorded ${stats.abhaFail} failed exchange${stats.abhaFail === 1 ? "" : "s"} — infrastructure, not clinical.` : "ABHA sync is clean."
	].join(" ");
}
var DEMO_PATIENT_ID = "p-meera";
var DEMO_DOCTOR_ID = "c-sen";
var clinicians = [
	{
		id: "c-sen",
		name: "Dr. Kavya Sen",
		department: "Endocrinology",
		role: "doctor"
	},
	{
		id: "c-nair",
		name: "Dr. Arjun Nair",
		department: "Cardiology",
		role: "doctor"
	},
	{
		id: "c-team-endo",
		name: "Endo duty team",
		department: "Endocrinology",
		role: "team"
	},
	{
		id: "c-team-card",
		name: "Cardio duty team",
		department: "Cardiology",
		role: "team"
	}
];
var patients = [
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
		meds: [{
			name: "Metformin",
			dose: "500 mg twice daily"
		}, {
			name: "Glimepiride",
			dose: "1 mg morning"
		}],
		location: "Pune · Kothrud"
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
		meds: [{
			name: "Amlodipine",
			dose: "5 mg daily"
		}, {
			name: "Aspirin",
			dose: "75 mg daily"
		}],
		location: "Pune · Hadapsar"
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
		meds: [{
			name: "Iron + folic acid",
			dose: "once daily"
		}],
		location: "Pune · Aundh"
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
		meds: [{
			name: "Amlodipine",
			dose: "5 mg daily"
		}],
		location: "Pune · Kothrud"
	}
];
var hoursAgo = (h) => (/* @__PURE__ */ new Date(Date.now() - h * 36e5)).toISOString();
function checkin(partial) {
	const patient = patients.find((p) => p.id === partial.patientId);
	const historyCount = 2;
	const released = partial.released ?? partial.status === "released";
	return {
		kind: "checkin",
		notes: [],
		summary: partial.summary ?? organizeSummary({
			patientName: patient.name,
			kind: "checkin",
			reason: partial.reason,
			transcript: partial.transcript,
			medicine: partial.medicine,
			historyCount
		}),
		...partial,
		released
	};
}
function report(partial) {
	const patient = patients.find((p) => p.id === partial.patientId);
	return {
		kind: "report",
		notes: [],
		summary: partial.summary ?? organizeSummary({
			patientName: patient.name,
			kind: "report",
			tests: partial.tests,
			historyCount: 1
		}),
		...partial
	};
}
var seedItems = [
	checkin({
		id: "q-1",
		patientId: "p-ravi",
		createdAt: hoursAgo(2),
		transcript: "Pharmacy in Hadapsar said they don't have Amlodipine. I skipped today's tablet.",
		reason: "unavailable",
		medicine: "Amlodipine",
		department: "Cardiology",
		priority: "review",
		status: "new"
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
		status: "new"
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
		reviewerName: "Dr. Kavya Sen"
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
		reviewerName: "Dr. Arjun Nair"
	}),
	report({
		id: "q-5",
		patientId: "p-meera",
		createdAt: hoursAgo(6),
		ocrText: "City Lab · Fasting glucose 142 mg/dL (70–100) · HbA1c 8.2 % (4.0–5.6) · Creatinine 0.9 mg/dL (0.6–1.2)",
		tests: [
			{
				name: "Fasting glucose",
				value: 142,
				unit: "mg/dL",
				low: 70,
				high: 100,
				flagged: true
			},
			{
				name: "HbA1c",
				value: 8.2,
				unit: "%",
				low: 4,
				high: 5.6,
				flagged: true
			},
			{
				name: "Creatinine",
				value: .9,
				unit: "mg/dL",
				low: .6,
				high: 1.2,
				flagged: false
			}
		],
		department: "Endocrinology",
		priority: "alert",
		status: "new",
		released: false
	}),
	report({
		id: "q-6",
		patientId: "p-ravi",
		createdAt: hoursAgo(40),
		ocrText: "Lipid panel · LDL 98 mg/dL (0–100) · HDL 46 mg/dL",
		tests: [{
			name: "LDL",
			value: 98,
			unit: "mg/dL",
			low: 0,
			high: 100,
			flagged: false
		}, {
			name: "HDL",
			value: 46,
			unit: "mg/dL",
			low: 40,
			high: 90,
			flagged: false
		}],
		department: "Cardiology",
		priority: "routine",
		status: "released",
		released: true,
		claimedBy: "c-nair",
		claimedByName: "Dr. Arjun Nair",
		reviewerName: "Dr. Arjun Nair"
	})
];
var seedShortages = [
	{
		drug: "Amlodipine",
		location: "Pune · Hadapsar",
		count: 2,
		windowHours: 24
	},
	{
		drug: "Amlodipine",
		location: "Pune · Kothrud",
		count: 1,
		windowHours: 24
	},
	{
		drug: "Metformin",
		location: "Pune · Kothrud",
		count: 1,
		windowHours: 48
	}
];
var SAMPLE_UTTERANCES = [
	{
		label: "Took it",
		text: "Yes, I took both tablets after breakfast."
	},
	{
		label: "Forgot",
		text: "I forgot this morning because I left home early."
	},
	{
		label: "Side effects",
		text: "The medicine makes me feel nauseous so I skipped it."
	},
	{
		label: "No stock",
		text: "The pharmacy said they don't have Metformin in stock."
	}
];
var SAMPLE_REPORTS = [{
	label: "HbA1c panel",
	ocrText: "City Lab Pune · Patient: Meera Iyer · Fasting glucose 118 mg/dL (70–100) · HbA1c 7.4 % (4.0–5.6) · Creatinine 0.8 mg/dL (0.6–1.2)",
	tests: [
		{
			name: "Fasting glucose",
			value: 118,
			unit: "mg/dL",
			low: 70,
			high: 100,
			flagged: true
		},
		{
			name: "HbA1c",
			value: 7.4,
			unit: "%",
			low: 4,
			high: 5.6,
			flagged: true
		},
		{
			name: "Creatinine",
			value: .8,
			unit: "mg/dL",
			low: .6,
			high: 1.2,
			flagged: false
		}
	]
}, {
	label: "In-range glucose",
	ocrText: "Fasting glucose 92 mg/dL (70–100) · HbA1c 5.4 % (4.0–5.6)",
	tests: [{
		name: "Fasting glucose",
		value: 92,
		unit: "mg/dL",
		low: 70,
		high: 100,
		flagged: false
	}, {
		name: "HbA1c",
		value: 5.4,
		unit: "%",
		low: 4,
		high: 5.6,
		flagged: false
	}]
}];
function nid(prefix) {
	return `${prefix}-${Math.random().toString(36).slice(2, 8)}`;
}
function bumpShortage(rows, drug, location) {
	const i = rows.findIndex((r) => r.drug === drug && r.location === location);
	if (i === -1) return [...rows, {
		drug,
		location,
		count: 1,
		windowHours: 24
	}];
	return rows.map((r, idx) => idx === i ? {
		...r,
		count: r.count + 1
	} : r);
}
var useSetu = create()((set, get) => ({
	patients,
	items: seedItems,
	shortages: seedShortages,
	abhaOnboarded: 48,
	abhaOk: 44,
	abhaFail: 2,
	currentPatientId: DEMO_PATIENT_ID,
	currentDoctorId: DEMO_DOCTOR_ID,
	resetDemo: () => set({
		patients: structuredClone(patients),
		items: structuredClone(seedItems),
		shortages: structuredClone(seedShortages),
		abhaOnboarded: 48,
		abhaOk: 44,
		abhaFail: 2
	}),
	submitCheckIn: ({ transcript, reason, medicine }) => {
		const patient = get().patients.find((p) => p.id === get().currentPatientId);
		const code = reason ?? classifyReason(transcript);
		const med = medicine ?? (code === "unavailable" ? patient.meds[0]?.name : void 0);
		const historyCount = get().items.filter((i) => i.patientId === patient.id && i.kind === "checkin").length;
		const item = {
			id: nid("q"),
			kind: "checkin",
			patientId: patient.id,
			createdAt: (/* @__PURE__ */ new Date()).toISOString(),
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
				historyCount
			})
		};
		set((s) => ({
			items: [item, ...s.items],
			shortages: code === "unavailable" && med ? bumpShortage(s.shortages, med, patient.location) : s.shortages
		}));
		return item;
	},
	submitReport: ({ ocrText, tests }) => {
		const patient = get().patients.find((p) => p.id === get().currentPatientId);
		const flagged = flagTests(tests);
		const dept = routeDepartment(flagged, patient.department);
		const item = {
			id: nid("q"),
			kind: "report",
			patientId: patient.id,
			createdAt: (/* @__PURE__ */ new Date()).toISOString(),
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
				historyCount: 0
			})
		};
		set((s) => ({ items: [item, ...s.items] }));
		return item;
	},
	markSeen: (id) => set((s) => ({ items: s.items.map((i) => i.id === id && i.status === "new" ? {
		...i,
		status: "seen"
	} : i) })),
	claim: (id, clinicianId) => {
		const c = clinicians.find((x) => x.id === clinicianId);
		set((s) => ({ items: s.items.map((i) => i.id === id ? {
			...i,
			status: i.status === "escalated" ? "escalated" : "acknowledged",
			claimedBy: clinicianId,
			claimedByName: c?.name
		} : i) }));
	},
	release: (id, clinicianId) => {
		const c = clinicians.find((x) => x.id === clinicianId);
		set((s) => ({ items: s.items.map((i) => i.id === id ? {
			...i,
			status: "released",
			released: true,
			claimedBy: i.claimedBy ?? clinicianId,
			claimedByName: i.claimedByName ?? c?.name,
			reviewerName: c?.name
		} : i) }));
	},
	escalate: (id, clinicianId) => {
		const c = clinicians.find((x) => x.id === clinicianId);
		set((s) => ({ items: s.items.map((i) => i.id === id ? {
			...i,
			status: "escalated",
			priority: "alert",
			claimedBy: clinicianId,
			claimedByName: c?.name,
			notes: [...i.notes, "Escalated with high-priority re-notify."]
		} : i) }));
	},
	addNote: (id, note) => set((s) => ({ items: s.items.map((i) => i.id === id ? {
		...i,
		notes: [...i.notes, note]
	} : i) })),
	scheduleFollowUp: (patientId, label) => set((s) => ({ patients: s.patients.map((p) => p.id === patientId ? {
		...p,
		nextFollowUpLabel: label
	} : p) }))
}));
function shortageAlerts(rows) {
	const byDrug = /* @__PURE__ */ new Map();
	for (const r of rows) byDrug.set(r.drug, (byDrug.get(r.drug) ?? 0) + r.count);
	return [...byDrug.entries()].filter(([, n]) => n >= 3).map(([drug, count]) => ({
		drug,
		count
	}));
}
function buildHospitalCopy(state) {
	const open = (dept) => state.items.filter((i) => i.department === dept && i.status !== "released" && i.status !== "acknowledged").length;
	const reasons = state.items.filter((i) => i.kind === "checkin" && i.reason && i.reason !== "taken");
	const unavail = reasons.filter((i) => i.reason === "unavailable").length;
	const alerts = shortageAlerts(state.shortages);
	return hospitalNarrative({
		cardioBacklog: open("Cardiology"),
		endoBacklog: open("Endocrinology"),
		unavailableShare: reasons.length ? unavail / reasons.length : 0,
		topDrug: alerts[0]?.drug ?? [...state.shortages].sort((a, b) => b.count - a.count)[0]?.drug,
		abhaFail: state.abhaFail
	});
}
function isOpenStatus(s) {
	return s === "new" || s === "seen" || s === "acknowledged" || s === "escalated";
}
function usePatient() {
	return useSetu((s) => s.patients.find((p) => p.id === s.currentPatientId));
}
var NAV = [
	{
		to: "/patient",
		label: "Patient",
		icon: UserRound
	},
	{
		to: "/doctor",
		label: "Clinician",
		icon: Stethoscope
	},
	{
		to: "/hospital",
		label: "Hospital",
		icon: Hospital
	}
];
function BrandMark({ compact }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to: "/",
		className: "flex items-center gap-2.5 text-ink no-underline",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: "flex size-8 items-center justify-center rounded-[10px] bg-primary text-primary-fg",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Activity, {
				className: "size-4",
				strokeWidth: 2.2
			})
		}), !compact && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
			className: "leading-tight",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block font-display text-[17px] font-medium tracking-tight",
				children: "Setu"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "block text-[11px] text-muted",
				children: "ABDM follow-up layer"
			})]
		})]
	});
}
function RoleSwitch() {
	const path = useRouterState({ select: (s) => s.location.pathname });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
		className: "flex rounded-[var(--radius-md)] border border-border bg-surface p-1",
		"aria-label": "Switch role",
		children: NAV.map((item) => {
			const active = path.startsWith(item.to);
			const Icon = item.icon;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
				to: item.to,
				className: cn("flex h-9 items-center gap-1.5 rounded-[8px] px-3 text-sm no-underline transition-colors", active ? "bg-primary text-primary-fg" : "text-muted hover:text-ink"),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-3.5" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "hidden sm:inline",
					children: item.label
				})]
			}, item.to);
		})
	});
}
function TopBar({ title, subtitle }) {
	const reset = useSetu((s) => s.resetDemo);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "sticky top-0 z-20 border-b border-border bg-bg/90 backdrop-blur-sm",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex max-w-6xl items-center gap-3 px-4 py-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandMark, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "hidden min-w-0 flex-1 md:block",
					children: [title && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "truncate text-sm font-medium text-ink",
						children: title
					}), subtitle && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "truncate text-xs text-muted",
						children: subtitle
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "ml-auto flex items-center gap-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: reset,
						className: "hidden h-9 rounded-[8px] px-3 text-xs text-muted hover:bg-surface-2 sm:inline",
						children: "Reset demo"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(RoleSwitch, {})]
				})
			]
		})
	});
}
function HumanLoopNote() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "rounded-[var(--radius-md)] border border-border bg-surface px-3 py-2 text-xs text-muted",
		children: "AI listens, reads, and organizes. A doctor still decides everything."
	});
}
//#endregion
export { TopBar as a, cn as c, usePatient as d, useSetu as f, SAMPLE_UTTERANCES as i, isOpenStatus as l, HumanLoopNote as n, buildHospitalCopy as o, SAMPLE_REPORTS as r, clinicians as s, BrandMark as t, shortageAlerts as u };

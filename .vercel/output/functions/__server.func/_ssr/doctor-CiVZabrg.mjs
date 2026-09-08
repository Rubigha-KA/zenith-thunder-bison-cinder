import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as TopBar, c as cn, f as useSetu, l as isOpenStatus, n as HumanLoopNote, s as clinicians } from "./app-chrome-P74YfNfr.mjs";
import { r as REASON_LABEL } from "./types-BaXrDOwd.mjs";
import { n as PriorityBadge, r as StatusBadge } from "./status-badge-CvKRyn5h.mjs";
import { t as Button } from "./button-mPvsgXPp.mjs";
import { t as formatDistanceToNow } from "../_libs/date-fns.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/doctor-CiVZabrg.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function DoctorApp() {
	const items = useSetu((s) => s.items);
	const patients = useSetu((s) => s.patients);
	const doctorId = useSetu((s) => s.currentDoctorId);
	const doctor = clinicians.find((c) => c.id === doctorId);
	const [tab, setTab] = (0, import_react.useState)("mine");
	const firstOpen = items.find((i) => isOpenStatus(i.status))?.id ?? items[0]?.id ?? null;
	const [selectedId, setSelectedId] = (0, import_react.useState)(firstOpen);
	const mine = (0, import_react.useMemo)(() => items.filter((i) => {
		const p = patients.find((x) => x.id === i.patientId);
		return p?.doctorId === doctorId || p?.department === doctor.department;
	}), [
		items,
		patients,
		doctorId,
		doctor.department
	]);
	const list = tab === "mine" ? mine : items;
	const selected = items.find((i) => i.id === selectedId) ?? list[0];
	const markSeen = useSetu((s) => s.markSeen);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TopBar, {
			title: doctor.name,
			subtitle: `${doctor.department} · parallel notification`
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto grid max-w-6xl gap-4 px-4 py-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)]",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HumanLoopNote, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "mt-3 flex rounded-[var(--radius-md)] border border-border bg-surface p-1",
					children: [["mine", "My queue"], ["team", "Team queue"]].map(([key, label]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
						type: "button",
						onClick: () => setTab(key),
						className: cn("h-11 flex-1 rounded-[8px] text-sm", tab === key ? "bg-primary text-primary-fg" : "text-muted"),
						children: label
					}, key))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 space-y-2",
					children: list.map((item) => {
						const p = patients.find((x) => x.id === item.patientId);
						const active = selected?.id === item.id;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
							type: "button",
							onClick: () => {
								setSelectedId(item.id);
								markSeen(item.id);
							},
							className: cn("min-h-11 w-full rounded-[var(--radius-lg)] border px-3 py-3 text-left", active ? "border-primary bg-primary-soft" : "border-border bg-surface"),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex items-start justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-sm font-medium",
										children: p?.name
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-muted",
										children: [
											item.kind === "checkin" ? "Voice check-in" : "Lab report",
											" · ",
											item.department
										]
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriorityBadge, { value: item.priority })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-2 flex min-w-0 items-center justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(StatusBadge, { value: item.status }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "truncate text-[11px] text-subtle",
										children: formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })
									})]
								}),
								item.claimedByName && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-[11px] text-muted",
									children: ["Claimed by ", item.claimedByName]
								})
							]
						}) }, item.id);
					})
				})
			] }), selected ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CaseDetail, {
				item: selected,
				doctorId
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Queue is empty."
			})]
		})]
	});
}
function CaseDetail({ item, doctorId }) {
	const patients = useSetu((s) => s.patients);
	const history = useSetu((s) => s.items).filter((i) => i.patientId === item.patientId);
	const claim = useSetu((s) => s.claim);
	const release = useSetu((s) => s.release);
	const escalate = useSetu((s) => s.escalate);
	const addNote = useSetu((s) => s.addNote);
	const scheduleFollowUp = useSetu((s) => s.scheduleFollowUp);
	const patient = patients.find((p) => p.id === item.patientId);
	if (!patient) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
		className: "rounded-[var(--radius-xl)] border border-border bg-surface p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex flex-wrap items-start justify-between gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs uppercase tracking-[0.14em] text-muted",
						children: item.department
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "font-display text-2xl",
						children: patient.name
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted",
						children: [
							patient.age,
							patient.sex,
							" · ",
							patient.condition,
							" · ABHA ",
							patient.abhaId
						]
					})
				] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PriorityBadge, { value: item.priority })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
				className: "mt-4 grid grid-cols-2 gap-2 text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-[var(--radius-sm)] bg-bg p-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-xs text-muted",
						children: "Type"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: item.kind === "checkin" ? "Voice check-in" : "Lab report" })]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-[var(--radius-sm)] bg-bg p-2",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("dt", {
						className: "text-xs text-muted",
						children: "Reason"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("dd", { children: item.reason ? REASON_LABEL[item.reason] : "—" })]
				})]
			}),
			item.transcript && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("blockquote", {
				className: "mt-3 border-l-2 border-primary pl-3 text-sm italic",
				children: [
					"“",
					item.transcript,
					"”"
				]
			}),
			item.tests && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "mt-3 w-full text-left text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", {
					className: "text-xs text-muted",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "py-1 font-medium",
							children: "Test"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "py-1 font-medium",
							children: "Value"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "py-1 font-medium",
							children: "Printed range"
						})
					] })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: item.tests.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: t.flagged ? "text-alert" : "",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-1",
							children: t.name
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("td", {
							className: "py-1 tabular-nums",
							children: [
								t.value,
								" ",
								t.unit
							]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
							className: "py-1 tabular-nums text-muted",
							children: t.low != null ? `${t.low}–${t.high}` : "—"
						})
					]
				}, t.name)) })]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 rounded-[var(--radius-md)] bg-bg p-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-[11px] font-medium uppercase tracking-[0.14em] text-muted",
					children: "AI-generated summary — not a recommendation"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm leading-relaxed",
					children: item.summary
				})]
			}),
			item.notes.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-3 space-y-1 text-xs text-muted",
				children: item.notes.map((n) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: ["· ", n] }, n))
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "mt-4 text-xs text-muted",
				children: [
					"Prior items for this patient: ",
					history.length,
					". Seen and acknowledged are tracked separately — glancing does not close a case."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-4 flex flex-wrap gap-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						onClick: () => claim(item.id, doctorId),
						disabled: !!item.claimedBy,
						children: item.claimedByName ? `Claimed by ${item.claimedByName}` : "Acknowledge / claim"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "secondary",
						onClick: () => release(item.id, doctorId),
						disabled: item.released,
						children: item.released ? "Released to patient" : "Release to patient"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "outline",
						onClick: () => addNote(item.id, "Requested alternative medicine / pharmacy workaround."),
						children: "Request alternative"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "outline",
						onClick: () => scheduleFollowUp(item.patientId, "Follow-up brought forward · 7 days"),
						children: "Schedule follow-up"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						size: "sm",
						variant: "danger",
						onClick: () => escalate(item.id, doctorId),
						children: "Escalate"
					})
				]
			})
		]
	});
}
//#endregion
export { DoctorApp as component };

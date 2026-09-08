import { b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as TopBar, f as useSetu, l as isOpenStatus, n as HumanLoopNote, o as buildHospitalCopy, u as shortageAlerts } from "./app-chrome-P74YfNfr.mjs";
import { r as REASON_LABEL } from "./types-BaXrDOwd.mjs";
import { a as Bar, i as CartesianGrid, n as YAxis, o as ResponsiveContainer, r as XAxis, s as Tooltip, t as BarChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/hospital-n1uRlp41.js
var import_jsx_runtime = require_jsx_runtime();
function HospitalApp() {
	const items = useSetu((s) => s.items);
	const shortages = useSetu((s) => s.shortages);
	const patients = useSetu((s) => s.patients);
	const abha = {
		onboarded: useSetu((s) => s.abhaOnboarded),
		ok: useSetu((s) => s.abhaOk),
		fail: useSetu((s) => s.abhaFail)
	};
	const depts = [
		"Cardiology",
		"Endocrinology",
		"Obstetrics",
		"General medicine"
	];
	const queueHealth = depts.map((d) => {
		const open = items.filter((i) => i.department === d && isOpenStatus(i.status));
		const stale = open.filter((i) => Date.now() - +new Date(i.createdAt) > 144e5);
		return {
			dept: d,
			open: open.length,
			stale: stale.length
		};
	});
	const reasonRows = [
		"forgot",
		"side_effects",
		"unavailable",
		"other"
	].map((code) => ({
		name: REASON_LABEL[code],
		n: items.filter((i) => i.reason === code).length
	}));
	const followUps = patients.length;
	const completedish = items.filter((i) => i.status === "released").length;
	const alerts = shortageAlerts(shortages);
	const narrative = buildHospitalCopy({
		items,
		shortages,
		abhaFail: abha.fail
	});
	const workload = depts.map((d) => ({
		dept: d,
		load: items.filter((i) => i.department === d && i.status !== "released").length
	}));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TopBar, {
			title: "Hospital operations",
			subtitle: "Same pipeline, aggregated one level higher"
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-6xl space-y-4 px-4 py-5 pb-16",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HumanLoopNote, {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "rounded-[var(--radius-xl)] border border-border bg-surface p-5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-[11px] font-medium uppercase tracking-[0.14em] text-muted",
						children: "AI-generated summary — organizing known data, not a decision"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 font-display text-xl leading-snug text-ink",
						children: narrative
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "grid gap-4 md:grid-cols-2",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
							title: "Queue health",
							kicker: "SLA-style acknowledgements",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "space-y-2",
								children: queueHealth.map((row) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-center justify-between text-sm",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: row.dept }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
										className: "tabular-nums text-muted",
										children: [
											row.open,
											" open",
											row.stale > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
												className: "ml-2 text-alert",
												children: [row.stale, " stale"]
											}) : null
										]
									})]
								}, row.dept))
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
							title: "Follow-up compliance",
							kicker: "Reason codes across all patients",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mb-2 text-sm text-muted",
								children: [
									completedish,
									" released items · ",
									followUps,
									" patients on the roster"
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "h-40",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
									width: "100%",
									height: "100%",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
										data: reasonRows,
										margin: {
											top: 4,
											right: 8,
											left: -20,
											bottom: 0
										},
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
												stroke: "var(--color-border)",
												vertical: false
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
												dataKey: "name",
												tick: {
													fontSize: 11,
													fill: "var(--color-muted)"
												}
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
												allowDecimals: false,
												tick: {
													fontSize: 11,
													fill: "var(--color-muted)"
												}
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
												background: "var(--color-surface)",
												border: "1px solid var(--color-border)",
												borderRadius: 8,
												fontSize: 12
											} }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
												dataKey: "n",
												fill: "var(--color-primary)",
												radius: [
													4,
													4,
													0,
													0
												]
											})
										]
									})
								})
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Panel, {
							title: "Shortage signal",
							kicker: "From real patient “unavailable” reports",
							children: [alerts.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "mb-2 rounded-[8px] bg-alert-soft px-2 py-1 text-sm text-alert",
								children: ["Threshold crossed: ", alerts.map((a) => `${a.drug} (${a.count})`).join(", ")]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
								className: "space-y-2 text-sm",
								children: shortages.slice().sort((a, b) => b.count - a.count).map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex justify-between gap-2",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [s.drug, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "block text-xs text-muted",
										children: s.location
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "tabular-nums font-medium",
										children: s.count
									})]
								}, `${s.drug}-${s.location}`))
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
							title: "ABDM / ABHA sync",
							kicker: "Infrastructure health, not clinical",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("dl", {
								className: "grid grid-cols-3 gap-2 text-center",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
										n: abha.onboarded,
										l: "Onboarded"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
										n: abha.ok,
										l: "Exchanges ok"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
										n: abha.fail,
										l: "Failures",
										alert: abha.fail > 0
									})
								]
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Panel, {
					title: "Staff workload",
					kicker: "Who is overloaded — planning, not per-item",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "grid gap-2 sm:grid-cols-4",
						children: workload.map((w) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "rounded-[var(--radius-md)] bg-bg p-3",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted",
									children: w.dept
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "font-display text-2xl tabular-nums",
									children: w.load
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "text-xs text-muted",
									children: "open items"
								})
							]
						}, w.dept))
					})
				})
			]
		})]
	});
}
function Panel({ title, kicker, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
		className: "rounded-[var(--radius-xl)] border border-border bg-surface p-5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-xl",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-3 text-xs text-muted",
				children: kicker
			}),
			children
		]
	});
}
function Stat({ n, l, alert }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-[var(--radius-md)] bg-bg p-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: `font-display text-2xl tabular-nums ${alert ? "text-alert" : ""}`,
			children: n
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-muted",
			children: l
		})]
	});
}
//#endregion
export { HospitalApp as component };

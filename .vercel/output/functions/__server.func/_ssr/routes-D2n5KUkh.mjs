import { b as require_jsx_runtime, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Mic, o as Hospital, r as Stethoscope, u as ArrowRight } from "../_libs/lucide-react.mjs";
import { t as BrandMark } from "./app-chrome-P74YfNfr.mjs";
import { t as Button } from "./button-mPvsgXPp.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-D2n5KUkh.js
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "min-h-dvh bg-bg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "mx-auto flex max-w-5xl items-center justify-between px-5 py-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(BrandMark, {}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "hidden text-xs text-muted sm:block",
				children: "Prototype on ABDM / ABHA"
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
			className: "mx-auto max-w-5xl px-5 pb-16 pt-6 sm:pt-14",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs font-medium uppercase tracking-[0.16em] text-primary",
					children: "Portable follow-up layer"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
					className: "mt-3 max-w-2xl font-display text-4xl font-medium tracking-tight text-ink sm:text-5xl",
					children: "AI listens between visits. A doctor still decides everything."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-5 max-w-xl text-base text-muted",
					children: "Setu is the listening layer on ABDM: voice check-ins, photographed reports, adherence reasons, and shortage signals — routed to a human, then written back to ABHA."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 flex flex-wrap gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							to: "/patient",
							children: ["Open patient check-in ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})]
						})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						asChild: true,
						variant: "outline",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							to: "/doctor",
							children: "Clinician queue"
						})
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-14 grid gap-4 sm:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortalCard, {
							to: "/patient",
							icon: Mic,
							kicker: "Patient",
							title: "Voice-first check-in",
							copy: "Thirty-second check-in. Reports appear only after a clinician releases them."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortalCard, {
							to: "/doctor",
							icon: Stethoscope,
							kicker: "Clinician",
							title: "Parallel queues",
							copy: "Doctor and team notified together. First to act claims the item. Nothing auto-releases."
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PortalCard, {
							to: "/hospital",
							icon: Hospital,
							kicker: "Hospital",
							title: "Operations roll-up",
							copy: "Queue health, adherence reasons, shortage early-warning, ABHA sync — same pipeline, one level up."
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ol", {
					className: "mt-12 grid gap-3 text-sm text-muted sm:grid-cols-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "rounded-[var(--radius-lg)] border border-border bg-surface p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-xs text-subtle",
								children: "01"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-ink",
								children: "Check in as Meera — miss a dose or photograph a lab slip."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "rounded-[var(--radius-lg)] border border-border bg-surface p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-xs text-subtle",
								children: "02"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-ink",
								children: "Open the clinician queue, claim, then release to the patient."
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "rounded-[var(--radius-lg)] border border-border bg-surface p-4",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "font-mono text-xs text-subtle",
								children: "03"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "mt-1 text-ink",
								children: "Watch shortage tallies and hospital panels move with the same data."
							})]
						})
					]
				})
			]
		})]
	});
}
function PortalCard({ to, icon: Icon, kicker, title, copy }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to,
		className: "group flex flex-col rounded-[var(--radius-xl)] border border-border bg-surface p-5 no-underline transition-transform duration-200 hover:-translate-y-0.5",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "flex size-10 items-center justify-center rounded-[12px] bg-primary-soft text-primary",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-5 text-xs font-medium uppercase tracking-[0.14em] text-muted",
				children: kicker
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "mt-1 font-display text-xl font-medium text-ink",
				children: title
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 flex-1 text-sm text-muted",
				children: copy
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
				className: "mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary",
				children: ["Enter ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, { className: "size-4 transition-transform group-hover:translate-x-0.5" })]
			})
		]
	});
}
//#endregion
export { Home as component };

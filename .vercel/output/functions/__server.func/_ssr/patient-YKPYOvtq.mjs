import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { a as Mic, c as Check, i as Pill, l as Camera, s as ChevronLeft } from "../_libs/lucide-react.mjs";
import { a as TopBar, d as usePatient, f as useSetu, i as SAMPLE_UTTERANCES, n as HumanLoopNote, r as SAMPLE_REPORTS } from "./app-chrome-P74YfNfr.mjs";
import { r as REASON_LABEL } from "./types-BaXrDOwd.mjs";
import { t as PatientStatusChip } from "./status-badge-CvKRyn5h.mjs";
import { t as Button } from "./button-mPvsgXPp.mjs";
import { t as formatDistanceToNow } from "../_libs/date-fns.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/patient-YKPYOvtq.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function PatientApp() {
	const patient = usePatient();
	const items = useSetu((s) => s.items).filter((i) => i.patientId === patient.id);
	const [flow, setFlow] = (0, import_react.useState)("home");
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-bg",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TopBar, {
			title: patient.name,
			subtitle: `${patient.condition} · ABHA ${patient.abhaId}`
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto max-w-md px-4 py-5 pb-16",
			children: [
				flow === "home" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Home, {
					patient,
					items,
					onGo: setFlow
				}),
				flow === "voice" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(VoiceFlow, {
					onBack: () => setFlow("home"),
					onDone: () => setFlow("sent")
				}),
				flow === "camera" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CameraFlow, {
					onBack: () => setFlow("home"),
					onDone: () => setFlow("sent")
				}),
				flow === "sent" && /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Sent, { onHome: () => setFlow("home") })
			]
		})]
	});
}
function Home({ patient, items, onGo }) {
	const released = items.filter((i) => i.kind === "report" && i.released);
	const timeline = [...items].sort((a, b) => +new Date(b.createdAt) - +new Date(a.createdAt));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(HumanLoopNote, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: () => onGo("voice"),
				className: "flex w-full flex-col items-center rounded-[var(--radius-xl)] bg-primary px-6 py-8 text-primary-fg",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex size-16 items-center justify-center rounded-full bg-primary-fg/10",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "size-7" })
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-4 font-display text-2xl font-medium",
						children: "How are you feeling?"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "mt-1 text-sm text-primary-fg/80",
						children: "Voice check-in · under 30 seconds"
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-[var(--radius-lg)] border border-border bg-surface p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium uppercase tracking-[0.12em] text-muted",
						children: "Upcoming"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 font-display text-lg text-ink",
						children: patient.nextFollowUpLabel
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-sm text-muted",
						children: [
							patient.doctorName,
							" · ",
							patient.department
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
					type: "button",
					onClick: () => onGo("camera"),
					className: "flex min-h-28 flex-col items-start rounded-[var(--radius-lg)] border border-border bg-surface p-4 text-left",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Camera, { className: "size-5 text-primary" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "mt-3 text-sm font-medium",
							children: "Photograph report"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-xs text-muted",
							children: "OCR on device, you confirm"
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "rounded-[var(--radius-lg)] border border-border bg-surface p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Pill, { className: "size-5 text-primary" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "mt-3 text-sm font-medium",
							children: "Today’s medicines"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted",
							children: patient.meds.map((m) => m.name).join(" · ")
						})
					]
				})]
			}),
			released.length > 0 && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-lg",
				children: "Released reports"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "mt-2 space-y-2",
				children: released.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "rounded-[var(--radius-md)] border border-border bg-surface p-3",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium",
								children: "Lab report"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PatientStatusChip, { value: r.status })]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "mt-1 text-xs text-muted",
							children: ["Reviewed by ", r.reviewerName]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "mt-2 space-y-0.5 text-sm",
							children: r.tests?.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
								className: t.flagged ? "text-alert" : "text-ink",
								children: [
									t.name,
									" ",
									t.value,
									" ",
									t.unit,
									t.flagged ? " · outside printed range" : ""
								]
							}, t.name))
						})
					]
				}, r.id))
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
				className: "font-display text-lg",
				children: "Timeline"
			}), timeline.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 text-sm text-muted",
				children: "No check-ins yet."
			}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
				className: "mt-2 space-y-2",
				children: timeline.map((i) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-start justify-between gap-3 rounded-[var(--radius-md)] border border-border bg-surface px-3 py-2.5",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm font-medium",
						children: i.kind === "checkin" ? i.reason ? REASON_LABEL[i.reason] : "Check-in" : "Lab report"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted",
						children: [formatDistanceToNow(new Date(i.createdAt), { addSuffix: true }), i.released ? "" : " · waiting on your care team"]
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(PatientStatusChip, { value: i.status })]
				}, i.id))
			})] })
		]
	});
}
function VoiceFlow({ onBack, onDone }) {
	const submit = useSetu((s) => s.submitCheckIn);
	const patient = usePatient();
	const [listening, setListening] = (0, import_react.useState)(false);
	const [transcript, setTranscript] = (0, import_react.useState)("");
	const [reason, setReason] = (0, import_react.useState)(null);
	const askWhy = reason !== null && reason !== "taken";
	function capture(text) {
		setTranscript(text);
		const lower = text.toLowerCase();
		if (lower.includes("took") || lower.startsWith("yes")) setReason("taken");
		else if (lower.includes("nause") || lower.includes("side")) setReason("side_effects");
		else if (lower.includes("pharmacy") || lower.includes("stock") || lower.includes("don't have")) setReason("unavailable");
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
			medicine: reason === "unavailable" ? patient.meds[0]?.name : void 0
		});
		onDone();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: onBack,
				className: "inline-flex min-h-11 items-center gap-1 text-sm text-muted",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-4" }), " Home"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-2xl",
				children: "Did you take your medicine today?"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "Speak naturally. Classification stays on-device in the real app."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: listenDemo,
				className: "flex w-full flex-col items-center rounded-[var(--radius-xl)] border border-border bg-surface py-8",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: `flex size-16 items-center justify-center rounded-full ${listening ? "bg-alert-soft text-alert" : "bg-primary-soft text-primary"}`,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mic, { className: "size-7" })
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					className: "mt-3 text-sm",
					children: listening ? "Listening…" : "Tap to speak (demo)"
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted",
				children: "Or pick a sample utterance"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: SAMPLE_UTTERANCES.map((u) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => capture(u.text),
					className: "h-11 rounded-full border border-border bg-surface px-3 text-sm",
					children: u.label
				}, u.label))
			}),
			transcript && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("blockquote", {
				className: "rounded-[var(--radius-md)] border border-border bg-surface p-3 text-sm italic text-ink",
				children: [
					"“",
					transcript,
					"”"
				]
			}),
			reason && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs font-medium uppercase tracking-[0.12em] text-muted",
				children: "Reason classified"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2 flex flex-wrap gap-2",
				children: [
					"taken",
					"forgot",
					"side_effects",
					"unavailable",
					"other"
				].map((code) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setReason(code),
					className: `h-11 rounded-full px-3 text-sm ${reason === code ? "bg-primary text-primary-fg" : "border border-border bg-surface"}`,
					children: REASON_LABEL[code]
				}, code))
			})] }),
			askWhy && reason === "unavailable" && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
				className: "text-sm text-muted",
				children: [
					"This will create a task for ",
					patient.doctorName,
					" and add to the ",
					patient.meds[0]?.name,
					" shortage tally in ",
					patient.location,
					"."
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "w-full",
				disabled: !reason,
				onClick: send,
				children: "Send to care team"
			})
		]
	});
}
function CameraFlow({ onBack, onDone }) {
	const submit = useSetu((s) => s.submitReport);
	const [pick, setPick] = (0, import_react.useState)(null);
	const [confirmed, setConfirmed] = (0, import_react.useState)(false);
	const sample = (0, import_react.useMemo)(() => pick ?? SAMPLE_REPORTS[0], [pick]);
	function send() {
		if (!pick) return;
		submit({
			ocrText: pick.ocrText,
			tests: pick.tests ?? []
		});
		onDone();
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "space-y-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
				type: "button",
				onClick: onBack,
				className: "inline-flex min-h-11 items-center gap-1 text-sm text-muted",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ChevronLeft, { className: "size-4" }), " Home"]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-2xl",
				children: "Photograph a report"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted",
				children: "On-device OCR reads the slip. You confirm the text before it leaves the phone."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "flex flex-wrap gap-2",
				children: SAMPLE_REPORTS.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => {
						setPick(r);
						setConfirmed(false);
					},
					className: `h-11 rounded-full px-3 text-sm ${pick?.label === r.label ? "bg-primary text-primary-fg" : "border border-border bg-surface"}`,
					children: r.label
				}, r.label))
			}),
			pick && /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "rounded-[var(--radius-lg)] border border-border bg-surface p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs font-medium uppercase tracking-[0.12em] text-muted",
						children: "OCR preview"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 font-mono text-xs leading-relaxed text-ink",
						children: sample.ocrText
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
						className: "mt-3 space-y-1 text-sm",
						children: sample.tests?.map((t) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: t.flagged ? "text-alert" : "",
							children: [
								t.name,
								": ",
								t.value,
								" ",
								t.unit,
								t.low != null ? ` (${t.low}–${t.high})` : "",
								t.flagged ? " · flagged vs printed range" : ""
							]
						}, t.name))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "mt-3 flex min-h-11 items-center gap-2 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							checked: confirmed,
							onChange: (e) => setConfirmed(e.target.checked),
							className: "size-4 accent-[var(--color-primary)]"
						}), "Text was read correctly"]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "w-full",
				disabled: !pick || !confirmed,
				onClick: send,
				children: "Submit for review"
			})
		]
	});
}
function Sent({ onHome }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex flex-col items-center py-16 text-center",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "flex size-14 items-center justify-center rounded-full bg-ok-soft text-ok",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Check, { className: "size-7" })
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "mt-4 font-display text-2xl",
				children: "Sent to your care team"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-2 max-w-xs text-sm text-muted",
				children: "Nothing is shown back to you until a person reviews it. Switch to Clinician to continue the demo."
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "mt-6",
				onClick: onHome,
				children: "Back home"
			})
		]
	});
}
//#endregion
export { PatientApp as component };

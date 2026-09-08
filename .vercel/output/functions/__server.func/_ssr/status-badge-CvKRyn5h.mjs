import { b as require_jsx_runtime } from "../_libs/@tanstack/react-router+[...].mjs";
import { c as cn } from "./app-chrome-P74YfNfr.mjs";
import { i as STATUS_LABEL, n as PRIORITY_LABEL, t as PATIENT_STATUS } from "./types-BaXrDOwd.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/status-badge-CvKRyn5h.js
var import_jsx_runtime = require_jsx_runtime();
function PriorityBadge({ value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
		className: cn("inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium", value === "routine" && "bg-ok-soft text-ok", value === "review" && "bg-review-soft text-review", value === "alert" && "bg-alert-soft text-alert"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
			className: cn("size-1.5 rounded-full", value === "routine" && "bg-ok", value === "review" && "bg-review", value === "alert" && "bg-alert"),
			"aria-hidden": true
		}), PRIORITY_LABEL[value]]
	});
}
function StatusBadge({ value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: "inline-flex rounded-full bg-surface-2 px-2.5 py-0.5 text-xs font-medium text-muted",
		children: STATUS_LABEL[value]
	});
}
function PatientStatusChip({ value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium", value === "released" ? "bg-ok-soft text-ok" : value === "escalated" ? "bg-alert-soft text-alert" : "bg-review-soft text-review"),
		children: PATIENT_STATUS[value]
	});
}
//#endregion
export { PriorityBadge as n, StatusBadge as r, PatientStatusChip as t };

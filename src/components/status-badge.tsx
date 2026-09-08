import { cn } from "@/lib/cn";
import { PATIENT_STATUS, PRIORITY_LABEL, STATUS_LABEL, type ItemStatus, type Priority } from "@/lib/types";

export function PriorityBadge({ value }: { value: Priority }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-0.5 text-xs font-medium",
        value === "routine" && "bg-ok-soft text-ok",
        value === "review" && "bg-review-soft text-review",
        value === "alert" && "bg-alert-soft text-alert",
      )}
    >
      <span
        className={cn(
          "size-1.5 rounded-full",
          value === "routine" && "bg-ok",
          value === "review" && "bg-review",
          value === "alert" && "bg-alert",
        )}
        aria-hidden
      />
      {PRIORITY_LABEL[value]}
    </span>
  );
}

export function StatusBadge({ value }: { value: ItemStatus }) {
  return (
    <span className="inline-flex rounded-full bg-surface-2 px-2.5 py-0.5 text-xs font-medium text-muted">
      {STATUS_LABEL[value]}
    </span>
  );
}

export function PatientStatusChip({ value }: { value: ItemStatus }) {
  const tone =
    value === "released"
      ? "bg-ok-soft text-ok"
      : value === "escalated"
        ? "bg-alert-soft text-alert"
        : "bg-review-soft text-review";
  return (
    <span className={cn("inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium", tone)}>
      {PATIENT_STATUS[value]}
    </span>
  );
}

type Status = "Paid" | "Pending" | "Overdue" | "Draft";

const STYLES: Record<Status, string> = {
  Paid: "bg-successSoft text-success border-success/20",
  Pending: "bg-warningSoft text-warning border-warning/20",
  Overdue: "bg-dangerSoft text-danger border-danger/20",
  Draft: "bg-white/5 text-muted border-white/10",
};

export default function StatusBadge({ status }: { status: Status }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${STYLES[status]}`}
    >
      <span className="h-1.5 w-1.5 rounded-full bg-current" />
      {status}
    </span>
  );
}

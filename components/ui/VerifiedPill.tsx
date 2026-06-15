import { ShieldCheck, Circle } from "lucide-react";

export default function VerifiedPill({ verified }: { verified: boolean }) {
  if (verified) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-full border border-accent/25 bg-accentSoft px-2.5 py-1 text-xs font-medium text-accent">
        <ShieldCheck className="h-3.5 w-3.5" />
        Verified outcome
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-xs font-medium text-muted">
      <Circle className="h-3.5 w-3.5" />
      Activity
    </span>
  );
}

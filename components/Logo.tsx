/**
 * Brand mark for AgentPayd.
 *
 * `LogoMark` is a stand-in for the "AP" monogram / app icon (brand sheet
 * section 02) — a dark rounded tile with the "AP" initials and a small
 * electric-blue "node", echoing the connection-point motif used
 * throughout the brand sheet (agent network, payment flow, primary logo).
 *
 * `Wordmark` reproduces the uppercase, wide-tracked "AGENTPAYD" logotype
 * (brand sheet section 01/03).
 */

export function LogoMark({ className = "h-8 w-8" }: { className?: string }) {
  return (
    <span
      className={`relative inline-flex shrink-0 items-center justify-center rounded-lg bg-ink ${className}`}
    >
      <span className="font-sans text-[11px] font-bold leading-none tracking-tight text-bg">
        AP
      </span>
      <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full bg-accent ring-2 ring-bg" />
    </span>
  );
}

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`font-sans font-bold uppercase tracking-[0.2em] ${className}`}
    >
      AgentPayd
    </span>
  );
}

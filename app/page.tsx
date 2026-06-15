import Link from "next/link";
import { ArrowRight, ShieldCheck, Zap, Receipt, TrendingUp, LucideIcon } from "lucide-react";
import { getAgencyTotals } from "@/lib/mock-data";
import { formatJPY, formatRoi } from "@/lib/format";
import { LogoMark, Wordmark } from "@/components/Logo";

export default function LandingPage() {
  const totals = getAgencyTotals();

  return (
    <main className="min-h-screen bg-bg text-ink">
      <div className="mx-auto flex min-h-screen max-w-6xl flex-col lg:flex-row">
        {/* Left: brand statement */}
        <section className="relative flex flex-1 flex-col justify-between overflow-hidden border-b border-border px-6 py-10 lg:border-b-0 lg:border-r lg:px-12 lg:py-16">
          <div className="bg-dot-grid pointer-events-none absolute inset-0 opacity-40 [mask-image:linear-gradient(to_bottom,black,transparent)]" />

          <div className="relative">
            <div className="flex items-center gap-2.5">
              <LogoMark className="h-9 w-9" />
              <Wordmark className="text-base text-ink" />
            </div>
            <div className="mt-2.5 flex items-center gap-3">
              <span className="h-px w-8 bg-accent/40" />
              <span className="text-[10px] font-semibold uppercase tracking-[0.3em] text-accent">
                One for all
              </span>
            </div>

            <p className="mt-12 text-xs font-semibold uppercase tracking-[0.25em] text-muted">
              Outcome billing infrastructure for AI agents
            </p>
            <h1 className="mt-3 max-w-md text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">
              Prove what your AI agents did.{" "}
              <span className="text-accent">Get paid for it.</span>
            </h1>
            <p className="mt-4 max-w-md text-base text-muted">
              AgentPayd turns agent activity into verified outcomes, client-ready
              ROI reports, and invoices — so AI agencies can show results and
              collect revenue without spreadsheets.
            </p>
          </div>

          {/* Live snapshot using the demo agency's numbers */}
          <div className="relative mt-12 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <SnapshotStat
              icon={TrendingUp}
              label="Value created"
              value={formatJPY(totals.revenueAttributed)}
            />
            <SnapshotStat
              icon={ShieldCheck}
              label="Outcomes verified"
              value={String(totals.totalOutcomesVerified)}
            />
            <SnapshotStat
              icon={Receipt}
              label="Invoices generated"
              value={String(totals.invoicesGenerated)}
            />
            <SnapshotStat
              icon={Zap}
              label="Blended ROI"
              value={formatRoi(totals.blendedRoi)}
            />
          </div>
        </section>

        {/* Right: login card */}
        <section className="flex flex-1 items-center justify-center px-6 py-12 lg:px-12">
          <div className="w-full max-w-sm">
            <h2 className="text-2xl font-semibold tracking-tight">
              Sign in to your agency
            </h2>
            <p className="mt-1.5 text-sm text-muted">
              This is a demo build — authentication isn&apos;t wired up yet.
            </p>

            <form className="mt-8 space-y-4">
              <div>
                <label
                  htmlFor="email"
                  className="mb-1.5 block text-sm font-medium text-ink"
                >
                  Work email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="you@agency.com"
                  className="w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-subtle focus:border-accent focus:outline-none"
                  disabled
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="mb-1.5 block text-sm font-medium text-ink"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••••••"
                  className="w-full rounded-lg border border-border bg-surface px-3.5 py-2.5 text-sm text-ink placeholder:text-subtle focus:border-accent focus:outline-none"
                  disabled
                />
              </div>
              <button
                type="button"
                disabled
                className="w-full cursor-not-allowed rounded-lg border border-border bg-surface py-2.5 text-sm font-medium text-subtle"
              >
                Sign in (disabled in demo)
              </button>
            </form>

            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-border" />
              <span className="text-xs uppercase tracking-wider text-subtle">
                or
              </span>
              <div className="h-px flex-1 bg-border" />
            </div>

            <Link
              href="/dashboard"
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-accent py-2.5 text-sm font-semibold text-white shadow-glow transition-transform hover:translate-y-[-1px]"
            >
              Continue to demo dashboard
              <ArrowRight className="h-4 w-4" />
            </Link>

            <p className="mt-4 text-center text-xs text-subtle">
              Viewing <span className="text-muted">Tokyo AI Automation Studio</span>{" "}
              — sample agency data
            </p>
          </div>
        </section>
      </div>
    </main>
  );
}

function SnapshotStat({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="rounded-xl border border-border bg-surface/60 p-3">
      <Icon className="h-4 w-4 text-accent" />
      <p className="mt-2 text-lg font-bold text-ink">{value}</p>
      <p className="text-xs text-muted">{label}</p>
    </div>
  );
}

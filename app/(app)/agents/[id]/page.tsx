import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, TrendingUp, Wallet, Zap, ShieldCheck } from "lucide-react";
import Topbar from "@/components/Topbar";
import StatCard from "@/components/ui/StatCard";
import VerifiedPill from "@/components/ui/VerifiedPill";
import {
  agents,
  getAgentById,
  getClientById,
  getActivityForAgent,
  getInvoiceableEventsForAgent,
} from "@/lib/mock-data";
import { formatJPY, formatNumber, formatRoi, formatDate } from "@/lib/format";
import { calculateRoi } from "@/lib/types";

export function generateStaticParams() {
  return agents.map((agent) => ({ id: agent.id }));
}

export default function AgentDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const agent = getAgentById(params.id);
  if (!agent) notFound();

  const client = getClientById(agent.clientId);
  const roi = calculateRoi(agent.valueCreated, agent.cost);
  const activity = getActivityForAgent(agent.id);
  const invoiceable = getInvoiceableEventsForAgent(agent.id);
  const invoiceableTotal = invoiceable.reduce((sum, e) => sum + e.value, 0);

  return (
    <div>
      <Topbar title={agent.name} description={`${client?.name} · ${agent.type}`} />

      <div className="space-y-8 px-4 py-6 sm:px-6 lg:px-8">
        <Link
          href="/agents"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-ink"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to AI Agents
        </Link>

        {/* ROI calculation */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="Revenue attributed"
            value={formatJPY(agent.valueCreated)}
            sublabel="Verified value created this month"
            icon={TrendingUp}
          />
          <StatCard
            label="Agent cost"
            value={formatJPY(agent.cost)}
            sublabel="Monthly service fee"
            icon={Wallet}
          />
          <StatCard
            label="ROI"
            value={formatRoi(roi)}
            sublabel={`${formatJPY(agent.valueCreated)} ÷ ${formatJPY(agent.cost)}`}
            icon={Zap}
            accent
          />
          <StatCard
            label="Outcomes verified"
            value={formatNumber(agent.outcomesVerified)}
            sublabel={agent.outcomesLabel}
            icon={ShieldCheck}
          />
        </div>

        {/* Invoiceable events */}
        <section>
          <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-lg font-semibold tracking-tight text-ink">
                Invoiceable events
              </h2>
              <p className="text-sm text-muted">
                Verified outcomes that back this period&apos;s invoice
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <p className="text-lg font-semibold text-ink">
                  {formatJPY(agent.cost)}
                </p>
                <p className="text-xs text-muted">
                  This period&apos;s invoice · {invoiceable.length} verified
                  outcomes
                </p>
              </div>
              <Link
                href="/invoices"
                className="rounded-lg bg-accent px-4 py-2.5 text-sm font-semibold text-white shadow-glow transition-transform hover:translate-y-[-1px]"
              >
                Generate invoice
              </Link>
            </div>
          </div>

          <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-card">
            <ul className="divide-y divide-border">
              {invoiceable.map((event) => (
                <li
                  key={event.id}
                  className="flex flex-col gap-2 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm text-ink">
                      {event.description}
                    </p>
                    <p className="mt-0.5 text-xs text-muted">
                      {formatDate(event.date)}
                    </p>
                  </div>
                  <p className="text-sm font-semibold text-success">
                    {formatJPY(event.value)}
                  </p>
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-between border-t border-border bg-bg/40 px-5 py-3 text-xs text-muted">
              <span>Total attributed value from these outcomes</span>
              <span className="font-semibold text-ink">
                {formatJPY(invoiceableTotal)}
              </span>
            </div>
          </div>
        </section>

        {/* Activity log */}
        <section>
          <div className="mb-4">
            <h2 className="text-lg font-semibold tracking-tight text-ink">
              Activity log
            </h2>
            <p className="text-sm text-muted">
              The {activity.length} most recent actions, out of{" "}
              {formatNumber(agent.tasksCompleted)} {agent.tasksLabel.toLowerCase()}{" "}
              this month, with verification status
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-card">
            <ul className="divide-y divide-border">
              {activity.map((entry) => (
                <li key={entry.id} className="flex flex-col gap-2 px-5 py-4">
                  <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between">
                    <p className="text-sm text-ink sm:max-w-md">
                      {entry.description}
                    </p>
                    <div className="flex items-center gap-3">
                      {entry.value && (
                        <span className="text-sm font-semibold text-ink">
                          {formatJPY(entry.value)}
                        </span>
                      )}
                      <VerifiedPill verified={entry.verified} />
                    </div>
                  </div>
                  <p className="text-xs text-muted">{formatDate(entry.date)}</p>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}

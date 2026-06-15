import Link from "next/link";
import { notFound } from "next/navigation";
import {
  ArrowLeft,
  Download,
  ListChecks,
  ShieldCheck,
  Wallet,
  Zap,
} from "lucide-react";
import Topbar from "@/components/Topbar";
import StatCard from "@/components/ui/StatCard";
import {
  clients,
  getClientById,
  getAgentsByClientId,
} from "@/lib/mock-data";
import { formatJPY, formatNumber, formatRoi } from "@/lib/format";
import { calculateRoi } from "@/lib/types";

export function generateStaticParams() {
  return clients.map((client) => ({ clientId: client.id }));
}

export default function RoiReportPage({
  params,
}: {
  params: { clientId: string };
}) {
  const client = getClientById(params.clientId);
  if (!client) notFound();

  const clientAgents = getAgentsByClientId(client.id);
  const totalValue = clientAgents.reduce((sum, a) => sum + a.valueCreated, 0);
  const totalCost = clientAgents.reduce((sum, a) => sum + a.cost, 0);
  const totalTasks = clientAgents.reduce((sum, a) => sum + a.tasksCompleted, 0);
  const totalOutcomes = clientAgents.reduce(
    (sum, a) => sum + a.outcomesVerified,
    0
  );
  const roi = calculateRoi(totalValue, totalCost);

  return (
    <div>
      <Topbar title="ROI Report" description={`${client.name} · June 2026`} />

      <div className="space-y-8 px-4 py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/clients"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-muted hover:text-ink"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Clients
          </Link>
          <button
            type="button"
            title="PDF export is not wired up in this demo"
            className="inline-flex items-center justify-center gap-1.5 self-start rounded-lg border border-border bg-surface px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:border-accent/40 hover:text-accent sm:self-auto"
          >
            <Download className="h-4 w-4" />
            Export PDF
          </button>
        </div>

        {/* Hero statement */}
        <section className="relative overflow-hidden rounded-2xl border border-accent/20 bg-surface p-8 shadow-card sm:p-12">
          <div className="bg-dot-grid pointer-events-none absolute inset-0 opacity-30 [mask-image:radial-gradient(circle_at_top_left,black,transparent_70%)]" />
          <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-accent/20 blur-3xl" />

          <div className="relative">
            <p className="text-xs font-medium uppercase tracking-wider text-accent">
              {client.name} · Monthly results
            </p>
            <h1 className="mt-3 max-w-2xl text-3xl font-semibold leading-tight tracking-tight text-ink sm:text-4xl lg:text-5xl">
              Your AI agent{clientAgents.length > 1 ? "s" : ""} created{" "}
              <span className="font-bold text-accent">
                {formatJPY(totalValue)}
              </span>{" "}
              in value this month.
            </h1>
            <p className="mt-4 max-w-xl text-base text-muted">
              That&apos;s every booking, lead, and recovered sale your{" "}
              {clientAgents.map((a) => a.name).join(" and ")} verified and
              attributed directly to {client.name} — for a total agent cost of{" "}
              {formatJPY(totalCost)}.
            </p>
          </div>
        </section>

        {/* Stats grid */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            label="Tasks completed"
            value={formatNumber(totalTasks)}
            sublabel="All agent activity this month"
            icon={ListChecks}
          />
          <StatCard
            label="Outcomes verified"
            value={formatNumber(totalOutcomes)}
            sublabel="Confirmed, billable results"
            icon={ShieldCheck}
          />
          <StatCard
            label="Agent cost"
            value={formatJPY(totalCost)}
            sublabel="Total monthly service fee"
            icon={Wallet}
          />
          <StatCard
            label="ROI multiple"
            value={formatRoi(roi)}
            sublabel="Value created per ¥ spent"
            icon={Zap}
            accent
          />
        </div>

        {/* Per-agent breakdown */}
        <section>
          <div className="mb-4">
            <h2 className="text-lg font-semibold tracking-tight text-ink">
              Breakdown by agent
            </h2>
            <p className="text-sm text-muted">
              How each AI agent contributed to {client.name}&apos;s results
            </p>
          </div>

          <div className="space-y-3">
            {clientAgents.map((agent) => {
              const agentRoi = calculateRoi(agent.valueCreated, agent.cost);
              return (
                <div
                  key={agent.id}
                  className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-5 shadow-card sm:flex-row sm:items-center sm:justify-between"
                >
                  <div>
                    <p className="text-sm font-medium text-ink">
                      {agent.name}
                    </p>
                    <p className="text-xs text-muted">{agent.type}</p>
                  </div>
                  <div className="grid grid-cols-2 gap-6 text-sm sm:grid-cols-4">
                    <div>
                      <p className="font-semibold text-ink">
                        {formatNumber(agent.tasksCompleted)}
                      </p>
                      <p className="text-xs text-muted">{agent.tasksLabel}</p>
                    </div>
                    <div>
                      <p className="font-semibold text-ink">
                        {formatNumber(agent.outcomesVerified)}
                      </p>
                      <p className="text-xs text-muted">
                        {agent.outcomesLabel}
                      </p>
                    </div>
                    <div>
                      <p className="font-semibold text-ink">
                        {formatJPY(agent.valueCreated)}
                      </p>
                      <p className="text-xs text-muted">Value created</p>
                    </div>
                    <div>
                      <p className="font-bold text-accent">
                        {formatRoi(agentRoi)}
                      </p>
                      <p className="text-xs text-muted">ROI</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <p className="pb-6 text-center text-xs text-subtle">
          Generated by AgentPayd — proof of AI agent performance for{" "}
          {client.name}
        </p>
      </div>
    </div>
  );
}

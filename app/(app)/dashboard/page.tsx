import Link from "next/link";
import { Users, Bot, TrendingUp, Receipt, Zap, ArrowRight } from "lucide-react";
import Topbar from "@/components/Topbar";
import StatCard from "@/components/ui/StatCard";
import {
  agents,
  clients,
  invoices,
  activityLog,
  getClientById,
  getAgencyTotals,
} from "@/lib/mock-data";
import { formatJPY, formatRoi, formatDate } from "@/lib/format";
import { calculateRoi } from "@/lib/types";

export default function DashboardPage() {
  const totals = getAgencyTotals();

  const invoiceStatusCounts = invoices.reduce<Record<string, number>>(
    (acc, inv) => {
      acc[inv.status] = (acc[inv.status] ?? 0) + 1;
      return acc;
    },
    {}
  );
  const invoiceSummary = `${invoiceStatusCounts.Paid ?? 0} paid, ${
    invoiceStatusCounts.Pending ?? 0
  } pending, ${invoiceStatusCounts.Overdue ?? 0} overdue`;

  const recentVerified = activityLog
    .filter((entry) => entry.verified)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);

  return (
    <div>
      <Topbar
        title="Dashboard"
        description={`Agency overview for June 2026 · ${totals.totalClients} clients · ${totals.totalAgents} active agents`}
      />

      <div className="space-y-8 px-4 py-6 sm:px-6 lg:px-8">
        {/* KPI row */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          <StatCard
            label="Total clients"
            value={totals.totalClients}
            sublabel={`${new Set(clients.map((c) => c.industry)).size} industries`}
            icon={Users}
          />
          <StatCard
            label="Total AI agents"
            value={totals.totalAgents}
            sublabel="All currently active"
            icon={Bot}
          />
          <StatCard
            label="Revenue attributed"
            value={formatJPY(totals.revenueAttributed)}
            sublabel="Verified value, this month"
            icon={TrendingUp}
          />
          <StatCard
            label="Invoices generated"
            value={totals.invoicesGenerated}
            sublabel={invoiceSummary}
            icon={Receipt}
          />
          <StatCard
            label="Blended ROI"
            value={formatRoi(totals.blendedRoi)}
            sublabel={`On ${formatJPY(totals.totalCost)} agent cost`}
            icon={Zap}
            accent
          />
        </div>

        {/* ROI overview */}
        <section>
          <div className="mb-4 flex items-end justify-between">
            <div>
              <h2 className="text-lg font-semibold tracking-tight text-ink">
                ROI overview
              </h2>
              <p className="text-sm text-muted">
                Value created versus monthly cost, per agent
              </p>
            </div>
            <Link
              href="/agents"
              className="hidden items-center gap-1.5 text-sm font-medium text-accent hover:underline sm:flex"
            >
              View all agents
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
            {agents.map((agent) => {
              const client = getClientById(agent.clientId);
              const roi = calculateRoi(agent.valueCreated, agent.cost);
              const costShare = Math.min(
                100,
                (agent.cost / agent.valueCreated) * 100
              );
              return (
                <Link
                  key={agent.id}
                  href={`/agents/${agent.id}`}
                  className="group rounded-2xl border border-border bg-surface p-5 shadow-card transition-colors hover:border-accent/40"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-sm font-medium text-ink">
                        {agent.name}
                      </p>
                      <p className="text-xs text-muted">{client?.name}</p>
                    </div>
                    <span className="rounded-full border border-border bg-bg px-2.5 py-1 text-xs font-medium text-muted">
                      {agent.type}
                    </span>
                  </div>

                  <p className="mt-5 text-3xl font-bold text-accent">
                    {formatRoi(roi)}
                  </p>
                  <p className="text-xs text-muted">return on agent cost</p>

                  <div className="mt-4 flex h-2 w-full overflow-hidden rounded-full bg-white/5">
                    <div
                      className="h-full bg-white/25"
                      style={{ width: `${costShare}%` }}
                    />
                    <div
                      className="h-full flex-1 bg-accent"
                    />
                  </div>
                  <div className="mt-2 flex items-center justify-between text-xs text-muted">
                    <span>Cost {formatJPY(agent.cost)}</span>
                    <span>Net value {formatJPY(agent.valueCreated - agent.cost)}</span>
                  </div>
                </Link>
              );
            })}
          </div>
        </section>

        {/* Recent verified outcomes */}
        <section>
          <div className="mb-4">
            <h2 className="text-lg font-semibold tracking-tight text-ink">
              Recent verified outcomes
            </h2>
            <p className="text-sm text-muted">
              The latest agent activity confirmed as a billable outcome
            </p>
          </div>

          <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-card">
            <ul className="divide-y divide-border">
              {recentVerified.map((entry) => {
                const agent = agents.find((a) => a.id === entry.agentId);
                const client = agent
                  ? getClientById(agent.clientId)
                  : undefined;
                return (
                  <li
                    key={entry.id}
                    className="flex flex-col gap-2 px-5 py-4 sm:flex-row sm:items-center sm:justify-between"
                  >
                    <div className="min-w-0">
                      <p className="truncate text-sm text-ink">
                        {entry.description}
                      </p>
                      <p className="mt-0.5 text-xs text-muted">
                        {agent?.name} · {client?.name} ·{" "}
                        {formatDate(entry.date)}
                      </p>
                    </div>
                    <p className="text-sm font-semibold text-accent">
                      {entry.value ? `+${formatJPY(entry.value)}` : ""}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}

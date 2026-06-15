import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Topbar from "@/components/Topbar";
import { agents, getClientById } from "@/lib/mock-data";
import { formatJPY, formatNumber, formatRoi } from "@/lib/format";
import { calculateRoi } from "@/lib/types";

const TYPE_STYLES: Record<string, string> = {
  "Sales Agent": "bg-accentSoft text-accent border-accent/20",
  "Receptionist Agent": "bg-successSoft text-success border-success/20",
  "Support Agent": "bg-warningSoft text-warning border-warning/20",
  "Recruiter Agent": "bg-white/5 text-muted border-white/10",
};

export default function AgentsPage() {
  return (
    <div>
      <Topbar
        title="AI Agents"
        description={`${agents.length} agents deployed across your clients`}
      />

      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-card">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border text-xs uppercase tracking-wider text-muted">
                  <th className="px-5 py-3 font-medium">Agent</th>
                  <th className="px-5 py-3 font-medium">Client</th>
                  <th className="px-5 py-3 font-medium">Type</th>
                  <th className="px-5 py-3 font-medium">Tasks completed</th>
                  <th className="px-5 py-3 font-medium">Outcomes verified</th>
                  <th className="px-5 py-3 font-medium">Value created</th>
                  <th className="px-5 py-3 font-medium">Cost</th>
                  <th className="px-5 py-3 font-medium">ROI</th>
                  <th className="px-5 py-3 font-medium">
                    <span className="sr-only">View details</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {agents.map((agent) => {
                  const client = getClientById(agent.clientId);
                  const roi = calculateRoi(agent.valueCreated, agent.cost);
                  return (
                    <tr
                      key={agent.id}
                      className="transition-colors hover:bg-white/[0.02]"
                    >
                      <td className="px-5 py-4 font-medium text-ink">
                        {agent.name}
                      </td>
                      <td className="px-5 py-4 text-muted">
                        {client?.name}
                      </td>
                      <td className="px-5 py-4">
                        <span
                          className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${TYPE_STYLES[agent.type]}`}
                        >
                          {agent.type}
                        </span>
                      </td>
                      <td className="px-5 py-4">
                        <p className="font-semibold text-ink">
                          {formatNumber(agent.tasksCompleted)}
                        </p>
                        <p className="text-xs text-muted">
                          {agent.tasksLabel}
                        </p>
                      </td>
                      <td className="px-5 py-4">
                        <p className="font-semibold text-ink">
                          {formatNumber(agent.outcomesVerified)}
                        </p>
                        <p className="text-xs text-muted">
                          {agent.outcomesLabel}
                        </p>
                      </td>
                      <td className="px-5 py-4 font-semibold text-ink">
                        {formatJPY(agent.valueCreated)}
                      </td>
                      <td className="px-5 py-4 font-medium text-muted">
                        {formatJPY(agent.cost)}
                      </td>
                      <td className="px-5 py-4 font-bold text-accent">
                        {formatRoi(roi)}
                      </td>
                      <td className="px-5 py-4 text-right">
                        <Link
                          href={`/agents/${agent.id}`}
                          className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
                        >
                          Details
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

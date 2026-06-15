import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import Topbar from "@/components/Topbar";
import StatusBadge from "@/components/ui/StatusBadge";
import { clients, getAgentsByClientId } from "@/lib/mock-data";
import { formatJPY } from "@/lib/format";

export default function ClientsPage() {
  return (
    <div>
      <Topbar
        title="Clients"
        description={`${clients.length} clients on AgentPayd`}
      />

      <div className="px-4 py-6 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-2xl border border-border bg-surface shadow-card">
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead>
                <tr className="border-b border-border text-xs uppercase tracking-wider text-muted">
                  <th className="px-5 py-3 font-medium">Client</th>
                  <th className="px-5 py-3 font-medium">Industry</th>
                  <th className="px-5 py-3 font-medium">Active agents</th>
                  <th className="px-5 py-3 font-medium">
                    Monthly value created
                  </th>
                  <th className="px-5 py-3 font-medium">Payment status</th>
                  <th className="px-5 py-3 font-medium">
                    <span className="sr-only">View report</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {clients.map((client) => {
                  const agentCount = getAgentsByClientId(client.id).length;
                  return (
                    <tr
                      key={client.id}
                      className="transition-colors hover:bg-white/[0.02]"
                    >
                      <td className="px-5 py-4">
                        <div className="flex items-center gap-3">
                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-accentSoft text-sm font-semibold text-accent">
                            {client.logoInitial}
                          </div>
                          <span className="font-medium text-ink">
                            {client.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-5 py-4 text-muted">
                        {client.industry}
                      </td>
                      <td className="px-5 py-4 font-semibold text-ink">
                        {agentCount}
                      </td>
                      <td className="px-5 py-4 font-semibold text-ink">
                        {formatJPY(client.monthlyValueCreated)}
                      </td>
                      <td className="px-5 py-4">
                        <StatusBadge status={client.paymentStatus} />
                      </td>
                      <td className="px-5 py-4 text-right">
                        <Link
                          href={`/reports/${client.id}`}
                          className="inline-flex items-center gap-1 text-sm font-medium text-accent hover:underline"
                        >
                          ROI report
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

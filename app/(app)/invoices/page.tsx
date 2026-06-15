import Link from "next/link";
import { ArrowUpRight, Check, FileText } from "lucide-react";
import Topbar from "@/components/Topbar";
import StatCard from "@/components/ui/StatCard";
import StatusBadge from "@/components/ui/StatusBadge";
import CreatePaymentLinkButton from "@/components/CreatePaymentLinkButton";
import { invoices, getClientById, getAgentById } from "@/lib/mock-data";
import { formatJPY } from "@/lib/format";

export default function InvoicesPage() {
  const total = invoices.reduce((sum, inv) => sum + inv.amount, 0);
  const paid = invoices
    .filter((i) => i.status === "Paid")
    .reduce((sum, inv) => sum + inv.amount, 0);
  const outstanding = invoices
    .filter((i) => i.status !== "Paid")
    .reduce((sum, inv) => sum + inv.amount, 0);

  return (
    <div>
      <Topbar
        title="Invoices"
        description="Generated from verified, billable outcomes"
      />

      <div className="space-y-8 px-4 py-6 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          <StatCard
            label="Total invoiced"
            value={formatJPY(total)}
            sublabel={`${invoices.length} invoices this period`}
            icon={FileText}
          />
          <StatCard
            label="Collected"
            value={formatJPY(paid)}
            sublabel="Paid invoices"
            icon={FileText}
          />
          <StatCard
            label="Outstanding"
            value={formatJPY(outstanding)}
            sublabel="Pending + overdue"
            icon={FileText}
            accent
          />
        </div>

        <section>
          <div className="mb-4">
            <h2 className="text-lg font-semibold tracking-tight text-ink">
              All invoices
            </h2>
            <p className="text-sm text-muted">
              Each invoice is backed by verified outcomes from the agent&apos;s
              activity log
            </p>
          </div>

          <div className="space-y-3">
            {invoices.map((invoice) => {
              const client = getClientById(invoice.clientId);
              const agent = getAgentById(invoice.agentId);
              return (
                <div
                  key={invoice.id}
                  className="flex flex-col gap-4 rounded-2xl border border-border bg-surface p-5 shadow-card sm:flex-row sm:items-center sm:justify-between"
                >
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="font-mono text-xs text-muted">
                        {invoice.id}
                      </p>
                      <StatusBadge status={invoice.status} />
                    </div>
                    <p className="mt-1.5 text-sm font-medium text-ink">
                      {client?.name} — {invoice.description}
                    </p>
                    <p className="mt-0.5 text-xs text-muted">
                      {invoice.periodLabel} · backed by{" "}
                      {invoice.outcomesCount} verified outcomes
                      {agent && (
                        <>
                          {" · "}
                          <Link
                            href={`/agents/${agent.id}`}
                            className="text-accent hover:underline"
                          >
                            view agent
                          </Link>
                        </>
                      )}
                    </p>
                  </div>

                  <div className="flex items-center justify-between gap-4 sm:justify-end">
                    <p className="text-xl font-bold text-ink">
                      {formatJPY(invoice.amount)}
                    </p>
                    {invoice.status === "Paid" ? (
                      <span className="inline-flex items-center gap-1.5 rounded-lg border border-success/30 bg-successSoft px-4 py-2.5 text-sm font-medium text-success">
                        <Check className="h-4 w-4" />
                        Paid in full
                      </span>
                    ) : (
                      <CreatePaymentLinkButton />
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        <section>
          <div className="rounded-2xl border border-dashed border-border bg-surface/40 p-5 text-sm text-muted">
            <p className="font-medium text-ink">
              <ArrowUpRight className="mr-1.5 inline h-4 w-4 text-accent" />
              Stripe is not connected yet
            </p>
            <p className="mt-1">
              When you connect Stripe, &quot;Create payment link&quot; will
              generate a real, hosted checkout link for this invoice. No
              payments are processed in this demo.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

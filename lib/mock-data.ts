import {
  Agent,
  ActivityLogEntry,
  Client,
  Invoice,
  InvoiceableEvent,
} from "./types";

// -----------------------------------------------------------------------
// MOCK DATA
// -----------------------------------------------------------------------
// This file stands in for Supabase tables (`clients`, `agents`,
// `activity_log`, `invoices`). Every helper below is written so it can
// later be swapped for `supabase.from(...).select(...)` calls without
// changing how the pages consume the data.
// -----------------------------------------------------------------------

export const agency = {
  name: "Tokyo AI Automation Studio",
  plan: "Agency",
};

export const clients: Client[] = [
  {
    id: "client-sakura",
    name: "Sakura Dental Clinic",
    industry: "Healthcare — Dental",
    logoInitial: "S",
    monthlyValueCreated: 1_430_000,
    paymentStatus: "Paid",
  },
  {
    id: "client-shibuya",
    name: "Shibuya Real Estate Group",
    industry: "Real Estate",
    logoInitial: "SH",
    monthlyValueCreated: 4_800_000,
    paymentStatus: "Pending",
  },
  {
    id: "client-ginza",
    name: "Ginza Beauty Lab",
    industry: "Beauty & Wellness",
    logoInitial: "G",
    monthlyValueCreated: 970_000,
    paymentStatus: "Overdue",
  },
];

export const agents: Agent[] = [
  {
    id: "agent-sakura-receptionist",
    name: "AI Receptionist",
    clientId: "client-sakura",
    type: "Receptionist Agent",
    tasksCompleted: 52,
    tasksLabel: "Appointments booked",
    outcomesVerified: 52,
    outcomesLabel: "Appointments confirmed",
    valueCreated: 1_430_000,
    cost: 180_000,
    currency: "JPY",
  },
  {
    id: "agent-shibuya-sales",
    name: "AI Sales Agent",
    clientId: "client-shibuya",
    type: "Sales Agent",
    tasksCompleted: 38,
    tasksLabel: "Property viewings booked",
    outcomesVerified: 38,
    outcomesLabel: "Viewings confirmed",
    valueCreated: 4_800_000,
    cost: 280_000,
    currency: "JPY",
  },
  {
    id: "agent-ginza-followup",
    name: "AI Follow-up Agent",
    clientId: "client-ginza",
    type: "Support Agent",
    tasksCompleted: 91,
    tasksLabel: "Leads followed up",
    outcomesVerified: 23,
    outcomesLabel: "Bookings recovered",
    valueCreated: 970_000,
    cost: 120_000,
    currency: "JPY",
  },
];

export const activityLog: ActivityLogEntry[] = [
  // --- AI Receptionist (Sakura Dental Clinic) ---
  {
    id: "log-sakura-1",
    agentId: "agent-sakura-receptionist",
    date: "2026-06-12",
    description:
      "Booked an implant consultation for a new patient referred from a Google review",
    verified: true,
    value: 45_000,
  },
  {
    id: "log-sakura-2",
    agentId: "agent-sakura-receptionist",
    date: "2026-06-10",
    description:
      "Answered an after-hours call and rebooked a same-day cancellation",
    verified: true,
    value: 18_000,
  },
  {
    id: "log-sakura-3",
    agentId: "agent-sakura-receptionist",
    date: "2026-06-08",
    description:
      "Booked a teeth-whitening consultation for a returning patient",
    verified: true,
    value: 28_000,
  },
  {
    id: "log-sakura-4",
    agentId: "agent-sakura-receptionist",
    date: "2026-06-06",
    description:
      "Sent appointment reminders to 14 patients ahead of the next day's schedule",
    verified: false,
  },
  {
    id: "log-sakura-5",
    agentId: "agent-sakura-receptionist",
    date: "2026-06-03",
    description: "Booked a routine check-up and cleaning for a new patient",
    verified: true,
    value: 12_000,
  },

  // --- AI Sales Agent (Shibuya Real Estate Group) ---
  {
    id: "log-shibuya-1",
    agentId: "agent-shibuya-sales",
    date: "2026-06-13",
    description:
      "Qualified an inbound lead and booked a viewing for a 2LDK in Minato-ku",
    verified: true,
    value: 1_200_000,
  },
  {
    id: "log-shibuya-2",
    agentId: "agent-shibuya-sales",
    date: "2026-06-11",
    description:
      "Booked a viewing for a family house in Setagaya for a relocating client",
    verified: true,
    value: 980_000,
  },
  {
    id: "log-shibuya-3",
    agentId: "agent-shibuya-sales",
    date: "2026-06-09",
    description:
      "Re-engaged a stalled lead from last quarter and booked a second viewing",
    verified: true,
    value: 650_000,
  },
  {
    id: "log-shibuya-4",
    agentId: "agent-shibuya-sales",
    date: "2026-06-07",
    description: "Followed up with 9 leads from the weekend open house",
    verified: false,
  },
  {
    id: "log-shibuya-5",
    agentId: "agent-shibuya-sales",
    date: "2026-06-04",
    description:
      "Booked a viewing for an investment property near Shibuya station",
    verified: true,
    value: 850_000,
  },

  // --- AI Follow-up Agent (Ginza Beauty Lab) ---
  {
    id: "log-ginza-1",
    agentId: "agent-ginza-followup",
    date: "2026-06-12",
    description:
      "Recovered a premium spa package booking from a lapsed customer",
    verified: true,
    value: 32_000,
  },
  {
    id: "log-ginza-2",
    agentId: "agent-ginza-followup",
    date: "2026-06-10",
    description:
      "Recovered a cancelled hair treatment booking via SMS follow-up",
    verified: true,
    value: 9_500,
  },
  {
    id: "log-ginza-3",
    agentId: "agent-ginza-followup",
    date: "2026-06-08",
    description:
      "Sent personalized follow-ups to 32 leads from last month's campaign",
    verified: false,
  },
  {
    id: "log-ginza-4",
    agentId: "agent-ginza-followup",
    date: "2026-06-05",
    description:
      "Re-engaged a lapsed client and recovered a facial treatment booking",
    verified: true,
    value: 14_000,
  },
  {
    id: "log-ginza-5",
    agentId: "agent-ginza-followup",
    date: "2026-06-02",
    description: "Followed up with 18 leads who abandoned an online booking",
    verified: false,
  },
];

// Verified outcomes that have not yet been billed — shown on the Agent
// Detail page and used to "back" a generated invoice with proof.
export const invoiceableEvents: InvoiceableEvent[] = activityLog
  .filter((entry) => entry.verified && entry.value)
  .map((entry) => ({
    id: `invoiceable-${entry.id}`,
    agentId: entry.agentId,
    description: entry.description,
    value: entry.value as number,
    date: entry.date,
  }));

export const invoices: Invoice[] = [
  {
    id: "INV-2026-0061",
    clientId: "client-sakura",
    agentId: "agent-sakura-receptionist",
    amount: 180_000,
    status: "Paid",
    issuedDate: "2026-06-01",
    periodLabel: "June 2026",
    description: "AI Receptionist — monthly service fee",
    outcomesCount: 52,
  },
  {
    id: "INV-2026-0062",
    clientId: "client-shibuya",
    agentId: "agent-shibuya-sales",
    amount: 280_000,
    status: "Pending",
    issuedDate: "2026-06-01",
    periodLabel: "June 2026",
    description: "AI Sales Agent — monthly service fee",
    outcomesCount: 38,
  },
  {
    id: "INV-2026-0060",
    clientId: "client-ginza",
    agentId: "agent-ginza-followup",
    amount: 120_000,
    status: "Overdue",
    issuedDate: "2026-06-01",
    periodLabel: "June 2026",
    description: "AI Follow-up Agent — monthly service fee",
    outcomesCount: 23,
  },
];

// -----------------------------------------------------------------------
// Lookup helpers (mirror what Supabase queries would return)
// -----------------------------------------------------------------------

export function getClientById(id: string): Client | undefined {
  return clients.find((c) => c.id === id);
}

export function getAgentById(id: string): Agent | undefined {
  return agents.find((a) => a.id === id);
}

export function getAgentsByClientId(clientId: string): Agent[] {
  return agents.filter((a) => a.clientId === clientId);
}

export function getActivityForAgent(agentId: string): ActivityLogEntry[] {
  return activityLog
    .filter((entry) => entry.agentId === agentId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function getInvoiceableEventsForAgent(
  agentId: string
): InvoiceableEvent[] {
  return invoiceableEvents.filter((e) => e.agentId === agentId);
}

export function getInvoicesForClient(clientId: string): Invoice[] {
  return invoices.filter((i) => i.clientId === clientId);
}

// -----------------------------------------------------------------------
// Agency-level aggregates for the dashboard
// -----------------------------------------------------------------------

export function getAgencyTotals() {
  const totalClients = clients.length;
  const totalAgents = agents.length;
  const revenueAttributed = agents.reduce((sum, a) => sum + a.valueCreated, 0);
  const totalCost = agents.reduce((sum, a) => sum + a.cost, 0);
  const invoicesGenerated = invoices.length;
  const blendedRoi = totalCost > 0 ? revenueAttributed / totalCost : 0;
  const totalOutcomesVerified = agents.reduce(
    (sum, a) => sum + a.outcomesVerified,
    0
  );

  return {
    totalClients,
    totalAgents,
    revenueAttributed,
    totalCost,
    invoicesGenerated,
    blendedRoi,
    totalOutcomesVerified,
  };
}

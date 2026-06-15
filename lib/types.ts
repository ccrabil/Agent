// Core data model for AgentPayd.
// This shape is intentionally close to what a Supabase schema would look
// like (snake_case tables -> camelCase here), so swapping the mock data
// module for real Supabase queries later should not require UI changes.

export type PaymentStatus = "Paid" | "Pending" | "Overdue";

export type AgentType =
  | "Sales Agent"
  | "Receptionist Agent"
  | "Support Agent"
  | "Recruiter Agent";

export interface Client {
  id: string;
  name: string;
  industry: string;
  logoInitial: string;
  monthlyValueCreated: number; // JPY, value created for the client this month
  paymentStatus: PaymentStatus;
}

export interface Agent {
  id: string;
  name: string;
  clientId: string;
  type: AgentType;
  tasksCompleted: number;
  tasksLabel: string; // e.g. "Appointments booked"
  outcomesVerified: number;
  outcomesLabel: string; // e.g. "Bookings confirmed"
  valueCreated: number; // JPY, value/revenue attributed to this agent
  cost: number; // JPY, monthly fee billed to the client for this agent
  currency: "JPY";
}

export interface ActivityLogEntry {
  id: string;
  agentId: string;
  date: string; // ISO date
  description: string;
  verified: boolean;
  value?: number; // JPY value attributable to this event, if any
}

export interface InvoiceableEvent {
  id: string;
  agentId: string;
  description: string;
  value: number;
  date: string;
}

export type InvoiceStatus = "Paid" | "Pending" | "Overdue" | "Draft";

export interface Invoice {
  id: string;
  clientId: string;
  agentId: string;
  amount: number;
  status: InvoiceStatus;
  issuedDate: string;
  periodLabel: string; // e.g. "June 2026"
  description: string;
  outcomesCount: number;
}

// Simple ROI helper, shared everywhere ROI is displayed so the
// calculation logic only lives in one place.
export function calculateRoi(valueCreated: number, cost: number): number {
  if (cost <= 0) return 0;
  return valueCreated / cost;
}

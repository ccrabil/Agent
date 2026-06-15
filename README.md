# AgentPayd — MVP

"Outcome billing infrastructure for AI agents. One for all."

Payment + ROI proof dashboard for AI agencies. Shows what AI agents did,
proves verified outcomes, generates invoices, and produces client-facing
ROI reports.

This is a **frontend MVP with mock data**. No real auth, no real Supabase
connection, and no real payment processing — everything is wired to look
and feel production-ready so the data layer can be swapped in later.

## Stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS, themed with the AgentPayd brand palette and type system
- Mock data module (`lib/mock-data.ts`) — structured like Supabase tables
- Stripe-ready UI (`CreatePaymentLinkButton`) — no live keys or charges

## Branding

Tailwind tokens in `tailwind.config.ts` are pulled from the AgentPayd brand
sheet:

| Token | Hex | Brand name |
| --- | --- | --- |
| `bg` | `#0A0A0D` | Void Black |
| `surface` | `#12161C` | Graphite |
| `border` | `#1F232B` | Steel |
| `muted` | `#8E939B` | Silver |
| `ink` | `#F2F4F7` | Ice |
| `accent` | `#0066FF` | Electric Blue |

The brand typeface is **Aeonik** (geometric, precise, futuristic). Aeonik
is a commercial font and isn't available via `next/font`, so **Space
Grotesk** — a free, similarly geometric sans — is used as the stand-in
everywhere (`app/layout.tsx`). JetBrains Mono is kept only for invoice IDs.

`components/Logo.tsx` contains the `LogoMark` (AP monogram tile with the
electric-blue "node" accent) and `Wordmark` ("AGENTPAYD", uppercase,
wide-tracked), used in the sidebar and on the landing page. If you have the
real Aeonik font files and the AP icon/logo assets, drop them into
`/public` and swap them in here for pixel-accurate branding.

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000

- `/` — Landing / login placeholder (sign-in is disabled; click
  "Continue to demo dashboard")
- `/dashboard` — Agency overview
- `/clients` — Client list
- `/agents` — AI agent performance + ROI
- `/agents/[id]` — Agent detail, activity log, invoiceable events
- `/invoices` — Generated invoices + payment link placeholders
- `/reports/[clientId]` — Client-facing ROI report

## Next steps (not in this MVP)

- Replace `lib/mock-data.ts` with Supabase queries (the types in
  `lib/types.ts` are designed to map 1:1 to tables: `clients`, `agents`,
  `activity_log`, `invoices`)
- Add real auth (Supabase Auth or NextAuth) on the `/` page
- Wire `CreatePaymentLinkButton` to the Stripe Payment Links API
- Wire "Export PDF" on the ROI Report page to a PDF generation service
- Swap Space Grotesk for the real Aeonik font files, and the placeholder
  `LogoMark`/`Wordmark` for the actual AP logo assets


"use client";

import { useState } from "react";
import { Link2, Check } from "lucide-react";

export default function CreatePaymentLinkButton() {
  const [clicked, setClicked] = useState(false);

  if (clicked) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-lg border border-success/30 bg-successSoft px-4 py-2.5 text-sm font-medium text-success">
        <Check className="h-4 w-4" />
        Payment link ready (demo)
      </span>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setClicked(true)}
      title="Stripe integration not yet connected — this is a placeholder"
      className="inline-flex items-center gap-1.5 rounded-lg border border-border bg-bg px-4 py-2.5 text-sm font-medium text-ink transition-colors hover:border-accent/40 hover:text-accent"
    >
      <Link2 className="h-4 w-4" />
      Create payment link
    </button>
  );
}

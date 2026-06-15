"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, Users, Bot, Receipt } from "lucide-react";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/clients", label: "Clients", icon: Users },
  { href: "/agents", label: "Agents", icon: Bot },
  { href: "/invoices", label: "Invoices", icon: Receipt },
];

interface TopbarProps {
  title: string;
  description?: string;
}

export default function Topbar({ title, description }: TopbarProps) {
  const pathname = usePathname();

  return (
    <div className="sticky top-0 z-10 border-b border-border bg-bg/80 backdrop-blur">
      <div className="flex items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div>
          <h1 className="text-xl font-semibold tracking-tight text-ink sm:text-2xl">
            {title}
          </h1>
          {description && (
            <p className="mt-1 text-sm text-muted">{description}</p>
          )}
        </div>
        <div className="hidden items-center gap-2 sm:flex">
          <span className="rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted">
            Demo data
          </span>
        </div>
      </div>

      {/* Mobile nav — sidebar is hidden below lg */}
      <nav className="flex gap-1 overflow-x-auto px-4 pb-3 sm:px-6 lg:hidden">
        {NAV_ITEMS.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`);
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex shrink-0 items-center gap-2 rounded-lg px-3 py-1.5 text-sm font-medium transition-colors ${
                isActive
                  ? "bg-accentSoft text-accent"
                  : "text-muted hover:bg-white/5 hover:text-ink"
              }`}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          );
        })}
      </nav>
    </div>
  );
}

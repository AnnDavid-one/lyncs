"use client";

import { usePathname } from "next/navigation";
import {
  Wallet,
  LayoutDashboard,
  Receipt,
  CreditCard,
  Wrench,
  Inbox,
  ChartBar as BarChart3,
  Calendar,
  Settings,
  CircleHelp as HelpCircle,
  Search,
  Moon,
  Bell,
} from "lucide-react";
import Link from "next/link";

const menuItems = [
  { icon: LayoutDashboard, label: "Dashboard", href: "/" },
  { icon: Receipt, label: "Transaction", href: "/transactions" },
  { icon: CreditCard, label: "Cards", href: "/cards" },
  { icon: Wrench, label: "Services", href: "/services" },
  { icon: Inbox, label: "Inbox", href: "/inbox" },
  { icon: BarChart3, label: "Analytics", href: "/analytics" },
  { icon: Calendar, label: "Financial Planner", href: "/planner" },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white border-r border-slate-200 p-6 flex flex-col">
      <div className="flex items-center gap-3 mb-8">
        <div className="w-10 h-10 bg-blue-100 rounded-xl flex items-center justify-center">
          <Wallet className="w-6 h-6 text-blue-600" />
        </div>
        <span className="font-bold text-lg">Uni Bank</span>
      </div>

      <nav className="flex-1 space-y-1">
        {menuItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.label}
              href={item.href}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-colors ${
                isActive
                  ? "bg-primary text-white font-bold shadow-md" // Full brand color
                  : "text-slate-600 hover:bg-slate-100 hover:text-primary" // Subtle hover
              }`}
            >
              <item.icon className="w-5 h-5" />
              <span className="text-sm">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <div className="space-y-1 pt-6 border-t border-slate-200">
        <Link
          href="/support"
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors"
        >
          <HelpCircle className="w-5 h-5" />
          <span className="text-sm">Support</span>
        </Link>
        <Link
          href="/settings"
          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-slate-600 hover:bg-slate-50 transition-colors"
        >
          <Settings className="w-5 h-5" />
          <span className="text-sm">Setting</span>
        </Link>
      </div>
    </aside>
  );
}

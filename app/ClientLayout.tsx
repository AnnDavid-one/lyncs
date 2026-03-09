"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { Search, Moon, Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { format } from "date-fns";
import Sidebar from "@/components/Sidebar";

function Header() {
  return (
    <header className="bg-white border-b border-slate-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex-1 max-w-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            <Input
              placeholder="Search"
              className="pl-10 rounded-xl border-slate-200"
            />
          </div>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <p className="text-sm font-medium">Welcome Back, Alex</p>
            <p className="text-xs text-slate-500">
              Last Login: {format(new Date(), "dd MMMM yyyy")}
            </p>
          </div>
          <Button size="icon" variant="ghost" className="rounded-xl">
            <Moon className="w-5 h-5" />
          </Button>
          <Button size="icon" variant="ghost" className="rounded-xl relative">
            <Bell className="w-5 h-5" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full" />
          </Button>
          <div className="relative w-10 h-10 rounded-full overflow-hidden border border-slate-200">
            <Image
              src="/logo.png"
              alt="Alex's Avatar"
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>
      </div>
    </header>
  );
}

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Now you can safely use usePathname() here if you need it for the Sidebar!
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-slate-50">
      <Sidebar />
      <div className="flex-1 flex flex-col">
        <Header />
        <main className="flex-1">{children}</main>
      </div>
    </div>
  );
}

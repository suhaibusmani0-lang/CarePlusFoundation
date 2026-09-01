"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import { useState } from "react";
import { motion } from "framer-motion";
import { 
  LayoutDashboard, 
  Heart, 
  FileText, 
  Image as ImageIcon, 
  LogOut,
  Menu,
  X
} from "lucide-react";

export default function AdminLayoutClient({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  if (pathname === "/admin/login") {
    return <>{children}</>;
  }

  const navItems = [
    { name: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { name: "Donations", href: "/admin/donations", icon: Heart },
    { name: "Blogs", href: "/admin/blogs", icon: FileText },
    { name: "Gallery", href: "/admin/gallery", icon: ImageIcon },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex">
      {/* Mobile sidebar overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`
        fixed lg:sticky top-0 left-0 z-50 h-screen w-64 bg-[#0f4a5c] text-white
        transform transition-transform duration-300 ease-in-out
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}
      `}>
        <div className="flex items-center justify-between h-16 px-6 bg-black/10 border-b border-white/10">
          <span className="text-xl font-bold text-white tracking-wider">CARE PLUS</span>
          <button className="lg:hidden text-white/70" onClick={() => setSidebarOpen(false)}>
            <X size={20} />
          </button>
        </div>

        <nav className="p-4 space-y-2 mt-4">
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link 
                key={item.name} 
                href={item.href}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl transition-all
                  ${isActive 
                    ? "bg-white text-[#0f4a5c] font-medium shadow-lg shadow-black/5" 
                    : "text-white/80 hover:bg-white/10 hover:text-white"
                  }
                `}
                onClick={() => setSidebarOpen(false)}
              >
                <item.icon size={20} className={isActive ? "text-[#0f4a5c]" : ""} />
                {item.name}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-white/10">
          <Link 
            href="/admin/login"
            className="flex items-center gap-3 px-4 py-3 rounded-xl text-white/80 hover:bg-white/10 hover:text-white transition-all w-full"
          >
            <LogOut size={20} />
            Logout
          </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0">
        <header className="h-16 bg-white border-b border-gray-100 flex items-center px-4 sm:px-6 lg:px-8 justify-between sticky top-0 z-30">
          <div className="flex items-center gap-4">
            <button 
              className="lg:hidden text-gray-500 hover:text-gray-700"
              onClick={() => setSidebarOpen(true)}
            >
              <Menu size={24} />
            </button>
            <h1 className="text-xl font-semibold text-gray-800 capitalize hidden sm:block">
              {pathname === "/admin" ? "Dashboard Overview" : pathname.split('/').pop()}
            </h1>
          </div>
          <div className="flex items-center gap-4">
            <div className="h-8 w-8 rounded-full bg-[#b8860b]/20 flex items-center justify-center text-[#b8860b] font-bold">
              A
            </div>
          </div>
        </header>

        <div className="p-4 sm:p-6 lg:p-8 flex-1 overflow-auto bg-gray-50/50">
          {children}
        </div>
      </main>
    </div>
  );
}

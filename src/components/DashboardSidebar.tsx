import {
  LayoutDashboard,
  Users,
  Landmark,
  Newspaper,
  ShoppingBag,
  TrendingUp,
  Radio,
  ShieldCheck,
  ChevronLeft,
  ChevronRight,
  Megaphone,
} from "lucide-react";
import { NavLink } from "@/components/NavLink";
import { useState } from "react";
import { useLocation } from "react-router-dom";

const navItems = [
  { title: "Overview", url: "/", icon: LayoutDashboard },
  { title: "Users", url: "/users", icon: Users },
  { title: "Verification", url: "/verification", icon: ShieldCheck },
  { title: "Politicians", url: "/politicians", icon: Landmark },
  { title: "Feeds", url: "/feeds", icon: Newspaper },
  { title: "Markets", url: "/markets", icon: ShoppingBag },
  { title: "Trends", url: "/trends", icon: TrendingUp },
  { title: "Livestreams", url: "/livestreams", icon: Radio },
];

export function DashboardSidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();

  return (
    <aside
      className={`${
        collapsed ? "w-[72px]" : "w-64"
      } min-h-screen bg-sidebar border-r border-sidebar-border flex flex-col transition-all duration-300 shrink-0`}
    >
      {/* Logo */}
      <div className="h-16 flex items-center px-4 border-b border-sidebar-border">
        <img
    src="/icon.jpg"
    alt="BroadCast Logo"
    className="h-10 w-10 object-contain shrink-0 rounded-full"
  />
        {!collapsed && (
          <span className="ml-3 text-lg font-bold text-sidebar-accent-foreground font-display tracking-tight">
            BroadCast
          </span>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 py-4 px-2 space-y-1">
        {navItems.map((item) => {
          const active = location.pathname === item.url;
          return (
            <NavLink
              key={item.url}
              to={item.url}
              end
              className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                active
                  ? "bg-sidebar-accent text-sidebar-primary"
                  : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              }`}
              activeClassName=""
            >
              <item.icon className="h-5 w-5 shrink-0" />
              {!collapsed && <span>{item.title}</span>}
            </NavLink>
          );
        })}
      </nav>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="m-3 p-2 rounded-lg text-sidebar-foreground hover:bg-sidebar-accent transition-colors self-end"
      >
        {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
      </button>
    </aside>
  );
}

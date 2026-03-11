import { useNavigate, useLocation } from "react-router-dom";
import { LayoutDashboard, Package, Users, Settings, Truck, BarChart3, MessageSquare } from "lucide-react";

const menuItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard, path: "/" },
  { id: "orders", label: "Orders", icon: Package, path: "/orders" },
  { id: "riders", label: "Riders", icon: Users, path: "/riders" },
  { id: "reports", label: "Reports", icon: BarChart3, path: "/reports" },
  { id: "feedback", label: "Customer Feedback", icon: MessageSquare, path: "/feedback" },
  { id: "settings", label: "Settings", icon: Settings, path: "/settings" },
];

interface SidebarProps {
  activeItem?: string;
}

export const Sidebar = ({ activeItem }: SidebarProps) => {
  const navigate = useNavigate();
  const location = useLocation();

  // Determine active item from route if not provided
  const currentActiveItem = activeItem || menuItems.find(item => item.path === location.pathname)?.id || "dashboard";

  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-sidebar flex flex-col">
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-6 border-b border-sidebar-border">
        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
          <Truck className="w-6 h-6 text-primary-foreground" />
        </div>
        <span className="text-xl font-bold text-sidebar-foreground">Rada</span>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentActiveItem === item.id;

            return (
              <li key={item.id}>
                <button
                  onClick={() => navigate(item.path)}
                  className={`w-full sidebar-item ${
                    isActive ? "sidebar-item-active" : ""
                  }`}
                >
                  <Icon className={`w-5 h-5 ${isActive ? "text-primary" : ""}`} />
                  <span className={isActive ? "text-sidebar-foreground font-medium" : ""}>
                    {item.label}
                  </span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="px-6 py-4 border-t border-sidebar-border">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 bg-sidebar-accent rounded-full flex items-center justify-center">
            <span className="text-sm font-medium text-sidebar-foreground">JD</span>
          </div>
          <div>
            <p className="text-sm font-medium text-sidebar-foreground">John Doe</p>
            <p className="text-xs text-sidebar-muted">Operations Manager</p>
          </div>
        </div>
      </div>
    </aside>
  );
};

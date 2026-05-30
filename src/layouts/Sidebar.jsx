import { NavLink } from "react-router-dom";
import {
  AlertCircle,
  BarChart3,
  BookOpen,
  CircleDollarSign,
  FileText,
  ImageUp,
  LayoutDashboard,
  Package,
  ReceiptText,
  Settings,
  Truck,
  Users,
  Wallet,
  X,
  FolderOpen,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Sidebar = ({ isOpen = false, onClose = () => {} }) => {
  const { currentUser, isAdmin, isSiteEngineer } = useAuth();

  const adminMenus = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Materials", path: "/materials", icon: Package },
    { name: "Expenses", path: "/expenses", icon: ReceiptText },
    { name: "Budget", path: "/budget", icon: Wallet },
    { name: "Accounts", path: "/accounts", icon: BarChart3 },
    { name: "Cash Book", path: "/cash-book", icon: BookOpen },
    { name: "Funds", path: "/funds", icon: CircleDollarSign },
    { name: "Supplier Payments", path: "/supplier-payments", icon: Truck },
    { name: "Labour Payments", path: "/labour-payments", icon: Users },
    { name: "Dues", path: "/dues", icon: AlertCircle },
    { name: "Reports", path: "/reports", icon: FileText },
    { name: "Site Uploads", path: "/site-uploads", icon: FolderOpen },
    { name: "Settings", path: "/settings", icon: Settings },
  ];

  const engineerMenus = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Materials", path: "/materials", icon: Package },
    { name: "Expenses", path: "/expenses", icon: ReceiptText },
    { name: "Upload Proof", path: "/upload-proof", icon: ImageUp },
  ];

  const menus = isAdmin ? adminMenus : isSiteEngineer ? engineerMenus : [];

  return (
    <>
      {isOpen && (
        <button
          type="button"
          aria-label="Close sidebar overlay"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-slate-950/50 md:hidden"
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-72 transform flex-col bg-slate-950 text-white transition-transform duration-300 md:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-20 items-center justify-between border-b border-slate-800 px-6">
          <div>
            <h1 className="text-xl font-bold">BuildTrack Pro</h1>
            <p className="text-xs text-slate-400">Construction Manager</p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="rounded-lg p-2 text-slate-300 hover:bg-slate-800 md:hidden"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-4 py-5">
          {menus.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.path}
                to={item.path}
                onClick={onClose}
                className={({ isActive }) =>
                  `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-slate-300 hover:bg-slate-900 hover:text-white"
                  }`
                }
              >
                <Icon size={19} />
                <span>{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        <div className="border-t border-slate-800 p-4">
          <div className="rounded-2xl bg-slate-900 p-4">
            <p className="text-sm font-bold text-white">
              {currentUser?.name || "User"}
            </p>
            <p className="mt-1 text-xs text-slate-400">
              Role:{" "}
              {currentUser?.role === "admin"
                ? "Admin"
                : currentUser?.role === "site_engineer"
                ? "Site Engineer"
                : "User"}
            </p>
          </div>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;

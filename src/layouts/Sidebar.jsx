import { NavLink } from "react-router-dom";
import {
    LayoutDashboard,
    Package,
    ReceiptText,
    FileText,
    Wallet,
    Settings,
    HardHat,
    Upload,
    Image,
    WalletCards,
    BookOpen,
    CircleDollarSign,
    Truck,
    Users,
    AlertCircle,
} from "lucide-react";
import { useAuth } from "../context/AuthContext";

const Sidebar = () => {
    const { currentUser, isAdmin, isSiteEngineer } = useAuth();

    const menuItems = [
        {
            name: "Dashboard",
            path: "/dashboard",
            icon: LayoutDashboard,
        },
        {
            name: "Materials",
            path: "/materials",
            icon: Package,
        },
        {
            name: "Expenses",
            path: "/expenses",
            icon: ReceiptText,
        },
    ];

    if (isAdmin) {
        menuItems.push(
            {
                name: "Budget",
                path: "/budget",
                icon: Wallet,
            },
            {
                name: "Accounts",
                path: "/accounts",
                icon: WalletCards,
            },
            {
                name: "Cash Book",
                path: "/cash-book",
                icon: BookOpen,
            },
            {
                name: "Funds",
                path: "/funds",
                icon: CircleDollarSign,
            },
            {
                name: "Supplier Payments",
                path: "/supplier-payments",
                icon: Truck,
            },
            {
                name: "Labour Payments",
                path: "/labour-payments",
                icon: Users,
            },
            {
                name: "Dues",
                path: "/dues",
                icon: AlertCircle,
            },
            {
                name: "Reports",
                path: "/reports",
                icon: FileText,
            },
            {
                name: "Site Uploads",
                path: "/site-uploads",
                icon: Image,
            },
            {
                name: "Settings",
                path: "/settings",
                icon: Settings,
            }
        );
    }

    if (isSiteEngineer) {
        menuItems.push({
            name: "Upload Proof",
            path: "/upload-proof",
            icon: Upload,
        });
    }

    return (
        <aside className="fixed left-0 top-0 z-40 hidden h-screen w-72 bg-slate-950 text-white md:block">
            <div className="flex h-20 items-center gap-3 border-b border-slate-800 px-6">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-600">
                    <HardHat size={24} />
                </div>

                <div>
                    <h1 className="text-lg font-bold">BuildTrack Pro</h1>
                    <p className="text-xs text-slate-400">Construction Manager</p>
                </div>
            </div>

            <nav className="mt-6 space-y-2 px-4">
                {menuItems.map((item) => {
                    const Icon = item.icon;

                    return (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${isActive
                                    ? "bg-blue-600 text-white shadow-lg shadow-blue-950/40"
                                    : "text-slate-300 hover:bg-slate-900 hover:text-white"
                                }`
                            }
                        >
                            <Icon size={20} />
                            {item.name}
                        </NavLink>
                    );
                })}
            </nav>

            <div className="absolute bottom-6 left-4 right-4 rounded-2xl bg-slate-900 p-4">
                <p className="text-sm font-semibold text-white">{currentUser?.name || "Guest"}</p>
                <p className="mt-1 text-xs text-slate-400">
                    Role: {isAdmin ? "Admin" : isSiteEngineer ? "Site Engineer" : "Guest"}
                </p>
            </div>
        </aside>
    );
};

export default Sidebar;
import { Bell, LogOut, Menu, Search, User } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Button from "../components/common/Button";

const TopNavbar = ({ onMenuClick }) => {
    const { currentUser, logout, isAdmin, isSiteEngineer } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login", { replace: true });
    };

    return (
        <header className="sticky top-0 z-30 flex h-20 items-center justify-between border-b border-slate-200 bg-white px-4 md:px-6">
            <div className="flex items-center gap-3">
                <button
                    type="button"
                    onClick={onMenuClick}
                    className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-600 md:hidden"
                >
                    <Menu size={22} />
                </button>

                <div>
                    <h2 className="text-lg font-bold text-slate-900 md:text-xl">
                        Construction Management System
                    </h2>
                    <p className="text-xs text-slate-500">
                        Manage materials, expenses and project budget
                    </p>
                </div>
            </div>

            <div className="hidden items-center gap-3 md:flex">
                <div className="flex h-11 w-72 items-center gap-2 rounded-xl border border-slate-200 bg-slate-50 px-3">
                    <Search size={18} className="text-slate-400" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="w-full bg-transparent text-sm outline-none placeholder:text-slate-400"
                    />
                </div>

                <button className="flex h-11 w-11 items-center justify-center rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50">
                    <Bell size={19} />
                </button>

                <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-600">
                    <User size={18} />
                    <div className="text-left leading-tight">
                        <p className="font-semibold text-slate-900">{currentUser?.name || "Guest"}</p>
                        <p className="text-xs text-slate-500">
                            {isAdmin ? "Admin" : isSiteEngineer ? "Site Engineer" : "Guest"}
                        </p>
                    </div>
                </div>

                <Button variant="outline" className="flex items-center gap-2" onClick={handleLogout}>
                    <LogOut size={18} />
                    Logout
                </Button>
            </div>
        </header>
    );
};

export default TopNavbar;
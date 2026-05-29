import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import TopNavbar from "./TopNavbar";

const MainLayout = () => {
    return (
        <div className="min-h-screen bg-slate-100">
            <Sidebar />

            <div className="md:ml-72">
                <TopNavbar />

                <main className="p-4 md:p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    );
};

export default MainLayout;
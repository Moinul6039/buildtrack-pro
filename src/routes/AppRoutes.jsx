import { Navigate, Route, Routes } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Dashboard from "../pages/Dashboard";
import Materials from "../pages/Materials";
import Expenses from "../pages/Expenses";
import Reports from "../pages/Reports";
import Budget from "../pages/Budget";
import Settings from "../pages/Settings";
import UploadProof from "../pages/UploadProof";
import SiteUploads from "../pages/SiteUploads";
import Login from "../pages/Login";
import Accounts from "../pages/Accounts";
import CashBook from "../pages/CashBook";
import Funds from "../pages/Funds";
import SupplierPayments from "../pages/SupplierPayments";
import LabourPayments from "../pages/LabourPayments";
import Dues from "../pages/Dues";
import ProtectedRoute from "./ProtectedRoute";
import RoleProtectedRoute from "./RoleProtectedRoute";

const AppRoutes = () => {
    return (
        <Routes>
            <Route path="/login" element={<Login />} />

            <Route
                path="/"
                element={
                    <ProtectedRoute>
                        <MainLayout />
                    </ProtectedRoute>
                }
            >
                <Route index element={<Navigate to="/dashboard" replace />} />
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="materials" element={<Materials />} />
                <Route path="expenses" element={<Expenses />} />

                <Route
                    path="reports"
                    element={
                        <RoleProtectedRoute allowedRoles={["admin"]}>
                            <Reports />
                        </RoleProtectedRoute>
                    }
                />
                <Route
                    path="site-uploads"
                    element={
                        <RoleProtectedRoute allowedRoles={["admin"]}>
                            <SiteUploads />
                        </RoleProtectedRoute>
                    }
                />
                <Route
                    path="budget"
                    element={
                        <RoleProtectedRoute allowedRoles={["admin"]}>
                            <Budget />
                        </RoleProtectedRoute>
                    }
                />
                <Route
                    path="upload-proof"
                    element={
                        <RoleProtectedRoute allowedRoles={["site_engineer"]}>
                            <UploadProof />
                        </RoleProtectedRoute>
                    }
                />
                <Route
                    path="settings"
                    element={
                        <RoleProtectedRoute allowedRoles={["admin"]}>
                            <Settings />
                        </RoleProtectedRoute>
                    }
                />

                <Route
                    path="accounts"
                    element={
                        <RoleProtectedRoute allowedRoles={["admin"]}>
                            <Accounts />
                        </RoleProtectedRoute>
                    }
                />
                <Route
                    path="cash-book"
                    element={
                        <RoleProtectedRoute allowedRoles={["admin"]}>
                            <CashBook />
                        </RoleProtectedRoute>
                    }
                />
                <Route
                    path="funds"
                    element={
                        <RoleProtectedRoute allowedRoles={["admin"]}>
                            <Funds />
                        </RoleProtectedRoute>
                    }
                />
                <Route
                    path="supplier-payments"
                    element={
                        <RoleProtectedRoute allowedRoles={["admin"]}>
                            <SupplierPayments />
                        </RoleProtectedRoute>
                    }
                />
                <Route
                    path="labour-payments"
                    element={
                        <RoleProtectedRoute allowedRoles={["admin"]}>
                            <LabourPayments />
                        </RoleProtectedRoute>
                    }
                />
                <Route
                    path="dues"
                    element={
                        <RoleProtectedRoute allowedRoles={["admin"]}>
                            <Dues />
                        </RoleProtectedRoute>
                    }
                />
            </Route>

            <Route path="*" element={<Navigate to="/dashboard" replace />} />
        </Routes>
    );
};

export default AppRoutes;
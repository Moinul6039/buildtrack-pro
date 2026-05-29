import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const RoleProtectedRoute = ({ children, allowedRoles = [] }) => {
    const { isAuthenticated, currentUser } = useAuth();

    if (!isAuthenticated) {
        return <Navigate to="/login" replace />;
    }

    if (!currentUser || !allowedRoles.includes(currentUser.role)) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

export default RoleProtectedRoute;

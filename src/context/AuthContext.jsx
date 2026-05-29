import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { authService } from "../services/authService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(() => authService.getCurrentUser());

    const isAuthenticated = useMemo(() => Boolean(currentUser), [currentUser]);
    const isAdmin = useMemo(() => currentUser?.role === "admin", [currentUser]);
    const isSiteEngineer = useMemo(
        () => currentUser?.role === "site_engineer",
        [currentUser]
    );

    const login = (email, password) => {
        const result = authService.login(email, password);

        if (result.user) {
            setCurrentUser(result.user);
        }

        return result;
    };

    const logout = () => {
        authService.logout();
        setCurrentUser(null);
    };

    useEffect(() => {
        const storedUser = authService.getCurrentUser();

        if (storedUser && !currentUser) {
            setCurrentUser(storedUser);
        }
    }, [currentUser]);

    return (
        <AuthContext.Provider
            value={{
                currentUser,
                isAuthenticated,
                login,
                logout,
                isAdmin,
                isSiteEngineer,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

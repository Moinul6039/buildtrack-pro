import { users } from "../data/users";
import { localStorageService } from "./localStorageService";

const CURRENT_USER_KEY = "buildtrack_current_user";

export const authService = {
    login(email, password) {
        const normalizedEmail = email.trim().toLowerCase();
        const matchedUser = users.find(
            (user) =>
                user.email.toLowerCase() === normalizedEmail &&
                user.password === password
        );

        if (!matchedUser) {
            return { error: "Invalid email or password." };
        }

        const currentUser = {
            id: matchedUser.id,
            name: matchedUser.name,
            email: matchedUser.email,
            role: matchedUser.role,
        };

        localStorageService.set(CURRENT_USER_KEY, currentUser);
        return { user: currentUser };
    },

    logout() {
        localStorageService.remove(CURRENT_USER_KEY);
    },

    getCurrentUser() {
        return localStorageService.get(CURRENT_USER_KEY, null);
    },

    isAuthenticated() {
        return Boolean(this.getCurrentUser());
    },
};

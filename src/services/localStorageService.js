export const localStorageService = {
    get(key, fallbackValue = null) {
        try {
            const savedData = localStorage.getItem(key);

            if (!savedData) {
                return fallbackValue;
            }

            return JSON.parse(savedData);
        } catch (error) {
            console.error(`Error reading ${key} from localStorage`, error);
            return fallbackValue;
        }
    },

    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (error) {
            console.error(`Error saving ${key} to localStorage`, error);
            return false;
        }
    },

    remove(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (error) {
            console.error(`Error removing ${key} from localStorage`, error);
            return false;
        }
    },
};
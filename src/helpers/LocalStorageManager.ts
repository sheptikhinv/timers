import IStorageManager from "./IStorageManager.ts";

class LocalStorageManager<T> implements IStorageManager<T> {
    setItem = (key: string, value: T): void => {
        localStorage.setItem(key, JSON.stringify(value));
    }

    getItem = (key: string): T | null => {
        const value = localStorage.getItem(key);
        if (value === null)
            return value;
        return JSON.parse(value);
    }

    removeItem = (key: string): void => {
        localStorage.removeItem(key);
    }
}

export default LocalStorageManager;
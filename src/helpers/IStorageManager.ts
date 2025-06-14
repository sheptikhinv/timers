interface IStorageManager<T> {
    getItem(key: string): T | null;
    setItem(key: string, value: T): void;
    removeItem(key: string): void;
}

export default IStorageManager;
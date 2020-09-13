export enum STORAGE {
    LOCAL_STORAGE,
    SESSION_STORAGE
}
export class Storage {
    private static DEFAULT_STORAGE: STORAGE = STORAGE.LOCAL_STORAGE;
    private static storageHandler = window.localStorage;

    static save(key: string, value: any, storage?: STORAGE): void {
        if (storage && storage !== Storage.DEFAULT_STORAGE) {
            window.sessionStorage.setItem(key, JSON.stringify(value));
        }
        else {
            Storage.storageHandler.setItem(key, JSON.stringify(value));
        }
    }

    static get(key: string, storage?: STORAGE): any {
        if (storage && storage !== Storage.DEFAULT_STORAGE) {
            const value = window.sessionStorage.getItem(key);
            return value ? JSON.parse(value): value;
        }
        const value = Storage.storageHandler.getItem(key);
        return value ? JSON.parse(value) : value;
    }

    static delete(key: string, storage?: STORAGE): void {
        if (storage && storage !== Storage.DEFAULT_STORAGE) {
            window.sessionStorage.removeItem(key);
        }
        Storage.storageHandler.removeItem(key);
    }
}
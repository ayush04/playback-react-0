export enum STORAGE {
    LOCAL_STORAGE,
    SESSION_STORAGE
}
export class StorageService {
    private static DEFAULT_STORAGE: STORAGE = STORAGE.LOCAL_STORAGE;
    private static storageHandler = window.localStorage;

    static save(key: string, value: any, storage?: STORAGE): void {
        if (storage && storage !== StorageService.DEFAULT_STORAGE) {
            window.sessionStorage.setItem(key, JSON.stringify(value));
        }
        else {
            StorageService.storageHandler.setItem(key, JSON.stringify(value));
        }
    }

    static get(key: string, storage?: STORAGE): any {
        if (storage && storage !== StorageService.DEFAULT_STORAGE) {
            const value = window.sessionStorage.getItem(key);
            return value ? JSON.parse(value): value;
        }
        const value = StorageService.storageHandler.getItem(key);
        return value ? JSON.parse(value) : value;
    }

    static delete(key: string, storage?: STORAGE): void {
        if (storage && storage !== StorageService.DEFAULT_STORAGE) {
            window.sessionStorage.removeItem(key);
        }
        StorageService.storageHandler.removeItem(key);
    }
}
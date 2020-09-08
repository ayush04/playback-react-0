export class AppEvent {
    private static listeners: {[name: string]: Array<Function>} = {};

    static listen(event: string, func: Function): void {
        if (AppEvent.listeners[event]) {
            AppEvent.listeners[event].push(func);
        }
        else {
            let arr = [];
            arr.push(func);
            AppEvent.listeners[event] = arr;
        }
    }

    static emit(event: string, data?: Object): void {
        if (AppEvent.listeners[event]) {
            AppEvent.listeners[event].forEach((func: Function) => func(data));
        }
    }
}
import { randomNumber } from '../utils/utils';

export class Todo {
    private id: string;
    private text: string;

    constructor(text: string) {
        this.id = randomNumber();
        this.text = text;
    }
}
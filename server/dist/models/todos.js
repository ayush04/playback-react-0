"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils/utils");
class Todo {
    constructor(text) {
        this.id = utils_1.randomNumber();
        this.text = text;
    }
}
exports.Todo = Todo;
//# sourceMappingURL=todos.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTodos = exports.createTodo = void 0;
const todos_1 = require("../models/todos");
const TODOS = [];
exports.createTodo = (req, res) => {
    const text = req.body.text;
    const newTodo = new todos_1.Todo(text);
    TODOS.push(newTodo);
    res.status(201).json({
        message: 'Todo created'
    });
};
exports.getTodos = (req, res) => {
    return res.status(200).json(TODOS);
};
//# sourceMappingURL=todos.js.map
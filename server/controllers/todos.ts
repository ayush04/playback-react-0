import { RequestHandler } from 'express';

import { Todo } from '../models/todos';

const TODOS: Todo[] = [];

export const createTodo: RequestHandler = (req, res) => {
    const text = req.body.text;
    const newTodo = new Todo(text);

    TODOS.push(newTodo);

    res.status(201).json({
        message: 'Todo created'
    });
}

export const getTodos: RequestHandler = (req, res) => {
    return res.status(200).json(TODOS);
}
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const todos_1 = require("../controllers/todos");
const router = express_1.Router();
router.post('/', todos_1.createTodo);
router.get('/', todos_1.getTodos);
router.post('/:id');
router.delete('/:id');
exports.default = router;
//# sourceMappingURL=todos.js.map
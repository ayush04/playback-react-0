"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createTest = void 0;
const utils_1 = require("../utils/utils");
const test_1 = require("../models/test");
exports.createTest = (req, res) => {
    const val = req.params.value;
    const test = new test_1.Test({
        id: utils_1.randomNumber(),
        value: val
    });
    test.save().then(response => {
        return res.status(201).json(response);
    })
        .catch(err => {
        return res.status(400).json(err);
    });
};
//# sourceMappingURL=test.js.map
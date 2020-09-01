"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Test = void 0;
const mongoose_1 = require("mongoose");
const testSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: true
    },
    value: {
        type: Object,
        required: true
    }
});
exports.Test = mongoose_1.model('Test', testSchema);
//# sourceMappingURL=test.js.map
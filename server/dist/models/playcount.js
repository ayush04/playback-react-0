"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Playcount = void 0;
const mongoose_1 = require("mongoose");
const playcountSchema = new mongoose_1.Schema({
    songId: {
        type: String,
        required: true
    },
    count: {
        type: Number,
        required: true
    }
});
exports.Playcount = mongoose_1.model('Playcount', playcountSchema);
//# sourceMappingURL=playcount.js.map
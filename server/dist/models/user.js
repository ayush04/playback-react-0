"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: false
    },
    isLoggedIn: {
        type: Boolean,
        required: true,
        default: false
    }
});
exports.User = mongoose_1.model('User', userSchema);
//# sourceMappingURL=user.js.map
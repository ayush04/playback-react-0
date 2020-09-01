"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getClientId = exports.getAPIKey = void 0;
const secret_1 = __importDefault(require("../secret/secret"));
exports.getAPIKey = (req, res) => {
    return res.status(200).json({
        'API_KEY': secret_1.default.API_KEY
    });
};
exports.getClientId = (req, res) => {
    return res.status(200).json({
        'CLIENT_ID': secret_1.default.CLIENT_ID
    });
};
//# sourceMappingURL=secret.js.map
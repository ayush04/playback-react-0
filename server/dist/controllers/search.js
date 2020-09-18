"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const node_fetch_1 = __importDefault(require("node-fetch"));
const ITUNES_URL = 'https://itunes.apple.com/search';
exports.alive = (req, res) => {
    return res.status(200).json({
        'alive': true
    });
};
exports.getSuggestions = (req, res) => {
    const query = req.params.query;
    return node_fetch_1.default(`${ITUNES_URL}?term=${encodeURIComponent(query)}&limit=20`)
        .then(response => {
        return response.json()
            .then(responseJson => res.status(200).json(responseJson));
    })
        .catch(err => console.log(err));
};
//# sourceMappingURL=search.js.map
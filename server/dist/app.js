"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = require("body-parser");
const cors_1 = __importDefault(require("cors"));
//import passport from 'passport';
const mongoose_1 = require("mongoose");
const search_1 = __importDefault(require("./routes/search"));
const secret_1 = __importDefault(require("./routes/secret"));
const playlist_1 = __importDefault(require("./routes/playlist"));
const playcount_1 = __importDefault(require("./routes/playcount"));
const user_1 = __importDefault(require("./routes/user"));
const secret_2 = __importDefault(require("./secret/secret"));
const app = express_1.default();
app.use(cors_1.default());
app.use(body_parser_1.json());
app.use('/', search_1.default);
app.use('/secret', secret_1.default);
app.use('/', playlist_1.default);
app.use('/', playcount_1.default);
app.use('/', user_1.default);
app.use((err, req, res, next) => {
    res.status(500).json({
        message: err.message
    });
});
mongoose_1.connect(secret_2.default.MONGODB_CONNECTION_STRING)
    .then(() => {
    app.listen(3001);
})
    .catch(err => console.log('Cannot connect to DB', err));
//# sourceMappingURL=app.js.map
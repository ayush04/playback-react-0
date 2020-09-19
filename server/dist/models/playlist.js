"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Playlist = void 0;
const mongoose_1 = require("mongoose");
const playlistSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    createdBy: {
        type: String,
        required: true
    },
    songs: [String]
});
exports.Playlist = mongoose_1.model('Playlist', playlistSchema);
//# sourceMappingURL=playlist.js.map
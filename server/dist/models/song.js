"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Song = void 0;
const mongoose_1 = require("mongoose");
const songSchema = new mongoose_1.Schema({
    id: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    artistName: {
        type: String,
        required: true
    },
    thumbnail: {
        type: String,
        required: true,
    },
    videoId: {
        type: String,
        required: false
    }
});
exports.Song = mongoose_1.model('Song', songSchema);
//# sourceMappingURL=song.js.map
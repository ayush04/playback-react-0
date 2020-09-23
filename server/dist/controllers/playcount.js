"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const playcount_1 = require("../models/playcount");
exports.updatePlayCount = (req, res) => {
    const songId = req.params.id;
    playcount_1.Playcount.findOneAndUpdate({ songId: songId }, { "$inc": { "count": 1 } }, { upsert: true }).then(response => {
        return res.status(201).json(response);
    })
        .catch(err => {
        return res.status(400).json(err);
    });
};
exports.getTopNPlays = (req, res) => {
    const n = Number(req.params.n);
    playcount_1.Playcount.find().sort({ count: -1 }).limit(n).then(response => {
        return res.status(200).json(response);
    })
        .catch(err => {
        return res.status(400).json(err);
    });
};
//# sourceMappingURL=playcount.js.map